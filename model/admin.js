const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    createat : {
        type : Date,
    },
    updateat : {
        type : Date,
    }

});

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("admin",adminSchema);