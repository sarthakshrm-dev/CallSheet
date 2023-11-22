const express = require("express");
const router = express.Router();

const NotificationController = require("../controllers/notification");

router.post("/send-Notification", NotificationController.sendNotification);

module.exports = router;
