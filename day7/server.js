require('dotenv').config();
const http = require("http");
const app = require("./src/app");
const { WebSocketServer } = require("ws");
const generateResponse = require("./src/service/ai.service");

// Create normal HTTP server
const httpServer = http.createServer(app);

// Create WebSocket server on top of HTTP server
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
  console.log("WebSocket connected ✅");

  ws.on("message", async (message) => {
    try {
      // Expecting JSON messages
      const data = JSON.parse(message.toString());
      console.log("Received:", data);

      if (data.prompt) {
        const response = await generateResponse(data.prompt);
        console.log("AI response:", response);

        // Send back JSON
        ws.send(JSON.stringify({ response }));
      } else {
        ws.send(JSON.stringify({ error: "Missing 'prompt' field" }));
      }
    } catch (err) {
      console.error("Error:", err);
      ws.send(JSON.stringify({ error: "Invalid message format" }));
    }
  });

  ws.on("close", () => {
    console.log("WebSocket disconnected ❌");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
