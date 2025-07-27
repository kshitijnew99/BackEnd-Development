const express = require('express')
const multer = require('multer')
const router = express.Router()

const upload = multer({storage:multer.memoryStorage()}); 
/*
Multer - this is a middleware, just like "app.use(express.json())". memoryStorage is RAM of Server
*/ 

/*
title
artist
audio

*/


router.post('/song',upload.single("audio"),(req,res)=>{
    
    console.log(req.body);
    console.log(req.file);
    
    res.status(201).json({
        message:"Song created successfully",
        song:req.body
    })
    
})


module.exports = router;