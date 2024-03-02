const { HttpError, ctrlWrapper } = require("../helpers");
const { Message } = require("../models/message");

const getAllMessages = async (req, res) => {
  try {
    const users = await Message.find(
      {},
      { password: 0, verificationCode: 0, changePasswordCode: 0, token: 0 }
    );
    res.json(users);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Message.findById(id, {
    password: 0,
    verificationCode: 0,
    changePasswordCode: 0,
    token: 0,
  });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllMessages: ctrlWrapper(getAllMessages),
  getById: ctrlWrapper(getById),
};
