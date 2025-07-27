const express = require('express')


const router = express.Router()


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