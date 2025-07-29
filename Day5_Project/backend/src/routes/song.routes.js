const express = require('express')
const multer = require('multer')
const router = express.Router()
const uploadFile = require('../service/storage.service')
const upload = multer({storage:multer.memoryStorage()});
const songModel = require('../models/song.model')

/*
Multer - this is a middleware, just like "app.use(express.json())". memoryStorage is RAM of Server

title
artist
audio
*/
 

router.post('/song', upload.single("audio"), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const fileData = await uploadFile(req.file);
        console.log(fileData);

        const song = await songModel.create({
            title:req.body.title,
            artist:req.body.artist,
            audio:fileData.url,
            mood:req.body.mood
        })



        res.status(201).json({
            message: "Song created successfully",
            song: song
            
        });
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ message: "Upload failed", error });
    }
});

router.get('/song', async (req,res)=>{
     const {mood} = req.query; // for example mood = sad

     const song = await songModel.find({
        mood: mood
    })

    res.status(200).json({
        message:"Songs Fetched successfully",
        song : song
    })
});



module.exports = router;