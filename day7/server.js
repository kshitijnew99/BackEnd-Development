const { log } = require('console');
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
//   console.log('Socket.io connected');

  
});

httpServer .listen(3000,()=>{
    console.log("server is running on port 3000");
    
})