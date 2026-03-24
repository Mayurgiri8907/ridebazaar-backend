const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
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
    phone : {
        type : String,
    },
    drivingphoto : {
        type : String,
    },
    adharfrontphoto : {
        type : String,
    },
    adharbackphoto : {
        type : String,
    },
    picupdate : {
        type : String,
    },
    drowpdate : {
        type : String,
    },
    createat : {
        type : Date,
    },
    updateat : {
        type : Date,
    }

});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user",userSchema);