const vahicalModel = require('../model/vahical'); 

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type, fuel } = req.body;

    const vahical = new vahicalModel({
      name,
      description,
      price,
      type,
      fuel: Array.isArray(fuel) ? fuel : [fuel],
      image: req.file.filename,
    });

    await vahical.save();

    res.json(vahical);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  addvahical,
}