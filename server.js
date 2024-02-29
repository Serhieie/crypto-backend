const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT } = process.env;
const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("chat-message", (message) => {
        io.emit("chat-message", message);
      });
    });

    console.log("Socket server is running");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
