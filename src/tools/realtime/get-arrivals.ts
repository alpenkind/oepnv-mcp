import { z } from "zod";
import { getArrivals } from "../../services/db-api-services.js";
import { formatArrivals } from "../../utils/formatters.js";

export const getArrivalsTool = {
  name: "get_arrivals",
  description:
    "Get live arrivals for a station by ID from a station or stop (trains, buses, trams, U-Bahn, S-Bahn)",
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
      const results = await getArrivals(stationId, duration);
      return formatArrivals(results);
    } catch (error) {
      if (error instanceof Error) {
        return `Error getting arrivals: ${error.message}`;
      }
      return "Unknown error";
    }
  },
};
