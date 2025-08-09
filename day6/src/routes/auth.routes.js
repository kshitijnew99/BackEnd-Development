const express = require('express');
const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const router = express.Router();

/* 4 step of :-- Validation ++++ data correct form me hai ki nahi
                 Verification  ++++ data sahi hai ki nahi
                 Authentication ++++ user kon hai
                 Authorization ---- ek user kya kya kar sakta hai*/

router.use((req,res,next)=>{
    // console.log('this middleware is btw router and API');
    next();
    
})


router.post("/register", async (req,res)=>{
    const {username,password} = req.body;

    const isUserExists = await userModel.findOne({
        username:username
    })

    if(isUserExists){
        return res.status(409).json({
            message:`${username} User already in use` 
        })
    }

    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message:"user registered successfully",
        user
        
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



router.get('/user', async (req,res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try {
        const decode = jwt.verify(token , process.env.JWT_SECRET) // return the data we use to create the token

        const user = await userModel.findOne({
            id:decode._id
        }).select("-password -__v") 

        res.status(200).json({
            message:"user data fetch successfully",
            user
        })
    } 
    catch (error) {
        return res.status(401).json({
            message:"invalid token"
        })
    }
})

router.get('/logout', async (req,res)=>{
    res.clearCookie("token");

    res.status(200).json({
        message:"user logged out successfully"
    })
})


module.exports = router;