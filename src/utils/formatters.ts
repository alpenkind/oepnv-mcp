import type { Location } from "../types/index.js";

/**
 * Format station search results
 */
export function formatStations(locations: Location[]): string {
  if (locations.length === 0) {
    return "No stations found. Try a different search term.";
  }

  return locations
    .map(
      (loc, index) => `${index + 1}. ${loc.name} (${loc.type}) - ID: ${loc.id}`,
    )
    .join("\n");
}
