const {Server}  =  require("socket.io");
// import { init } from "../models/chat.models";
const cookie = require("cookie")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.models")

function initSocketServer(httpServer){

    const io = new Server(httpServer,{})


    // socket.io middleware 
    io.use(async (socket,next)=>{

        const cookies = cookie.parse(socket.handshake.headers.cookie || ""); 
        /** code to extract value of cookie passed at postman header side or
         *  something cookie.parse get a undefined values so we added || "" to privent this situation */


        console.log("Socket connection cooies :", cookies);

        
        if(!cookies.token){
            next(new Error("Authentication error : no token provider"));
        }

        try {
            const decode = jwt.verify(cookies.token, process.env.JWT_TOKEN)

            const user = await userModel.findById(decode.id)

            socket.user = user;

            next();


        } catch (error) {
            next(new Error("Authentication error : Invalid Token"))
        }


        next();
        
    })

    // socket.io starting server
    io.on("connection", (socket)=>{
        console.log("connected User : ", socket.user);
        
        console.log("New socket connection : " , socket.id);
        
    })

}


module.exports = initSocketServer