const express = require('express');

const router = express.Router();

router.use((req,res,next)=>{
    console.log('this middleware is btw router and API');
    next();
    
})

router.get("/auth",(req,res)=>{
    res.json({
        message : "/ REST API created"
    })
})


router.post("/auth/register",(req,res)=>{
    const {username,pasword} = req.body;

    const isUserExist = username
})

module.exports = router;