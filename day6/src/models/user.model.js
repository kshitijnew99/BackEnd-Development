const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

const usermodel = mongoose.model('user',userSchema)

module.exports = usermodel;

