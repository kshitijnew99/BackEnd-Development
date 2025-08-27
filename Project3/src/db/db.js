const mongoose = require("mongoose")


async function connectDB(){
    await mongoose.connect(process.env.mongoDB)

    console.log("Connected to DB");
    
}


module.exports = connectDB