const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const assetSchema = new Schema(
  {
    assetId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceAverage: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
    },
    growPercent: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalProfit: {
      type: Number,
      required: true,
    },
    grow: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    icon: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Joi = require("joi");

const createAssetSchema = Joi.object({
  _id: Joi.string(),
  assetId: Joi.string().required(),
  amount: Joi.number().required(),
  price: Joi.number().required(),
  date: Joi.string().required(),
  growPercent: Joi.number().required(),
  totalAmount: Joi.number().required(),
  totalProfit: Joi.number().required(),
  grow: Joi.boolean().required(),
  name: Joi.string().required(),
  priceAverage: Joi.number().required(),
  icon: Joi.string().required(),
  symbol: Joi.string().required(),
});

const updateAssetSchema = Joi.object({
  _id: Joi.string(),
  assetId: Joi.string(),
  amount: Joi.number(),
  price: Joi.number(),
  date: Joi.string(),
  growPercent: Joi.number(),
  totalAmount: Joi.number(),
  totalProfit: Joi.number(),
  owner: Joi.object(),
  grow: Joi.boolean(),
  name: Joi.string(),
  priceAverage: Joi.number(),
  icon: Joi.string(),
  symbol: Joi.string(),
});

const updateAllAssetsSchema = Joi.array().items(
  Joi.object({
    _id: Joi.string(),
    assetId: Joi.string(),
    amount: Joi.number(),
    price: Joi.number(),
    date: Joi.string(),
    growPercent: Joi.number(),
    totalAmount: Joi.number(),
    totalProfit: Joi.number(),
    owner: Joi.object(),
    grow: Joi.boolean(),
    name: Joi.string(),
    priceAverage: Joi.number(),
    icon: Joi.string(),
    symbol: Joi.string(),
  })
);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

assetSchema.post("save", handleMongooseError);

const Asset = model("asset", assetSchema);

const schemas = {
  createAssetSchema,
  updateAssetSchema,
  updateFavoriteSchema,
  updateAllAssetsSchema,
};

module.exports = { Asset, schemas };
