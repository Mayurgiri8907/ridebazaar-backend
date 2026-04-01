const mongoose = require("mongoose");

const vahicalSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  type: String,
  fuel: [String],
  image: String,
});

module.exports = mongoose.model("vahical", vahicalSchema);