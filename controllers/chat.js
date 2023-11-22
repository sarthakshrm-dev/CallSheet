const Chat = require("../models/chat");
const { awsStorageUploadChatAttachment } = require("../utils/aws_storage");
const socketIO = require("socket.io");
const User = require("../models/user");

exports.createChat = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    // Handle chat messages

    const chat = new Chat({
      sender,
      receiver,
      message,
    });
    await chat
      .save()
      .then(() => {
        // Emit the chat message to the receiver
        req.io.to(receiver).emit("chat", chat);
        req.io.to(receiver).emit("chatReceived", chat);
        req.io.to(sender).emit("chatSent", chat);
        res
          .status(200)
          .json({ message: "Chat message sent successfully", chat });
      })
      .catch((error) => {
        console.error("Error saving chat message:", error);
        res.status(500).json({ error: "Failed to send chat message" });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createChats = async (req, res) => {
  try {
    let form = await new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.json({
          error: error.message,
        });
      }
      // Set up Socket.IO with the server
      const io = socketIO(server);

      // Handle Socket.IO connections
      io.on("connection", (socket) => {
        console.log("A user connected");

        // Handle chat events here

        // Handle disconnections
        socket.on("disconnect", () => {
          console.log("A user disconnected");
        });
      });

      var attachments = [];
      var fileLocation;

      if (!files.attachments) {
        if (fields.sender || fields.receiver || fields.time || fields.message) {
          const chat = new Chat({
            sender: fields.sender,
            receiver: fields.receiver,
            time: fields.time,
            message: fields.message,
          });
          await chat.save();
          return res.status(200).json({
            message: "Chat created successfully!",
            chat: chat,
          });
        }
      } else if (files.attachment.filepath) {
        fileLocation = await awsStorageUploadChatAttachment(files.attachment);

        attachments.push(fileLocation);
        if (
          fields.sender ||
          fields.receiver ||
          fields.time ||
          fields.message ||
          files.attachment
        ) {
          const chat = new Chat({
            sender: fields.sender,
            attachment: attachments,
            receiver: fields.receiver,
            time: fields.time,
            message: fields.message,
          });
          await chat.save();
          return res.status(200).json({
            message: "Chat created successfully!",
            chat: chat,
          });
        }
      } else {
        for (let i = 0; i < files.attachment.length; i++) {
          fileLocation = await awsStorageUploadChatAttachment(
            files.attachment[i]
          );

          attachments.push(fileLocation);
        }

        if (
          fields.sender ||
          fields.receiver ||
          fields.time ||
          fields.message ||
          files.attachment
        ) {
          const chat = new Chat({
            sender: fields.sender,
            attachment: attachments,
            receiver: fields.receiver,
            time: fields.time,
            message: fields.message,
          });
          await chat.save();
          return res.status(200).json({
            message: "Chat created successfully!",
            chat: chat,
          });
        }
      }

      return res.status(404).json({
        message: "not entries found",
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.chatRead = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(400).json({
        message: "Chat not found",
      });
    } else {
      chat.isRead = true;
      await chat.save();
      return res.status(200).json({
        success: true,
        message: "Chat Read successfully",
        chat: chat,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const { id } = req.params;
    const chats = await Chat.find({ firstUser: id }).lean();

    for (let chat of chats) {
      const secondUser = await User.findById(chat.secondUser);
      chat.name = secondUser ? secondUser.name : '';
      chat.profilePhoto = secondUser ? secondUser.profilePhoto : '';
    }

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};