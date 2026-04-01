const vahicalModel = require('../model/vahical'); 

const addvahical = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, description, price, type, fuel } = req.body;

    const vahical = new vahicalModel({
      name,
      description,
      price,
      type,
      fuel: Array.isArray(fuel) ? fuel : [fuel],
      image: req.file ? req.file.filename : null,
    });

    await vahical.save();

    res.json(vahical);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  addvahical,
}