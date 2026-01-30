import type { FastMCP } from "fastmcp";
import { searchStationTool } from "./stations/search-stations.js";
import { getDeparturesTool } from "./realtime/get-departures.js";
import { getArrivalsTool } from "./realtime/get-arrivals.js";
import { searchJourneysTool } from "./journeys/search-journeys.js";

export function registerTools(server: FastMCP) {
  server.addTool(searchStationTool);
  server.addTool(getDeparturesTool);
  server.addTool(getArrivalsTool);
  server.addTool(searchJourneysTool);
}
