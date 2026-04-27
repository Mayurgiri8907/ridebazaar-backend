const mongoose = require("mongoose");

const vahicalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    totalprice: {
      type: Number,
      required: true,
    }, 

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["Car", "Bike"],
      required: true,
    },

    fuel: {
      type: [String],
      default: [],
    },

    // ✅ Images as object (matches your frontend)
    images: {
      front: {
        type: String,
        default: "",
      },
      back: {
        type: String,
        default: "",
      },
      left: {
        type: String,
        default: "",
      },
      right: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true, // 👈 adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("vahical", vahicalSchema);