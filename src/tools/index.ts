import type { FastMCP } from "fastmcp";
import { searchStationTool } from "./stations/search-stations";

export function registerTools(server: FastMCP) {
  server.addTool(searchStationTool);
}
