const express = require('express')
const multer = require('multer')
const router = express.Router()
const uploadFile = require('../service/storage.service')
const upload = multer({storage:multer.memoryStorage()}); 
/*
Multer - this is a middleware, just like "app.use(express.json())". memoryStorage is RAM of Server
*/ 

/*
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

        res.status(201).json({
            message: "Song created successfully",
            song: req.body,
            fileURL: fileData.url // Optional, but useful
        });
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ message: "Upload failed", error });
    }
});



module.exports = router;