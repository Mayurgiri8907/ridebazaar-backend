const mongoose =  require("mongoose");

const vehicleSchema = new mongoose.Schema(
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
      enum: ["Petrol", "Diesel", "CNG"],
      required: true,
    },

    images: {
      type: [String], // store image URLs
      validate: [(val) => val.length <= 4, "Max 4 images allowed"],
    },
    createat : {
        type : Date,
    },
    updateat : {
        type : Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);