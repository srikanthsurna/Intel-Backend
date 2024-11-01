const mongoose = require("mongoose");
require("dotenv").config();
async function connectTOMongoDB(url) {
  return mongoose.connect(process.env.CONNECTIONSTRING);
}
module.exports = { connectTOMongoDB };
