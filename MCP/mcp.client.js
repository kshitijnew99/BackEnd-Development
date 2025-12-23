import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const transport = new StdioClientTransport({
    command : "node",
    args: ["./mcp.server.js"],
});


const client = new Client({
    name: "demo-client",
    version: "1.0.0",
})

await client.connect(transport);