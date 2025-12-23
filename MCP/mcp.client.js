import { config } from "dotenv";    
import { GoogleGenAI , Type } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
config();

const tools = [];

const ai = new GoogleGenAI({
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


client.listTools().then(async response=>{


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

    const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 'add 2 and 3',
        config: {
            tools: [{
                functionDeclarations: tools
            }],
        },
    });

    console.log("AI Response : ", aiResponse.functionCalls);

    aiResponse.functionCalls.forEach(async call =>{
        const toolResponse = await client.callTool({
            name : call.name,
            arguments : call.args
        })
        console.log("Tools Response : ", toolResponse);
        
    })
    
    
    
})