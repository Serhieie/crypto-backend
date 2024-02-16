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

// type Asset = {
//   amount: number,
//   assetId: string,
//   date: number,
//   grow: boolean,
//   growPercent: number,
//   icon: string,
//   name: string,
//   owner: {
//     _id: string,
//     name: string,
//     email: string,
//   },
//   price: number,
//   priceAverage: number, // Змінив назву поля, оскільки "priceAvarenge" містить орфографічну помилку
//   symbol: string,
//   totalAmount: number,
//   totalProfit: number,
//   _id: string,
// };

// amount: 1;
// assetId: "wrapped-bitcoin";
// date: 1708100738376;
// grow: true;
// growPercent: 0;
// icon: "https://static.coinstats.app/coins/wrapped-bitcoinoc1.png";
// name: "Wrapped Bitcoin";
// price: 52178;
// priceAvg: 52178;
// symbol: "WBTC";
// totalAmount: 52178;
// totalProfit: 0;
const createAssetSchema = Joi.object({
  _id: Joi.string(),
  assetId: Joi.string().required(),
  amount: Joi.number().required(),
  price: Joi.number().required(),
  date: Joi.number().required(),
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
  date: Joi.number(),
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
