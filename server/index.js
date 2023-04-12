const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = require("http").createServer(app);

const wss = new WebSocket.Server({ server });

let pcInfo = {};

app.get("/api/create", () => {});

wss.on("connection", (ws) => {
  ws.send("New User Connected");
  ws.on("message", (message) => {
    dataObject = JSON.parse(message);

    switch (dataObject.type) {
      case "create":
        pcInfo[dataObject.username] = {
          socketId: dataObject.socketId,
          password: dataObject.password,
        };
        break;

      case "connect":
        if (
          pcInfo[dataObject.username] &&
          pcInfo[dataObject.username].password == dataObject.password
        ) {
          ws.send("connected");
        }
        break;

      case "perform":
        if (
          pcInfo[dataObject.username] &&
          pcInfo[dataObject.username].password == dataObject.password
        ) {
          ws.send(dataObject.function);
        }
        break;

      case "disconnect":
        if (
          pcInfo[dataObject.username] &&
          pcInfo[dataObject.username].password == dataObject.password
        ) {
          delete pcInfo[dataObject.username];
        }
    }
    ws.send(`Hello, you sent -> ${message}`);
  });
});

server.listen(5000, () => {
  console.log("Listening to port 5000");
});
