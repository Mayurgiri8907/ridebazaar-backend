// models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);