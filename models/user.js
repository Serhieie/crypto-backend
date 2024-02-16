const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];
const userRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: userRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    changePasswordCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(userRegex).required(),
  password: Joi.string().min(6).required().messages({
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
  subscription: Joi.string().validate(...subscriptionList),
});

const verifySchema = Joi.object({
  email: Joi.string().pattern(userRegex).required(),
});

const passwordChangingSchema = Joi.object({
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(userRegex).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

const schemas = {
  loginSchema,
  registrationSchema,
  verifySchema,
  passwordChangingSchema,
};

module.exports = { User, schemas };
