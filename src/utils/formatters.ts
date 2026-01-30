import type { Location, Departure } from "../types/index.js";

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

/**
 * Format departure search results
 */

export function formatDepartures(departures: Departure[]): string {
  if (departures.length === 0) {
    return "No departures found.";
  }

  return departures
    .map((dep, index) => {
      const time = new Date(dep.plannedWhen).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const delay = dep.delay ? ` (+${Math.floor(dep.delay / 60)}min)` : "";
      const platform = dep.platform ? ` | Gleis ${dep.platform}` : "";

      return `${index + 1}. ${dep.line.name} → ${dep.direction} - ${time}${delay}${platform}`;
    })
    .join("\n");
}
