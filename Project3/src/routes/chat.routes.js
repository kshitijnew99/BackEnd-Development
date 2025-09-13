const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controllers')


router.post('/',chatController)




module.exports = router
