const vahicalModel = require('../model/vahical');


const addvahical = async (req,res) => {

    try {
    const { name, description, price, type, fuel } = req.body;

    if (!["Car", "Bike"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (!name || !description || !price || !type || fuel) {

            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

   

    const imagePaths = req.files.map((file) => file.path);

    const vehicle = await vahicalModel.create({
      name,
      description,
      price,
      type,
      fuel,
      images: imagePaths,
    });

    res.status(201).json({
      message: "Vehicle added",
      data: vehicle,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    
}



module.exports = {
    addvahical,
}