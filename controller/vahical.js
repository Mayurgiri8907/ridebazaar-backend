const vahicalModel = require('../model/vahical');


const addvahical = async (req,res) => {

    try {
        
        const {name, description, price} = req.body;

         if (!name || !description || !price) {

            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }


        

        const vahical = await vahicalModel.create({name, description, price});

        

        res.status(200).json({
            success : true,
            message : 'vahical successfully...',
            data : vahical
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }

}



module.exports = {
    addvahical,
}