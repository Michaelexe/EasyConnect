const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

let pcInfo = {};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("create", (data) => {
    console.log(data);
    if (!pcInfo[data.username]) {
      socket.emit("created", data);
      pcInfo[data.username] = { password: data.password, id: socket.id };
      console.log(socket.id);
    }
  });

  socket.on("connect-mobile", (data) => {
    console.log(data);
    if (
      pcInfo[data.username] &&
      pcInfo[data.username].password == data.password
    ) {
      socket.emit("connected", data);
    }
  });

  socket.on("command", (data) => {
    if (
      pcInfo[data.username] &&
      pcInfo[data.username].password == data.password
    ) {
      socket.to(pcInfo[data.username].id).emit(data.type, data.data);
    }
  });
});
