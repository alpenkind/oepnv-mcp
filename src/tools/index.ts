import type { FastMCP } from "fastmcp";
import { searchStationTool } from "./stations/search-stations.js";
import { getDeparturesTool } from "./realtime/get-departures.js";

export function registerTools(server: FastMCP) {
  server.addTool(searchStationTool);
  server.addTool(getDeparturesTool);
}
