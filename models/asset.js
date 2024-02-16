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
    priceAvarenge: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
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
  assetId: Joi.string().required(),
  amount: Joi.number().required(),
  price: Joi.number().required(),
  date: Joi.number().required(),
  growPercent: Joi.number().required(),
  totalAmount: Joi.number().required(),
  totalProfit: Joi.number().required(),
  grow: Joi.boolean().required(),
  name: Joi.string().required(),
  priceAvarenge: Joi.number().required(),
  icon: Joi.string().required(),
  symbol: Joi.string().required(),
});

const updateAssetSchema = Joi.object({
  assetId: Joi.string(),
  amount: Joi.number(),
  price: Joi.number(),
  date: Joi.number(),
  growPercent: Joi.number(),
  totalAmount: Joi.number(),
  totalProfit: Joi.number(),
  grow: Joi.boolean(),
  name: Joi.string(),
  priceAvarenge: Joi.number(),
  icon: Joi.string(),
  symbol: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

assetSchema.post("save", handleMongooseError);

const Asset = model("asset", assetSchema);

const schemas = {
  createAssetSchema,
  updateAssetSchema,
  updateFavoriteSchema,
};

module.exports = { Asset, schemas };
