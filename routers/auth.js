const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");

router.post("/registerUserByPhoneno", AuthController.registerUserByPhoneno);
router.post("/decode-verification-register", AuthController.registrationVerificationByPhone);

router.post("/email-2fa-verification", AuthController.email2faVerification);
router.post(
  "/decode-verification-token",
  AuthController.decodeVerificationToken
);
router.post(
  "/refresh-token",
  AuthController.refreshToken
);
router.post("/send-verification-email", AuthController.sendVerificationEmail);
router.post("/add-password", AuthController.addPassword);
router.post("/loginEmail", AuthController.loginEmail);
router.post("/loginPhoneno", AuthController.loginPhoneno);
router.put("/updateUser/:id", AuthController.update);
router.get("/logout", AuthController.logout);

module.exports = router;
