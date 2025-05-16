import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { publicChain } from '../config/chain.js';
import { Address, formatEther, formatUnits } from 'viem';
import { MONAD_CURRENCY } from '../shared/constants.js';

// TODO getTokenBalance
export const getTokenBalance = (server: McpServer) => {
  server.tool(
    'getTokenBalance',
    'Get the transaction information on the Monad Testnet',
    {
      transactionHash: z.string(),
    },
    async ({ transactionHash }) => {
      const transaction = await publicChain.getTransaction({
        hash: transactionHash as Address,
      });

      const transactionInfo = {
        hash: transaction.hash,
        blockNumber: transaction.blockNumber
          ? Number(transaction.blockNumber)
          : null,
        from: transaction.from,
        to: transaction.to,
        value: transaction.value
          ? formatEther(transaction.value) + ' ' + MONAD_CURRENCY.symbol
          : '0 ' + MONAD_CURRENCY.symbol,
        gasPrice: transaction.gasPrice
          ? formatUnits(transaction.gasPrice, 9) + ' gwei'
          : 'N/A',
        maxFeePerGas: transaction.maxFeePerGas
          ? formatUnits(transaction.maxFeePerGas, 9) + ' gwei'
          : 'N/A',
        maxPriorityFeePerGas: transaction.maxPriorityFeePerGas
          ? formatUnits(transaction.maxPriorityFeePerGas, 9) + ' gwei'
          : 'N/A',
        gas: transaction.gas ? formatUnits(transaction.gas, 0) : 'N/A',
        nonce: transaction.nonce,
        status: transaction.blockNumber ? 'Confirmed' : 'Pending',
        type: transaction.type,
      };

      return {
        content: [
          {
            type: 'text',
            text: `The block info: ${JSON.stringify(transactionInfo)}`,
          },
        ],
      };
    },
  );
};
