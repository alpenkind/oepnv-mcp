import { fetch } from "undici";
import { DB_API_BASE, API_LIMITS } from "../tools/config/constants.js";
import type { Location } from "../types/index.js";

/**
 * Search for locations (only stations, stops) by name
 */
export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.trim().length < API_LIMITS.MIN_QUERY_LENGTH) {
    throw new Error(
      `Query must be at least ${API_LIMITS.MIN_QUERY_LENGTH} characters long`,
    );
  }

  const url = `${DB_API_BASE}/locations?query=${encodeURIComponent(query)}&results=${API_LIMITS.MAX_RESULTS}&poi=false&addresses=false`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `DB API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as Location[];
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search locations: ${error.message}`);
    }
    throw error;
  }
}
