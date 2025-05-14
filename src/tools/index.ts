import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getBalance } from './getBalance.js';

export const registerTools = (server: McpServer) => {
  getBalance(server);
};
