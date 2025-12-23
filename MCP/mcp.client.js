import { GoogleGenAI , Type } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';


const tools = [];

const scheduleMeetingFunctionDeclaration = {
  name: 'schedule_meeting',
  description: 'Schedules a meeting with specified attendees at a given time and date.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      attendees: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'List of people attending the meeting.',
      },
      date: {
        type: Type.STRING,
        description: 'Date of the meeting (e.g., "2024-07-29")',
      },
      time: {
        type: Type.STRING,
        description: 'Time of the meeting (e.g., "15:00")',
      },
      topic: {
        type: Type.STRING,
        description: 'The subject or topic of the meeting.',
      },
    },
    required: ['attendees', 'date', 'time', 'topic'],
  },
};

const ai = new GoogleGenAI({
    model : "gemini-2.0-flash",
    apiKey : process.env.GOOGLE_API_KEY || "",
})

const transport = new StdioClientTransport({
    command : "node",
    args: ["./mcp.server.js"],
});


const client = new Client({
    name: "demo-client",
    version: "1.0.0",
})

await client.connect(transport);


client.listTools().then(response=>{
    response.tools.forEach(tool=>{
        tools.push({
            name : tool.name,
            description : tool.description,
            parameters : {
                type: "OBJECT",
                properties : tool.inputSchema.properties,
                required : tool.inputSchema.required || []
            }
        });
    })

    console.log("registration Tools :", tools);
    
    
})