const mongoose = require("mongoose");

const vahicalSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  type: String,
  fuel: [String],
  images: {
    front: String,
    back: String,
    left: String,
    right: String,
  },
});

module.exports = mongoose.model("vahical", vahicalSchema);