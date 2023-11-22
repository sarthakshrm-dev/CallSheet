require("dotenv").config();

const jwt = require("jsonwebtoken");

const options = {
  expiresIn: "1h",
};

async function adminJwt(phoneno, adminId) {
  try {
    const payload = { phoneno: phoneno, id: adminId };
    const token = await jwt.sign(payload, process.env.JWT_ACTIVATION, options);
    return { error: false, token: token };
  } catch (error) {
    return { error: true, message: error };
  }
}

module.exports = { adminJwt };
