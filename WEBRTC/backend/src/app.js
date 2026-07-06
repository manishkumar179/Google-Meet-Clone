const express = require('express')
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const roomHandler = require('./socket/roomHandler')
const webRtcHandler = require('./socket/webRtcHandler')



let app = express();
const httpServer = http.createServer(app);

app.use(cors());
const io = new Server(httpServer , {
    cors:{
        origin:"http://localhost:5173",
        credentials:true

    }
})

io.on("connection",(socket)=>{
    console.log("connection done: " , socket.id)

    roomHandler({io, socket});
    webRtcHandler({io, socket});

})




module.exports = {
    httpServer
}