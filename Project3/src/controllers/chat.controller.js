const chatModel = require("../models/chat.models")

async function createChat(req,res){
    const {title} = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user : user._id,
        title
    })

    res.status(201).json({
        message : "Chat created Succesfully",
        chat:{
            _id : chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity

        }
    });
}


module.exports = {createChat}