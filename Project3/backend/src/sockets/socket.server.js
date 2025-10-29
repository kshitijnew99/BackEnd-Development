const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const { generateResponse, generateVector } = require("../services/ai.service");
const messageModel = require("../models/message.models");
const { createVectorMemory, queryMemory } = require("../services/vector.service");



function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin : "http://localhost:5173",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

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

    console.log("User connected : ", socket.user._id);
    

    socket.on("ai-message", async (MessagePayload) => {
      
      // SEQUENCE: 1 2  (parallel execution)
      const [message, vector] = await Promise.all([
        // Task 1: User message save to DB
        messageModel.create({
          chatId: MessagePayload.chatId,
          user: socket.user._id,
          content: MessagePayload.content,
          role: "user",
        }),
        // Task 2: Generate vector for user message
        generateVector(MessagePayload.content),
        
      ]);
      
      // Task 4: Save user message in pinecone (can run with 1&2 since it only needs the results)
      await createVectorMemory({
          vector,
          messageId: message._id,
          metadata: {
            chatId: MessagePayload.chatId,
            user: socket.user._id,
            text: MessagePayload.content
          }
      })

      // SEQUENCE: 3 5 (parallel execution)
      const [memory, chatHistoryRow] = await Promise.all([
        // Task 3: Query pinecone for related memories
        queryMemory({
          queryVector: vector,
          limit: 1,
          metadata: {
            user: socket.user._id
          }
        }),
        // Task 5: Get chat history from DB
        messageModel.find({
          chatId: MessagePayload.chatId,
        }).sort({ createdAt: 1 }).limit(20).lean()
      ]);

      const chatHistory = chatHistoryRow.reverse();

      const stm = chatHistory.map(item => ({
        role: item.role,
        text: item.content
      }));

      const ltm = [{
        role: "system",
        text: `These are some previous message from the chat, to generate response 
        ${memory.map(item => item.metadata.text).join("\n")}`
      }];

      console.log("Long term memory:", ltm, "Short term memory:", stm);

      // SEQUENCE: 6 (sequential execution)
      // Task 6: Generate response from AI
      const aiResponse = await generateResponse([...ltm, ...stm]);

      // SEQUENCE: 10 (sequential execution)
      // Task 10: Send/emit AI response to user
      socket.emit("ai-response", {
        content: aiResponse,
        chat: MessagePayload.chatId,
      });

      console.log("Generated AI Response:", aiResponse);

      // SEQUENCE: 7 8 (parallel execution)
      const [responseMessage, responseVector] = await Promise.all([
        // Task 7: Save AI response in DB
        messageModel.create({
          chatId: MessagePayload.chatId,
          user: socket.user._id,
          content: aiResponse,
          role: "model",
        }),
        // Task 8: Generate vector from AI response
        generateVector(aiResponse)
      ]);

      // SEQUENCE: 9 (sequential execution)
      // Task 9: Save AI message in PineCone
      await createVectorMemory({
        vector: responseVector,
        messageId: responseMessage._id,
        metadata: {
          chatId: MessagePayload.chatId,
          user: socket.user._id,
          text: aiResponse
        }
      });
              
    });
  });
}

module.exports = initSocketServer;
