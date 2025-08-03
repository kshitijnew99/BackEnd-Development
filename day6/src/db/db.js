const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.mongoDB_url)
    .then(()=>{
        console.log('connected to DB');
        
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = connectDB;