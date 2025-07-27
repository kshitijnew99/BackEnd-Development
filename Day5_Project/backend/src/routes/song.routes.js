const express = require('express')
const multer = require('multer')


const router = express.Router()




const upload = multer({storage:multer.memoryStorage()}); // this is a middleware, just like "app.use(express.json())". memoryStorage is RAM of Server

/*
title
artist
audio

*/


router.post('/song',(req,res)=>{
    
    console.log(req.body);
    res.status(201).json({
        message:"Song created successfully",
        song:req.body
    })
    
})


module.exports = router;