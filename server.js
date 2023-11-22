const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./utils/database");
const { Server } = require("socket.io");
const scheduleAccountDeletion = require("./utils/job");
const Chat = require('./models/chat')

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Setup socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

//Middleware to attach the io object to the request
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRoute = require("./routers/indexRoute");
app.use("/api", indexRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

//Handle socket.io connection
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on('chat', async (data) => {

    if(typeof (data) != 'object') {
      var parsedData = JSON.parse(data)
    }

    let sender = parsedData ? parsedData.sender : data.sender
    let receiver = parsedData ? parsedData.receiver : data.receiver

    const chatSender = await Chat.findOne({
      $and: [
        { firstUser: sender },
        { secondUser: receiver }
      ]
    });
    const chatReceiver = await Chat.findOne({
      $and: [
        { firstUser: receiver },
        { secondUser: sender }
      ]
    });

    let date = new Date();

    if (!chatSender) {
      const messageSender = new Chat({
        firstUser: parsedData ? parsedData.sender : data.sender,
        secondUser: parsedData ? parsedData.receiver : data.receiver,
        chats: [
          {
            sender: parsedData ? parsedData.sender : data.sender,
            receiver: parsedData ? parsedData.receiver : data.receiver,
            message: parsedData ? parsedData.message : data.message,
            timestamp: date
          }
        ]
      });

      messageSender.save();
    }
    else {
      chatSender.chats.push({
        sender: parsedData ? parsedData.sender : data.sender,
        receiver: parsedData ? parsedData.sender : data.sender,
        message: parsedData ? parsedData.sender : data.sender,
        timestamp: date
      })

      chatSender.save()
    }

    if (!chatReceiver) {
      const messageReceiver = new Chat({
        firstUser: parsedData ? parsedData.receiver : data.receiver,
        secondUser: parsedData ? parsedData.sender : data.sender,
        chats: [
          {
            sender: parsedData ? parsedData.sender : data.sender,
            receiver: parsedData ? parsedData.receiver : data.receiver,
            message: parsedData ? parsedData.message : data.message,
            timestamp: date
          }
        ]
      });

      messageReceiver.save();
    }
    else {
      chatReceiver.chats.push({
        sender: parsedData ? parsedData.sender : data.sender,
        receiver: parsedData ? parsedData.receiver : data.receiver,
        message: parsedData ? parsedData.message : data.message,
        timestamp: date
      })

      chatReceiver.save()
    }

    // Broadcast the message to all connected clients
    io.emit('chat', data);
  });

  // handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Invoke the function to schedule the account deletion job
scheduleAccountDeletion();

server.listen(port, () => {
  console.log("Server is running on PORT: ", port);
  connectDB();
});
