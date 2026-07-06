const { v4: uuid } = require("uuid");

const rooms = new Map();

const roomHandler = ({ io, socket }) => {
  socket.on("create_room", () => {
    const roomId = uuid();
    rooms.set(roomId, {
      host: socket.id,
      guest: [],
    });
    socket.join(roomId);
    socket.emit("room_created", roomId);
  });

  socket.on("join_room", (roomId) => {
    const room = rooms.get(roomId);

    if (!room) {
      return socket.emit("room_not_found");
    }

    if (room.guest.length >= 2) {
        return socket.emit("room_full");
    }


    room.guest.push(socket.id);
    socket.join(roomId);
    socket.emit("room_joined", roomId);

    socket.to(roomId).emit("user_joined", socket.id);
  });
};

module.exports = roomHandler;
