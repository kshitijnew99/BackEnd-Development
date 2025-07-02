const express = require("express")


let app = express();

app.get('/home',(req,res)=>{
    res.send("Welcome to home page");
})

app.get('/about',(req,res)=>{
    res.send("Welcome to about page");
})

app.listen(3000,()=>{
    console.log("server is running at port 3000");
    
})