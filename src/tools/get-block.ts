import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { publicChain } from '../config/chain.js';
import { Address, formatUnits, GetBlockParameters } from 'viem';

// TODO: There a bug, when did not provide block number or hash, the block info is not displayed
export const getBlock = (server: McpServer) => {
  server.tool(
    'getBlock',
    'Get the block information on the Monad Testnet, If no block number or hash is provided, the latest block will be returned',
    {
      blockNumberOrHash: z.string().optional(),
    },
    async ({ blockNumberOrHash }) => {
      const blockParams: GetBlockParameters = {};
      if (!blockNumberOrHash) {
        blockParams.blockTag = 'latest';
      } else if (blockNumberOrHash?.startsWith('0x')) {
        blockParams.blockHash = blockNumberOrHash as Address;
      } else {
        blockParams.blockNumber = BigInt(blockNumberOrHash);
      }

      const block = await publicChain.getBlock(blockParams);
      const blockInfo = {
        hash: block.hash,
        number: Number(block.number),
        timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
        gasUsed: formatUnits(block.gasUsed, 0),
        gasLimit: formatUnits(block.gasLimit, 0),
        baseFeePerGas: block.baseFeePerGas
          ? formatUnits(block.baseFeePerGas, 9) + ' gwei'
          : 'N/A',
        transactionCount: block.transactions.length,
        parentHash: block.parentHash,
        miner: block.miner,
      };

      return {
        content: [
          {
            type: 'text',
            text: `The block info: ${JSON.stringify(blockInfo)}`,
          },
        ],
      };
    },
  );
};
