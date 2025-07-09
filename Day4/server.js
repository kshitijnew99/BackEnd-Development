const express = require("express")
const connectToDb = require('./src/db/db')
const noteModel = require('./src/models/note.model')

// server database se server.js me connect karre ge



const app = express()
connectToDb()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.post('/notes', async (req,res)=>{
    const {title,content} = req.body;
    console.log(title,content);
    /*
    note frontend se data req.body me mil raha hai and bus us data ko DB me write karna or we can say DB me create karna
    and create karna ke liye we use Model
    */ 
   await noteModel.create({
    title,content
   })

   res.send({
    message:"Note create successfully"
   })

})


app.get('/notes', async (req,res)=>{
    
    
   const notes = await noteModel.find()

   res.send({
    message:"Note fetch successfully",
    notes
   })

})



// app.get('/notes', async (req,res)=>{
    
    
//    const notes = await noteModel.find()

//    res.send({
//     message:"Note fetch successfully",
//     notes
//    })

// })
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})