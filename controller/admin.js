const adminModel = require('../model/admin');
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const adminsingup = async (req,res) => {

    try {
        
        const {name, email, password} = req.body;

         if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
            });
        }

        // check admin already exists
        const existadmin = await adminModel.findOne({email});
        if(existadmin){
            return res.status(400).json({
                success : false,
                message : 'admin already exists',
            });
        }

        const admin = await adminModel.create({name, email, password, createat : Date.now()});

        const token = jwt.sign(
  { userId: admin._id, email: admin.email, role: admin.role },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1h" }
);

        res.status(200).json({
            success : true,
            message : 'singup successfully...',
            token,
            data : admin
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }

}

const adminlogin = async (req,res) => {

    try {
        
        const {email, password} = req.body;
        const admin = await adminModel.findOne({email});
        
        if(!admin){
            return res.status(400).json({
                success: false,
                message: 'Invalid password or email',
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch){
            return res.status(401).json({ success : false, message: 'Invalid credentials' });
        }

  const token = jwt.sign(
  { userId: admin._id, email: admin.email, role: admin.role },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1h" }
);

          res.status(200).json({
            success: true,
            message: 'admin logged in successfully...',
            token,
            data: admin
        });

    } catch (error) {
         res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }

}

const showallusers = async (req, res) => {
  try {
    //  Safe access
    if (!req.user || req.user.role !== "admin") {
        
      return res.status(403).json({
        success: false,
        message: "Only admins can access this",
      });
    }

    const users = await userModel.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
} 

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    //  Check admin role
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete users",
      });
    }

    //  Check user exists
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  Delete user
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};


module.exports = {
    adminsingup,
    adminlogin,
    showallusers,
    deleteUser,
}