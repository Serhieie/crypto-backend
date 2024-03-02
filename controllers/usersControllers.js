const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
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
  const result = await User.findById(id, {
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
  getAllUsers: ctrlWrapper(getAllUsers),
  getById: ctrlWrapper(getById),
};
