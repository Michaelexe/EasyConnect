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
      pcInfo[data.username] = {
        password: data.password,
        id: socket.id,
        brightness: data.brightness,
        volume: data.volume,
      };
      console.log(socket.id);
    }
  });

  socket.on("connect-mobile", (data) => {
    console.log(data);
    if (
      pcInfo[data.username] &&
      pcInfo[data.username].password == data.password
    ) {
      socket.emit("connected", {
        ...data,
        brightness: pcInfo[data.username].brightness,
        volume: pcInfo[data.username].volume,
      });
      pcInfo[data.username].phoneId = socket.id;
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

  socket.on("disconnect-pc", (data) => {
    console.log(data);
    if (
      pcInfo[data.username] &&
      pcInfo[data.username].password == data.password
    ) {
      socket.to(pcInfo[data.username].phoneId).emit("disconnect-phone");
      delete pcInfo[data.username];
    }
  });
});
