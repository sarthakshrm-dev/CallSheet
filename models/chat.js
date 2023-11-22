const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  firstUser: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  secondUser: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  chats: [
    {
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
  }
],
});

module.exports = mongoose.model("Chat", chatSchema);
