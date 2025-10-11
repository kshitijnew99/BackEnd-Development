const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const { generateResponse } = require("../services/ai.service");
const messageModel = require("../models/message.models");

function initSocketServer(httpServer) { 

    const io = new Server(httpServer, {});

    // socket.io middleware
    io.use(async (socket, next) => {

        
        const cookies = cookie.parse(socket.handshake.headers?.cookie || ""); 
        /*cookie is need to extract the cookie from the token
         give in the header from the postman*/ 

        if (!cookies.token) {
            return next(new Error("Authentication error : no token provider"));
        }

        try {

            const decode = jwt.verify(cookies.token, process.env.JWT_TOKEN);

            const user = await userModel.findById(decode.id);

            socket.user = user;
            // console.log("User Connected :", socket.user);
            

            next();
        } catch (error) {
            return next(new Error("Authentication error : Invalid Token"));
        }
    });
    
    // socket.io starting server
    io.on("connection", (socket) => {


        socket.on("ai-message", async (MessagePayload) => {

            console.log("Received ai-message:", MessagePayload); 

            await messageModel.create({
                chatId : MessagePayload.chatId,
                user : socket.user._id,
                content : MessagePayload.content,
                role : "user"
            })


            try {
                // Gemini expects contents as an array of objects
                const aiResponse = await generateResponse([{ text: MessagePayload.content }]);

                await messageModel.create({
                    chatId : MessagePayload.chatId,
                    user : socket.user._id,
                    content : aiResponse,
                    role : "model"
                })

                // Send the AI response back to the client
                socket.emit("ai-response", {
                    content: aiResponse,
                    chat: MessagePayload.chatId
                });

                console.log("ai-response:", aiResponse);

                
                
            } catch (error) {
                socket.emit("ai-response", {
                    error: error.message
                });
            }
        });
    });
}

module.exports = initSocketServer;