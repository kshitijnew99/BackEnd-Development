const express = require('express')
const authmiddleware = require('../middlewares/auth.middleware')
const {createPostController} = require('../controllers/post.controllers')
const multer = require('multer')

const router = express.Router()

const upload = multer({ storage : multer.memoryStorage()})

router.post('/file', // /post/ :- only gets the image file
    authmiddleware, // req.user = user  
    upload.single('image'),
    createPostController
)



module.exports = router;