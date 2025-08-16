require('dotenv').config()
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => { // connection is an event
  // ...
  console.log('Socket.io connected');

  socket.on("disconnect",()=>{
    console.log('Socket.io disconnected'); // disconnection is an event
  })

  socket.on("message",(data)=>{
    console.log('this is message event in socket iO');
    console.log(data);
    
    
  })
});

httpServer .listen(3000,()=>{
    console.log("server is running on port 3000");
    
})