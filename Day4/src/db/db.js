const mongoose = require("mongoose")



function connectToDb(){
    mongoose.connect(process.env.mongoDB_url)
    .then(()=>{
        console.log("Connect To DB");
    })
    
    
}

module.exports = connectToDb