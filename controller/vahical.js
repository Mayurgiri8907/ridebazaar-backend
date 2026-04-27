const vahicalModel = require('../model/vahical');

const addvahical = async (req, res) => {
  try {
    const { name, description, totalprice,price, type, fuel } = req.body;

    // ✅ get files safely
    const files = req.files || {};

    // ✅ S3 URLs (IMPORTANT CHANGE)
    const imageUrls = {
      front: files.front?.[0]?.location || "",
      back: files.back?.[0]?.location || "",
      left: files.left?.[0]?.location || "",
      right: files.right?.[0]?.location || "",
    };

    const vahical = new vahicalModel({
      name,
      description,
      totalprice,
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

const caronly = async (req,res) => {
    
    try {

    const vahicaldata = await vahicalModel.find({ type: "Car" });

    if(vahicaldata.length === 0) {
      res.status(200).json({
      success: true,
      message: "Vahical Car is Not Available",
    });

    }
    res.status(200).json({
      success: true,
      message: "vahical Car data shows successfully...",
      data: vahicaldata,
    });

  } catch (error) {
      res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }

}


const bikeonly = async (req,res) => {
    
    try {

    const vahicaldata = await vahicalModel.find({ type: "Bike" });

    if(vahicaldata.length === 0) {
      res.status(200).json({
      success: true,
      message: "Vahical Bike is Not Available",
    });

    }
    res.status(200).json({
      success: true,
      message: "vahical Bike data shows successfully...",
      data: vahicaldata,
    });

  } catch (error) {
      res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }

}



module.exports = {
  addvahical,
  showvahical,
  deletevahical,
  singlevahical,
  caronly,
  bikeonly,
}