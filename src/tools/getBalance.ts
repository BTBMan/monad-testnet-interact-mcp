import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { publicChain } from '../config/chain.js';
import { Address, formatEther } from 'viem';
import { MONAD_CURRENCY } from '../shared/constants.js';

export const getBalance = (server: McpServer) => {
  server.tool(
    'getBalance',
    'Get the balance of a given address on the Monad Testnet',
    {
      address: z.string(),
    },
    async ({ address }) => {
      const balance = await publicChain.getBalance({
        address: address as Address,
      });

      return {
        content: [
          {
            type: 'text',
            text: `The balance of ${address} is ${formatEther(balance)} ${
              MONAD_CURRENCY.symbol
            }`,
          },
        ],
      };
    },
  );
};
