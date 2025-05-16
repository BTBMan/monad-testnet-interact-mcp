import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getBalance } from './get-balance.js';
import { getBlock } from './get-block.js';
import { getTransaction } from './get-transaction.js';

export const registerTools = (server: McpServer) => {
  getBalance(server);
  getBlock(server);
  getTransaction(server);
};
