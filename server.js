const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT } = process.env;
const http = require("http");
const { Server } = require("socket.io");

mongoose.set("strictQuery", true);

const httpServer = http.createServer(app);
const listenThis = app.get("env") === "development" ? 3021 : process.env.PORT;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
  });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    httpServer.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
