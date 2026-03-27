const vahicalModel = require("../model/vahical");

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type } = req.body;

    // validate type
    if (!type || !["Car", "Bike"].includes(type)) {
      return res.status(400).json({ message: "Invalid vehicle type" });
    }

    // fuel parse
    let fuelData;
    try {
      fuelData = JSON.parse(req.body.fuel);
    } catch {
      fuelData = req.body.fuel?.split(",") || [];
    }

    // normalize fuel
    fuelData = fuelData.map(f => {
      const val = f?.toLowerCase().trim();
      if (val === "petrol") return "Petrol";
      if (val === "diesel") return "Diesel";
      if (val === "cng") return "CNG";
      if (val === "electric" || val === "eletric") return "Electric";
      return null;
    }).filter(Boolean);

    // images
    const imagePaths = req.files?.map(file => file.path) || [];

    const vahical = await vahicalModel.create({
      name,
      description,
      price: Number(price),
      type,
      fuel: fuelData,
      images: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully...",
      data: vahical,
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addvahical };