const vahicalModel = require("../model/vahical");

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type } = req.body;

    // ✅ SAFE fuel parsing
    let fuelData;
    try {
      fuelData = JSON.parse(req.body.fuel);
    } catch {
      // handle "Petrol" or "Petrol,CNG"
      fuelData = req.body.fuel.includes(",")
        ? req.body.fuel.split(",")
        : [req.body.fuel];
    }

    // ✅ SAFE images
    const imagePaths = req.files?.map(file => file.path) || [];

    const vahical = await vahicalModel.create({
      name,
      description,
      price,
      type,
      fuel: fuelData,
      images: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully...",
      data: vahical, // ✅ fixed
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addvahical,
};