const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

async function registerController(req,res){
    const {username,password} = req.body;

    const isUserExist = await userModel.findOne({
        username:username
    })

    if(isUserExist){
        res.status(409).json({
            message: `${username} - User already exist`
        })
    }
    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id:user._id
    },process.env.jwt_secretkey)

    res.cookie("token",token)

    return res.status(201).json({
        message: "User created successfully",
        user
    })
}

async function loginController(req,res){
    const {username,password} = req.body;


    const isUserExist = await userModel.findOne({
        username:username
    })

    if(!isUserExist){
        res.status(400).json({
            message: `${username} - User not found`
        })
    }

    const isPasswordValid = password === isUserExist.password;

    if(!isPasswordValid){
        res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.jwt_secretkey)

    res.cookie("token",token)

    return res.status(200).json({
        message: "User logged in successfully",
        user:{
            username: isUserExist.username,
            id: isUserExist._id
        }
    })


}

module.exports = {
    registerController,
    loginController 
}