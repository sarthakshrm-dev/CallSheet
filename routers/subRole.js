const express = require("express");
const router = express.Router();

const SubRoleController = require("../controllers/subRole");
const {
  verifyTokenAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/authentication");

//Update SubRole timings
router.post("/create", verifyTokenAdmin, SubRoleController.createSubRole);
router.delete("/delete", verifyTokenAdmin, SubRoleController.deleteSubRole);
router.get("/getAll", SubRoleController.getAllSubRoles);
router.get(
  "/get-subRoles-by-roleId/:roleId",
  verifyTokenAndAuthorization,
  SubRoleController.getSubRolesByRoleId
);

module.exports = router;
