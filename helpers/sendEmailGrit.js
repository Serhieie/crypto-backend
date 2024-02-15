const sandGrid = require("@sendgrid/mail");
require("dotenv").config();
const { SEND_GRID_API_KEY } = process.env;
sandGrid.setApiKey(SEND_GRID_API_KEY);

const sendEmailGrit = async (data) => {
  const email = { ...data, from: "bohdanserhieiev@gmail.com" };
  await sandGrid.send(email);
  return true;
};

module.exports = sendEmailGrit;
