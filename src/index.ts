import { createMcpServer, connectTransport } from './config/mcp-server.js';
import { registerTools } from './tools/index.js';
async function main() {
  const server = createMcpServer();

  registerTools(server);

  await connectTransport(server);
}

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
