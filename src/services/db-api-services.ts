import { fetch } from "undici";
import { DB_API_BASE, API_LIMITS } from "../tools/config/constants.js";
import type {
  Location,
  Departure,
  Arrival,
  JourneysResponse,
  Journey,
  Disruption,
} from "../types/index.js";

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

/**
 * Search for departures at a station
 */

export async function getDepartures(
  stationId: string,
  duration: number = 60,
): Promise<Departure[]> {
  const url = `${DB_API_BASE}/stops/${encodeURIComponent(stationId)}/departures?duration=${duration}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `DB API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as { departures?: Departure[] };

    const departures = data.departures || [];

    return Array.isArray(departures) ? departures : [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get departures: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Search for arrivals at a station
 */

export async function getArrivals(
  stationId: string,
  duration: number = 60,
): Promise<Arrival[]> {
  const url = `${DB_API_BASE}/stops/${encodeURIComponent(stationId)}/arrivals?duration=${duration}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `DB API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as { arrivals?: Arrival[] };

    const arrivals = data.arrivals || [];

    return Array.isArray(arrivals) ? arrivals : [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get arrivals: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Search for journeys between two stations
 */

export async function searchJourneys(
  originId: string,
  destinationId: string,
  departureTime?: string,
  results: number = 5,
): Promise<JourneysResponse> {
  const departure = departureTime || new Date().toISOString().slice(0, 16);
  const url = `${DB_API_BASE}/journeys?from=${encodeURIComponent(originId)}&to=${encodeURIComponent(destinationId)}&departure=${encodeURIComponent(departure)}&results=${results}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `DB API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as JourneysResponse;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search journeys: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get disruptions and warnings for a station
 */
export async function getDisruptions(stationId: string): Promise<Disruption[]> {
  const url = `${DB_API_BASE}/stops/${encodeURIComponent(stationId)}/departures?duration=120`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `DB API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as {
      departures?: Departure[];
      remarks?: Disruption[];
    };

    const disruptionsSet = new Map<string, Disruption>();

    // Station
    if (data.remarks) {
      data.remarks.forEach((d) => disruptionsSet.set(d.text, d));
    }

    // Departure
    if (data.departures) {
      data.departures.forEach((dep) => {
        if (dep.remarks) {
          dep.remarks.forEach((d) => disruptionsSet.set(d.text, d));
        }
      });
    }

    return Array.from(disruptionsSet.values());
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get disruptions: ${error.message}`);
    }
    throw error;
  }
}
