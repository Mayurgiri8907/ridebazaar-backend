const vahicalModel = require('../model/vahical'); 

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type, fuel } = req.body;

    // ✅ ADD THIS LINE HERE
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const vahical = new vahicalModel({
      name,
      description,
      price,
      type,
      fuel: Array.isArray(fuel) ? fuel : [fuel],

      // ✅ AND USE IT HERE
      image: req.file
        ? `${baseUrl}/uploads/${req.file.filename}`
        : null,
    });

    await vahical.save();

    res.json(vahical);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  addvahical,
}