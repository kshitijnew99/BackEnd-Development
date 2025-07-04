const express = require('express')

const app = express();


// Using n=middle where to read the data send form the frontend

app.use(express.json())

// Notes APi
app.post('/notes',(req,res)=>{
    console.log(req.body);
    
})

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000')
})