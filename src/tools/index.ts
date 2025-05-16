import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getBalance } from './getBalance.js';
import { getBlock } from './getBlock.js';
import { getTransaction } from './transaction.js';

export const registerTools = (server: McpServer) => {
  getBalance(server);
  getBlock(server);
  getTransaction(server);
};
