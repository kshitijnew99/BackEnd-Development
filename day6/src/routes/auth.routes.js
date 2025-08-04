const express = require('express');
const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')

const router = express.Router();

router.use((req,res,next)=>{
    console.log('this middleware is btw router and API');
    next();
    
})


router.post("/register", async (req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.status(201).json({
        message:"user registered successfully",
        user,
        token
    })
})

router.post('/login', async (req,res)=>{
    const {username,password} = req.body;

    const isUserExists = await userModel.findOne({
        username:username
    })

    if(!isUserExists){
        return res.status(401).json({
            message:`${username} User not found` 
        })
    }

    const isPasswordValid = password == isUserExists.password;
    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    
    return res.status(200).json({
            message:"user logged in successfully",
    })
})

router.get('/user',(req,res)=>{
    const {token} = req.body;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const decode = jwt.verify(token , process.env.JWT_SECRET)

    res.send(decode)
})

module.exports = router;