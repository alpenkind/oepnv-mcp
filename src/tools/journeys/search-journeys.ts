import { z } from "zod";
import { searchJourneys } from "../../services/db-api-services.js";
import { formatJourneys } from "../../utils/formatters.js";

export const searchJourneysTool = {
  name: "search_journeys",
  description:
    "Search for journeys between two stations. If the user doesn't specify a departure time, ask them when they want to travel (e.g., 'now', 'tomorrow at 10:00', 'next Monday 14:30').",
  parameters: z.object({
    originId: z.string().describe("Origin station ID from search_station tool"),
    destinationId: z
      .string()
      .describe("Destination station ID from search_station tool"),
    departureTime: z
      .string()
      .optional()
      .describe(
        "Departure time in YYYY-MM-DDTHH:MM format (e.g., '2025-01-20T14:30'). If not provided, defaults to now.",
      ),
  }),
  execute: async ({
    originId,
    destinationId,
    departureTime,
  }: {
    originId: string;
    destinationId: string;
    departureTime?: string;
  }) => {
    try {
      const results = await searchJourneys(
        originId,
        destinationId,
        departureTime,
      );
      return formatJourneys(results.journeys);
    } catch (error) {
      if (error instanceof Error) {
        return `Error searching journeys: ${error.message}`;
      }
      return "Unknown error";
    }
  },
};
