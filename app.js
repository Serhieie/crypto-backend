const express = require("express");
const { Message } = require("./models/message");
const logger = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const { User } = require("./models/user");
const { createServer } = require("http");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const assetsRouter = require("./routes/api/assets");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const messagesRouter = require("./routes/api/messages");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("chat-message", async ({ message, senderName, senderEmail }) => {
    try {
      const user = await User.findOne({ name: senderName, email: senderEmail });
      if (!user) {
        throw new Error("User not found");
      }
      const newMessage = new Message({
        message,
        sender: user._id,
        senderName,
        senderEmail,
      });
      await newMessage.save();
      io.emit("chat-message", newMessage);
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/messages", messagesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = httpServer;
