const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const usersingup = async (req,res) => {

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

        // check user already exists
        const existuser = await userModel.findOne({email});
        if(existuser){
            return res.status(400).json({
                success : false,
                message : 'user already exists',
            });
        }

        const user = await userModel.create({name, email, password});

        const token = jwt.sign(
            {userId : user._id, email : user.email},
            process.env.JWT_SECRET_KEY,
            { expiresIn : '1h' }
        );

        res.status(200).json({
            success : true,
            message : 'singup successfully...',
            token,
            data : user
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }

}

const userlogin = async (req,res) => {

    try {
        
        const {email, password} = req.body;
        
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid password or email',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(401).json({ success : false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {userId : user._id, email : user.email },
            process.env.JWT_SECRET_KEY,
            {expiresIn : '1h' }
        );

          res.status(200).json({
            success: true,
            message: 'User logged in successfully...',
            token,
            data: user
        });

    } catch (error) {
         res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }

}



module.exports = {
    usersingup,
    userlogin,
}