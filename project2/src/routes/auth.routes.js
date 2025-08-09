const express = require('express')
const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/register',async(req,res)=>{
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

    // const token = jwt.sign({
    //     id:user._id
    // },process.env.jwt_secretkey)


    res.status(201).json({
        message: "User created successfully",
        user
    })
})


module.exports = router
