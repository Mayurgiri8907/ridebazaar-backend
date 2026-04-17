const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  vehicleId: String,
  price: Number,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

module.exports =  mongoose.model("Order", orderSchema);