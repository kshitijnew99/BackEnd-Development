const express = require('express');

const router = express.Router();

router.use((req,res,next)=>{
    console.log('this middleware is btw router and API');
    next();
    
})

router.get("/",(req,res)=>{
    res.json({
        message : "/ REST API created"
    })
})

module.exports = router;