const User = require("../models/user");
const Role = require("../models/role");
const { adminJwt } = require("../helpers/adminJwt");
const { smsMeNow } = require("../utils/helper");

exports.login = async (req, res) => {
  try {
    const { phoneno, password } = req.body;

    if (!phoneno || !password) {
      return res.status(400).json({
        error: true,
        message: "Cannot authorize admin.",
      });
    }

    const admin = await Role.findOne({ name: "admin" });

    //1. Find if any account with that phoneno exists in DB
    const user = await User.findOne({ phoneno: phoneno, role: admin._id });
    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    //2. Verify the password is valid
    if (password!==user.password) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    //Generate Access token
    const { error, token } = await adminJwt(user.phoneno, user._id);
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't create access token. Please try again later",
      });
    }
    user.accessToken = token;

    await user.save();

    //Success
    return res.send({
      success: true,
      message: "Admin logged in successfully",
      accessToken: token, //Send it to the client
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "User not found",
      });
    }
    if (status === "verified") {
      user.isVerified = true;
      user.selfieVerificationStatus = "accepted";
      await user.save();
      return res.status(200).json({
        success: true,
        status: 200,
        user,
        message: "User verified successfully",
      });
    } else if (status === "unverified") {
      user.isVerified = false;
      user.selfieVerificationStatus = "rejected";

      await user.save();
      return res.status(200).json({
        success: true,
        status: 200,
        user,
        message: "User unverified successfully",
      });
    } else {
      return res.status(400).json({
        success: true,
        status: 400,
        message: "Invalid Status of user",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.blockAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "User not found",
      });
    }
    
    if(user.status!=="blocked") {
      user.status = "blocked";
    } else {
      user.status = "active";
    }

    await user.save();
    return res.status(200).json({
      success: true,
      status: 200,
      user,
      message: `User ${user.status==="blocked" ? 'unblocked' : 'blocked'} successfully`,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

// Admin forgot password sending request
exports.ForgotPassword = async (req, res) => {
  try {
    const { phoneno } = req.body;
    if (!phoneno) {
      return res.send({
        status: 400,
        error: true,
        message: "Cannot be processed",
      });
    }
    const admin = await User.findOne({
      phoneno: phoneno,
    });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    let code = Math.floor(100000 + Math.random() * 900000);
    let response = await smsMeNow(admin.phoneno, code);
    admin.code = code;
    await admin.save();

    if (response.data) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send sms. Please try again later.",
      });
    }
    let expiry = Date.now() + 60 * 1000 * 15;
    admin.resetPasswordToken = code;
    admin.resetPasswordExpires = expiry; // 15 minutes
    await admin.save();
    return res.status(200).json({
      success: true,
      message: `SMS has been sent to ${phoneno} to reset your password`,
    });
  } catch (error) {
    console.error("forgot-password-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// Admin reset password
exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword) {
      return res.status(403).json({
        error: true,
        message:
          "Couldn't process request. Please provide all mandatory fields",
      });
    }
    const admin = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!admin) {
      return res.status(400).send({
        error: true,
        message: "Password reset token is invalid or has expired.",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Passwords didn't match",
      });
    }

    admin.password = req.body.newPassword;
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = "";
    await admin.save();
    return res.status(200).send({
      success: true,
      message: "Password has been changed",
    });
  } catch (error) {
    console.error("reset-password-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let { search, column, order, block } = req.query;

    let searchFilter = {};
    if (search) {
      searchFilter = {
        ...searchFilter,
        name: { $regex: search, $options: "i" } // Perform a case-insensitive partial text search
      };
    }
    if(block) {
      searchFilter = {
        ...searchFilter,
        status: block
      };
    }

    const sorting = [];
    sorting.push(["name", order || "ASC"]);

    const count = await User.countDocuments(searchFilter); // Use countDocuments instead of count
    let rows = await User.find(searchFilter)
      .sort(sorting)

    res.json({ count, rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};