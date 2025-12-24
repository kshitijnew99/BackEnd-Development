const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_KEY)
        console.log("Connected to DB");

    }catch(err){

        console.log("Error connecting to DB", err);
    }
}


module.exports = connectDB;