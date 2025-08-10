const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username,password} = req.body;

    const isUserExist = await userModel.findOne({
        username:username
    })

    if(isUserExist){
        return res.status(409).json({
            message: `${username} - User already exist`
        })
    }
    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign({
        id:user._id
    },process.env.jwt_secretkey)

    res.cookie("token",token)

    return res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username
        }
    });
}

async function loginController(req,res){
    const {username,password} = req.body;


    const isUserExist = await userModel.findOne({
        username:username
    })

    if(!isUserExist){
        return res.status(400).json({
            message: `${username} - User not found`
        })
    }

    const isPasswordValid = await bcrypt.compare(password,isUserExist.password);

    if(!isPasswordValid){
        res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id:isUserExist._id
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