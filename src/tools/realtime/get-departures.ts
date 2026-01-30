import { z } from "zod";
import { getDepartures } from "../../services/db-api-services.js";
import { formatDepartures } from "../../utils/formatters.js";

export const getDeparturesTool = {
  name: "get_departures",
  description:
    "Get live departures for a station by ID from a station or stop (trains, buses, trams, U-Bahn, S-Bahn)",
  parameters: z.object({
    stationId: z.string().describe("Station ID from search_station tool"),
    duration: z.number().min(1).max(120).default(90),
  }),
  execute: async ({
    stationId,
    duration,
  }: {
    stationId: string;
    duration?: number;
  }) => {
    try {
      const results = await getDepartures(stationId, duration);
      return formatDepartures(results);
    } catch (error) {
      if (error instanceof Error) {
        return `Error getting departures: ${error.message}`;
      }
      return "Unknown error";
    }
  },
};
