const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const changeMessageSchema = Joi.object({
  message: Joi.string().required(),
  sender: Joi.string().required(),
  senderEmail: Joi.string().required(),
});

const schemas = {
  changeMessageSchema,
};

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message, schemas };
