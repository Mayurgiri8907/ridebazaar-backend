const vahicalModel = require("../model/vahical");

const addvahical = async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const { name, description, price, type, fuel } = req.body;

      const vahical = await vahicalModel.create({
        name,
        description,
        price,
        type,
        fuel: JSON.parse(fuel),
        images: req.files.map((file) => file.filename),
        createdBy: req.user.userId, // ✅ important fix
      });

      res.status(201).json(vahical);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

module.exports = { addvahical };