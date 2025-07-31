const express = require('express');

const router = express.Router();


router.get("/",(req,res)=>{
    res.json({
        message : "/ REST API created"
    })
})

module.exports = router;