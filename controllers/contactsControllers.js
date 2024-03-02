const { HttpError, ctrlWrapper } = require("../helpers");
const { Asset } = require("../models/asset");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Asset.find({ owner }, "-createdAt  -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Asset.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await Asset.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateAllAssets = async (req, res) => {
  const { _id: owner } = req.user;
  const updatedAssets = await Promise.all(
    [...req.body].map(async (asset) => {
      const { _id, ...updateData } = asset;
      const existingAsset = await Asset.findOne({ _id, owner });
      if (!existingAsset) {
        throw new HttpError(
          404,
          `Asset with id ${_id} not found or does not belong to this owner`
        );
      }
      const updatedAsset = await Asset.findByIdAndUpdate(_id, updateData, { new: true });
      if (!updatedAsset) {
        throw new HttpError(404, `Asset with id ${_id} not found`);
      }
      return updatedAsset;
    })
  );
  res.json(updatedAssets);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Asset.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await Asset.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "delete succes",
  });
};

const post = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Asset.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  updateAllAssets: ctrlWrapper(updateAllAssets),
  remove: ctrlWrapper(remove),
  updateFavorite: ctrlWrapper(updateFavorite),
  post: ctrlWrapper(post),
};
