const express = require("express")

const app = express();


app.get('/home',(req,res)=>{
    res.send("Welcome to the Home page")
})

app.get('/about',(req,res)=>{
    res.send("Welcome to the about page")
})

app.listen(3000,()=>{
    console.log("server is runnuing on the post 3000");
    
})