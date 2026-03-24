const mongoose = require('mongoose');

const connectdb = async () => {
    
    try {
        
        await mongoose.connect(process.env.MONGODB_URL);

    } catch (error) {
       console.error(`Error: ${error.message}`);
    process.exit(1); 
    }
}

module.exports = connectdb;