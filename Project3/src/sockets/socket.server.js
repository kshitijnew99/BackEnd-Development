const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const { generateResponse } = require("../services/ai.service");

function initSocketServer(httpServer) {

    const io = new Server(httpServer, {});

    // socket.io middleware
    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            return next(new Error("Authentication error : no token provider"));
        }

        try {
            const decode = jwt.verify(cookies.token, process.env.JWT_TOKEN);
            const user = await userModel.findById(decode.id);
            socket.user = user;
            next();
        } catch (error) {
            return next(new Error("Authentication error : Invalid Token"));
        }
    });
    
    // socket.io starting server
    io.on("connection", (socket) => {
        socket.on("ai-message", async (MessagePayload) => {
            console.log("Received ai-message:", MessagePayload); 
            try {
                // Gemini expects contents as an array of objects
                const aiResponse = await generateResponse([{ text: MessagePayload.content }]);
                socket.emit("ai-response", {
                    content: aiResponse,
                    chat: MessagePayload.chat
                });
                console.log("Sent ai-response:", aiResponse);
                
            } catch (error) {
                socket.emit("ai-response", {
                    error: error.message
                });
            }
        });
    });
}

module.exports = initSocketServer;