const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect(process.env.DB_url)
    .then(()=>{
        console.log("Connect to DB"); 
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB