const express = require('express')
const http = require("http")
const {Server} = require("socket.io")
const {v4:uuid} = require("uuid")
const cors = require("cors")
const cookieParser = require("cookie-parser")



let app = express();
const room = new Map();
const httpServer = http.createServer(app);

const io = new Server(httpServer , {
    cors:{
        origin:"http://localhost:5173",

    }
})

io.on("connection",(socket)=>{
    socket.on("create_room",()=>{
        const roomId = uuid()
        room.set(roomId,{
            host:socket.id,
            guest:[socket.id]
        })
        socket.join(roomId)
        socket.emit("room_created",roomId)
        console.log(rooms)
    })

    socket.on("join_room",(roomId)=>{
        const room=rooms.get(roomId)
        
        if(!room){
            return socket.emit("room_not_found")
        }
        room.guest.push(socket.id)
        socket.join(roomId)
        socket.emit("room_joined",roomId)

        io.to(roomId).emit("user_joined",socket.id)
    })
})




module.exports = {
    app,
    httpServer
}