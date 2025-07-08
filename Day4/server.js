const express = require("express")

const app = express()

app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Hello world");
})


app.post('/notes',(req,res)=>{
    const {title,content} = req.body;
    console.log(title,content);
    
    
    

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})