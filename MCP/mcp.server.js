import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// const NWS_API_BASE = "https://api.weather.gov";
// const USER_AGENT = "weather-app/1.0";

// Create server instance
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});


// Register weather tools

server.registerTool(
  "addTwoNumbers",
  {
    description: "return the sum of two numbers",
    inputSchema: z.object({
        a: z.number().describe("the first number"),
        b: z.number().describe("the second number"),
    }),
  },
  async ({ a,b }) => {
    return {
      content: [{ type: "text", text: String(a + b)}],
    };
  },
);



const transport = new StdioServerTransport();
await server.connect(transport);            