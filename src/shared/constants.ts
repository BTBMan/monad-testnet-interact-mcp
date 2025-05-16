import { monadTestnet } from 'viem/chains';
import { version, name } from '../../package.json';

export const MCP_SERVER_NAME = name;
export const MCP_SERVER_VERSION = version;

export const MONAD_CURRENCY = monadTestnet.nativeCurrency;
