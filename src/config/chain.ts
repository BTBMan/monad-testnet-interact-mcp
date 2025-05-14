import { createPublicClient, http } from 'viem';
import { monadTestnet } from 'viem/chains';

export const publicChain = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

// There is no plan to use a wallet client in this MCP.
