const vahicalModel = require('../model/vahical');

const addvahical = async (req, res) => {
  try {
    const { name, description, price, type, fuel } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ get files safely
    const files = req.files || {};

    // ✅ build image object (matches schema)
    const imageUrls = {
      front: files.front?.[0]
        ? `${baseUrl}/uploads/${files.front[0].filename}`
        : "",
      back: files.back?.[0]
        ? `${baseUrl}/uploads/${files.back[0].filename}`
        : "",
      left: files.left?.[0]
        ? `${baseUrl}/uploads/${files.left[0].filename}`
        : "",
      right: files.right?.[0]
        ? `${baseUrl}/uploads/${files.right[0].filename}`
        : "",
    };

    const vahical = new vahicalModel({
      name,
      description,
      price,
      type,
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

const showvahical = async (req,res) => {

  try {

    const vahicaldata = await vahicalModel.find();

    res.status(201).json({
      success: true,
      message: "vahical data shows successfully...",
      data: vahicaldata,
    });

  } catch (error) {
      res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
}

const deletevahical = async (req, res) => {
  try {
    const { id } = req.params;

    const vahical = await vahicalModel.findByIdAndDelete(id);

    if (!vahical) {
      return res.status(404).json({
        success: false,
        message: "vahical not found",
      });
    }

    res.json({
      success: true,
      message: "vahical deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const singlevahical = async (req,res) => {

  try {
    
    const { id } = req.params;

    const vahical = await vahicalModel.findById(id);

    if (!vahical) {
      return res.status(404).json({
        success: false,
        message: "vahical not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "single vahical show successfully",
      data : vahical
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}

module.exports = {
  addvahical,
  showvahical,
  deletevahical,
  singlevahical,
}