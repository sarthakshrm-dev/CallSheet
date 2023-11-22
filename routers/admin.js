const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");
const { verifyTokenAdmin } = require("../middleware/authentication");

//Update user timings

router.post("/login", AdminController.login);
router.patch("/verifyUser/:id", verifyTokenAdmin, AdminController.verifyUser);
router.patch(
  "/blockAccount/:id",
  verifyTokenAdmin,
  AdminController.blockAccount
);

// define request reset password endpoint
router.patch("/request-reset-password", AdminController.ForgotPassword);

// Define reset password endpoint
router.patch("/reset", AdminController.ResetPassword);

router.get("/getAll", AdminController.getAll);

module.exports = router;
