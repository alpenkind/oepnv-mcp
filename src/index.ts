import { server } from "./server.js";

async function main() {
  // TODO: Change stdio to httpStream for  deployment
  const transportType = process.env.TRANSPORT_TYPE || "stdio";

  try {
    if (transportType === "http") {
      await server.start({
        transportType: "httpStream",
        httpStream: {
          port: parseInt(process.env.PORT || "3000"),
        },
      });
      console.error(
        `ÖPNV MCP Server running on port ${process.env.PORT || 3000}`,
      );
    } else {
      await server.start({
        transportType: "stdio",
      });
      console.error("ÖPNV MCP Server started (stdio mode)");
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
