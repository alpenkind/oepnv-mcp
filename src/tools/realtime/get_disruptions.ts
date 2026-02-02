import { z } from "zod";
import { getDisruptions } from "../../services/db-api-services.js";
import { formatDisruptions } from "../../utils/formatters.js";

export const getDisruptionsTool = {
  name: "get_disruptions",
  description:
    "Get current disruptions, warnings, and service information for a station (delays, cancellations, construction work, etc.)",
  parameters: z.object({
    stationId: z.string().describe("Station ID from search_station tool"),
  }),
  execute: async ({ stationId }: { stationId: string }) => {
    try {
      const results = await getDisruptions(stationId);
      return formatDisruptions(results);
    } catch (error) {
      if (error instanceof Error) {
        return `Error getting disruptions: ${error.message}`;
      }
      return "Unknown error";
    }
  },
};
