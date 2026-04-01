const vahicalModel = require('../model/vahical'); 

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type, fuel } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ MULTIPLE IMAGES
    const imageUrls = req.files.map(
      (file) => `${baseUrl}/uploads/${file.filename}`
    );

    const vahical = new vahicalModel({
      name,
      description,
      price,
      type,
      fuel: Array.isArray(fuel) ? fuel : [fuel],
      images: imageUrls, // 👈 store array
    });

    await vahical.save();

    res.json({
      success : true,
      message : "vahical added successfully...",
      data : vahical
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  addvahical,
}