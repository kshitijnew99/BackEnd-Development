require('dotenv').config()
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/service/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => { 
  console.log('Socket.io connected');

  socket.on("disconnect",()=>{
    console.log('Socket.io disconnected');  
  })

  socket.on("Question",async (data)=>{
    console.log("Received AI message");
    const response = await generateResponse(data.prompt)
    console.log("AI response : ",response);
    socket.emit("Answer", {response})

  })

});
httpServer .listen(3000,()=>{
    console.log("server is running on port 3000");
})