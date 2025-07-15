const mongoose = require("mongoose")



function connectToDb(){
    mongoose.connect("mongodb+srv://kshitijraoranjan:GMrgkiMvT4islNph@cluster0.ku6o1z6.mongodb.net/cohort")
    .then(()=>{
        console.log("Connect To DB");
    })
    
    
}

module.exports = connectToDb