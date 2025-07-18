const mongoose = require('mongoose');

function connectDB(){

    mongoose.connect(process.env.mongodb_url)
    .then(()=>{
        console.log("connect to MongoDB");
    }).catch((err)=>{
        console.log("Error connecting to mongoDB",err);
    })
}

module.exports = connectDB;