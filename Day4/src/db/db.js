const mongoose = require("mongoose")

// server database se kis tarah connnect hoga wo logic db.js me likhe ge



function connectToDB(){
    mongoose.connect("mongodb+srv://kshitijraoranjan:OF8uS61l3Ya2kbGt@cluster0.ku6o1z6.mongodb.net/cohort")
    .then(()=>{
        console.log("Connected to DB");
        
    })
}


module.exports = connectToDB