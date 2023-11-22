const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const verifyUserToken = async (req, res, next) => {
  try {
    var bearerHearder = await req.headers["authorization"];

    if (!bearerHearder) {
      return res.status(403).send({
        auth: false,
        message: "No bearerHearder provided.",
      });
    } else if (typeof bearerHearder != "undefined") {
      //split at the space
      const bearer = bearerHearder.split(" ");
      // //Get the token from array
      const bearerToken = bearer[1];
      // // set the token
      const token = bearerToken;

      jwt.verify(token, process.env.JWT_ACTIVATION, { algorithm: 'HS256' }, (err, decoded) => {
        if (err) {
          console.log("err", err);
          return res
            .status(401)
            .json({ auth: false, message: "Failed to authenticate token.", token: token, decoded: decoded, error: err });
        }
        // else{
        //     return res.status(200).json({
        //         "auth": "verified",
        //         "message": "User Verified",
        //         decoded
        //     })
        // }
        else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.Status(403).json({
        message: "Forbidden",
      });
    }
  } catch (error) {
    console.log("function-error", error);
    return res.status(500).json({
      error: true,
      message: "something went wrong",
      reason: error.message,
    });
  }
};

// verify artist and director and the token
exports.verifyTokenAndAuthorization = async (req, res, next) => {
  await verifyUserToken(req, res, async () => {
    const userId = req.user.id; // Assuming the user ID is available in the request object
    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.role.name !== "artist" &&
      user.role.name !== "director" &&
      user.role.name !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Access denied. You do not have to permission to execute this task, artist and director permission required",
      });
    }

    next();
  });
};

// verify user role for artist and token
exports.verifyTokenAndArtist = async (req, res, next) => {
  await verifyUserToken(req, res, async () => {
    const userId = req.user.id; // Assuming the user ID is available in the request object
    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role.name !== "artist") {
      return res.status(403).json({
        message:
          "Access denied. You do not have to permission to execute this task, admin permission required",
      });
    }

    next();
  });
};

// verify user role for director and token
exports.verifyTokenAndDirector = async (req, res, next) => {
  await verifyUserToken(req, res, async () => {
    const userId = req.user.id; // Assuming the user ID is available in the request object
    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role.name !== "director") {
      return res.status(403).json({
        message:
          "Access denied. You do not have to permission to execute this task, admin permission required",
      });
    }

    next();
  });
};

// verify user role for admin and subadmin and token
exports.verifyTokenAdmin = async (req, res, next) => {
  await verifyUserToken(req, res, async () => {
    const userId = req.user.id; // Assuming the user ID is available in the request object
    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role.name !== "admin") {
      return res.status(403).json({
        message:
          "Access denied. You do not have to permission to execute this task, admin permission required",
      });
    }

    next();
  });
};
