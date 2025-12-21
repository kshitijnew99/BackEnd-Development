const express = require('express');
const morgan = require('morgan');


const app = express();

app.set('view engine', 'ejs');
app.use(morgan("dev"));

app.post("/auth/register", (req,res)=>{
    res.status(201).send({
        message:"User registered successfully"
    });
})

// browser pe kuch bhi likho uski methon always GET hoti hai
app.get("/", (req,res)=>{
    res.render("index")
});

module.exports = app;