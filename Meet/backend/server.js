const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");

const redis = require("./config/redis.js");

const app = express();
app.use(cors());



const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


//coonection pool
io.on("connection", (socket) => {
  

  socket.on("send_message", (data) => {
    console.log(data);
    io.emit("receiver_message", data);
  });


  //Room creating
  socket.on("create_room", async () => {

    const roomId = uuidv4()

    socket.join(roomId);

    const meeting = {
      host:socket.id,
      participants:[socket.id],
      isMeetingLive:false
    }

    await redis.set(roomId , JSON.stringify(meeting))

    const data = await redis.get(roomId);

    let meetingId = JSON.parse(data)

    socket.emit("room_created", roomId);
    io.to(roomId).emit("participants", meetingId.participants);

  });
});

let PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
