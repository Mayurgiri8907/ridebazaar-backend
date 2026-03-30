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
  fuel: [
    {
      type: String,
      enum: ["Petrol", "CNG", "Electric", "Diesel"],
      required : true,
    },
  ],
    
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