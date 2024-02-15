const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
require("dotenv").config();
const {
  HttpError,
  ctrlWrapper,
  sendEmailGrit,
  createVerifyEmailMarkup,
} = require("../helpers");
const { User } = require("../models/user");
const { nanoid } = require("nanoid");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationCode,
  });

  const verEmail = {
    to: email,
    subject: "Verify email",
    html: createVerifyEmailMarkup(BASE_URL, verificationCode),
  };
  await sendEmailGrit(verEmail);
  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401, "Email already verifyed");
  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });
  res.json({
    message: "Email verify success",
  });
};

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email not found");
  if (user.verify) throw HttpError(401, "Email already verifyed");

  const verEmail = {
    to: email,
    subject: "Verify email",
    html: createVerifyEmailMarkup(BASE_URL, user.verificationCode),
  };

  await sendEmailGrit(verEmail);

  res.json({
    message: "Email verify send success",
  });
};

const login = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401);
  if (!user.verify) throw HttpError(401, "Email is not verifyed");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401);
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: {
      name,
      email,
      subscription: user.subscription,
    },
    token,
  });
};

const current = async (req, res) => {
  const { email, name } = req.user;
  res.json({ name, email });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout succes" });
};

const updtAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    user: {
      avatarURL,
    },
    message: "Success: Avatar changed successfully.",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resentVerifyEmail: ctrlWrapper(resentVerifyEmail),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updtAvatar: ctrlWrapper(updtAvatar),
};
