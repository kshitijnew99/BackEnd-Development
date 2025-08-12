const express = require('express')
const authmiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')

const router = express.Router()

const upload = multer({ storage : multer.memoryStorage})

router.post('/', // /post/ :- only gets the image file
    authmiddleware, // req.user = user  
    upload.single('image'),
    // createPostController
)



module.exports = router;