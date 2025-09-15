const {Server}  =  require("socket.io");
// import { init } from "../models/chat.models";
const cookie = require("cookie")

function initSocketServer(httpServer){

    const io = new Server(httpServer,{})

    io.use((socket,next)=>{

        const cookies = cookie.parse(socket.handshake.headers.cookie);
        console.log("Socket connection cooies :", cookies);

        if(!cookies.token){
            res.status(401).json({
                message : "no user found"
            })
        }
        

        next();
        
    })

    io.on("connection", (socket)=>{
        console.log("New socket connection : " , socket.id);
        
    })

}


module.exports = initSocketServer