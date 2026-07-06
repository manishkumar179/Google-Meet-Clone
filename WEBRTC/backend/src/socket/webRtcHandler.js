const webRtcHandler = ({io, socket})=>{

    socket.on("offer", ({roomId, offer})=>{
        socket.to(roomId).emit("offer", {
            offer,
            from:socket.id
        })
    })


    socket.on("answer", ({roomId, answer})=>{
        socket.to(roomId).emit("answer", {
            answer,
            from:socket.id
        })
    })


    socket.on("ice_candidate" , ({roomId, candidate})=>{
        socket.to(roomId).emit("ice_candidate",{
            candidate,
            from:socket.id
        })
    })

}

module.exports = webRtcHandler