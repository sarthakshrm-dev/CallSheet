const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chat");

router.post("/create-chat", ChatController.createChat);
router.put("/chat-read/:id", ChatController.chatRead);
router.get("/get-all-chats/:id", ChatController.getAllChats);

module.exports = router;
