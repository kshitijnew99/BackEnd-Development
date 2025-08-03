const express = require('express');
const userModel = require("../models/user.model")

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

module.exports = router;