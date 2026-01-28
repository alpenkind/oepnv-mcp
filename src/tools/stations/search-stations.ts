import { z } from "zod";
import { searchLocations } from "../../services/db-api-services.js";
import { formatStations } from "../../utils/formatters.js";

export const searchStationTool = {
  name: "search_station",
  description: "Search for train and bus stations in Germany by name",
  parameters: z.object({
    query: z
      .string()
      .describe('Station name to search for (e.g., "München Hbf", "Berlin")'),
  }),
  execute: async ({ query }: { query: string }) => {
    try {
      const results = await searchLocations(query);
      return formatStations(results);
    } catch (error) {
      if (error instanceof Error) {
        return `Error searching stations: ${error.message}`;
      }
      return "Unknown error";
    }
  },
};
