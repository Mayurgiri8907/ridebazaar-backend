const vahicalModel = require('../model/vahical'); 

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type, fuel } = req.body;

    const imagePaths = req.files.map(file => file.filename);

    const vehicle = await vahicalModel.create({
      name,
      description,
      price,
      type,
      fuel: JSON.parse(fuel), // array
      images: imagePaths,
      userId: req.user.id,
    });

    res.json(vehicle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};



module.exports = {
  addvahical,
}