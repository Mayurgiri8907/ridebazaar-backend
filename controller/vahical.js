const vahicalModel = require('../model/vahical'); 

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type, fuel } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ HANDLE MULTIPLE IMAGES SAFELY
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(
        (file) => `${baseUrl}/uploads/${file.filename}`
      );
    }

    const vahical = new vahicalModel({
      name,
      description,
      price,
      type,

      // ✅ always store as array
      fuel: Array.isArray(fuel) ? fuel : fuel ? [fuel] : [],

      images: imageUrls,
    });

    await vahical.save();

    res.status(201).json({
      success: true,
      message: "vahical added successfully...",
      data: vahical,
    });

  } catch (err) {
    console.error("ADD VAHICAL ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};




module.exports = {
  addvahical,
}