const express = require("express");
const router = express.Router();

const RoleController = require("../controllers/role");
const { verifyTokenAdmin } = require("../middleware/authentication");

//Update Role timings
router.post("/create", verifyTokenAdmin, RoleController.createRole);
router.delete("/delete", verifyTokenAdmin, RoleController.deleteRole);
router.get("/getAll", RoleController.getAllRoles);

module.exports = router;
