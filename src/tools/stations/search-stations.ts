import { z } from "zod";

export const searchStationTool = {
  name: "search_station",
  description: "Search for train and bus stations in Germany by name",
  parameters: z.object({
    query: z
      .string()
      .describe('Station name to search for (e.g., "München Hbf", "Berlin")'),
  }),
  execute: async ({ query }: { query: string }) => {
    // TODO: Replace with API call
    const mockResults = [
      { name: "München Hauptbahnhof", id: "8000261", type: "station" },
      { name: "München Ost", id: "8000262", type: "station" },
    ];

    return JSON.stringify(mockResults, null, 2);
  },
};
