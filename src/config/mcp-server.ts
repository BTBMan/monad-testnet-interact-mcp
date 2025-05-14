import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { MCP_SERVER_NAME, MCP_SERVER_VERSION } from '../shared/constants.js';

export const createMcpServer = () => {
  return new McpServer({
    name: MCP_SERVER_NAME,
    version: MCP_SERVER_VERSION,
  });
};

export const connectTransport = async (server: McpServer) => {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log(`[${MCP_SERVER_NAME}] is running...`);
};
