import { array } from "zod/v3";
import type { Location, Departure, Arrival } from "../types/index.js";

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
 * Departure search results
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

/**
 * Arrival search results
 */

export function formatArrivals(arrivals: Arrival[]): string {
  if (arrivals.length === 0) {
    return "No arrivals found.";
  }

  return arrivals
    .map((arr, index) => {
      const time = new Date(arr.plannedWhen).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const delay = arr.delay ? ` (+${Math.floor(arr.delay / 60)}min)` : "";
      const platform = arr.platform ? ` | Gleis ${arr.platform}` : "";
      const from = arr.provenance ? ` von ${arr.provenance}` : "";

      return `${index + 1}. ${arr.line.name}${from} - ${time}${delay}${platform}`;
    })
    .join("\n");
}
