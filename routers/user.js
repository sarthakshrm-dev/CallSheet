const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const { verifyTokenAndAuthorization } = require("../middleware/authentication");

//Update user timings
router.put(
  "/:userId/timings",
  verifyTokenAndAuthorization,
  UserController.updateTimings
);
router.get("/getAll", verifyTokenAndAuthorization, UserController.getAll);
router.get("/getById/:id", verifyTokenAndAuthorization, UserController.getUserById);
router.get("/viewAllData/:id", verifyTokenAndAuthorization, UserController.getSeperateData);

router.post(
  "/fileUpload",
  verifyTokenAndAuthorization,
  UserController.fileUpload
);
router.post(
  "/selfieVerification",
  verifyTokenAndAuthorization,
  UserController.selfieVerification
);
router.patch(
  "/updateProfile/:id",
  verifyTokenAndAuthorization,
  UserController.updateProfile
);
router.patch(
  "/updateProfile/:id",
  verifyTokenAndAuthorization,
  UserController.updateProfile
);
router.patch(
  "/deleteFile/:id",
  verifyTokenAndAuthorization,
  UserController.deleteFile
);
router.patch(
  "/accountDeleteRequest/:id",
  verifyTokenAndAuthorization,
  UserController.accountDeleteRequest
);
router.patch(
  "/deactivateAccount/:id",
  verifyTokenAndAuthorization,
  UserController.deactivateAccount
);

router.patch(
  "/follow/:id",
  verifyTokenAndAuthorization,
  UserController.followUser
);

router.patch(
  "/unfollow/:id",
  verifyTokenAndAuthorization,
  UserController.unfollowUser
);

router.patch(
  "/follow-status/:id",
  verifyTokenAndAuthorization,
  UserController.followStatus
);

router.patch(
  "/calsheet-access/:id",
  verifyTokenAndAuthorization,
  UserController.callsheetAccess
);

router.patch(
  "/calsheet-access-status/:id",
  verifyTokenAndAuthorization,
  UserController.callsheetAccessStatus
);

router.get(
  "/all-requests/:id",
  verifyTokenAndAuthorization,
  UserController.getRequests
);

router.patch(
  "/private-public",
  verifyTokenAndAuthorization,
  UserController.publicPrivate
);

module.exports = router;
