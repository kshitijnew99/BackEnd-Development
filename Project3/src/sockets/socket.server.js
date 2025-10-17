const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const { generateResponse, generateVector } = require("../services/ai.service");
const messageModel = require("../models/message.models");
const { createVectorMemory, queryMemory } = require("../services/vector.service");



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
      // console.log("Received ai-message:", MessagePayload);

      const message = await messageModel.create({
        chatId: MessagePayload.chatId,
        user: socket.user._id,
        content: MessagePayload.content,
        role: "user",
      });

      // Generate embedding vector for the user's message
      const vector = await generateVector(MessagePayload.content)

      await createVectorMemory({
        vector,
        messageId : message._id,
        metadata : {
          chatId: MessagePayload.chatId,
          user: socket.user._id,
          text: MessagePayload.content
        }
      })
      
      const memory = await queryMemory({
        queryVector : vector,
        limit : 1,
        metadata : {}
      })

      // console.log(memory);
      

      /*Sort by createdAt in ascending order  
      Limit: so that model do not use to many token
      Lean:
      reverse: bcz of createAt = -1 chat history order get reverse so that we use reverse() to reverse it back*/

      const chatHistory = (await messageModel.find({
        chatId: MessagePayload.chatId,
      }).sort({ createdAt: 1 }).limit(20).lean()).reverse() 
       



      try {
        // Gemini expects contents as an array of objects
        const aiResponse = await generateResponse(
            chatHistory.map(item =>{
                return {
                    role: item.role,
                    text : item.content
                }
            })  
        );

        const responseMessage = await messageModel.create({
          chatId: MessagePayload.chatId,
          user: socket.user._id,
          content: aiResponse,
          role: "model",
        });

        console.log("Generated AI Response:", aiResponse);
        
        const responseVector = await generateVector(aiResponse)

        // console.log("Generated Response Vector:", responseVector ? "✓ Success" : "✗ Failed");

        try {
          await createVectorMemory({
            vector: responseVector,
            messageId: responseMessage._id,
            metadata: {
              chatId: MessagePayload.chatId,
              user: socket.user._id,
              text: aiResponse
            }
          })
          console.log("Stored in Pinecone:", "✓ Success");
        } catch (vectorError) {
          console.error("Pinecone storage failed:", vectorError.message);
        }


        // Send the AI response back to the client
        socket.emit("ai-response", {
          content: aiResponse,
          chat: MessagePayload.chatId,
        });
        
      } catch (error) {
        socket.emit("ai-response", {
          error: error.message,
        });
      }
    });
  });
}

module.exports = initSocketServer;
