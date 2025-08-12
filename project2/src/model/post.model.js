const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    immage:String,
    caption:String,
    user:{ // user ki id chahiye
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    } 
})

const postModel = mongoose.model('post', postSchema)


module.exports = postModel