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
    }
  });
});
