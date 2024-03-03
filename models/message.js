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
    senderInfo: {
      avatarURL: String,
      email: String,
      name: String,
      start: String,
      subscription: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const changeMessageSchema = Joi.object({
  message: Joi.string().required(),
  sender: Joi.string().required(),
  senderInfo: Joi.object({
    avatarURL: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    start: Joi.string().required(),
    subscription: Joi.string().required(),
  }).required(),
});
const schemas = {
  changeMessageSchema,
};

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message, schemas };
