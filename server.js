const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT } = process.env;
const http = require("http");
const { Server } = require("socket.io");

mongoose.set("strictQuery", true);

const httpServer = http.createServer(app);
const listenThis = process.env.PORT || 3021;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    io.listen(listenThis);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
