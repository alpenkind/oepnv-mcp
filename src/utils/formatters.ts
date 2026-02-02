import type {
  Location,
  Departure,
  Arrival,
  Journey,
  Disruption,
} from "../types/index.js";

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
      const cancelled = dep.cancelled ? " ❌ CANCELLED" : "";
      const delay = dep.delay ? ` (+${Math.floor(dep.delay / 60)}min)` : "";
      const platform = dep.platform ? ` | Platform ${dep.platform}` : "";

      return `${index + 1}. ${dep.line.name} → ${dep.direction} - ${time}${delay}${platform}${cancelled}`;
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
      const cancelled = arr.cancelled ? " ❌ CANCELLED" : "";
      const delay = arr.delay ? ` (+${Math.floor(arr.delay / 60)}min)` : "";
      const platform = arr.platform ? ` | Platform ${arr.platform}` : "";
      const from = arr.provenance ? ` von ${arr.provenance}` : "";

      return `${index + 1}. ${arr.line.name}${from} - ${time}${delay}${platform}`;
    })
    .join("\n");
}

/**
 * Journey search results
 */

export function formatJourneys(journeys: Journey[]): string {
  if (journeys.length === 0) {
    return "No journeys found.";
  }

  return journeys
    .map((journey, index) => {
      const legs = journey.legs
        .map((leg, legIndex) => {
          const depTime = new Date(leg.plannedDeparture).toLocaleTimeString(
            "de-DE",
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          );
          const arrTime = new Date(leg.plannedArrival).toLocaleTimeString(
            "de-DE",
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          );

          // Walking leg
          if (!leg.line) {
            const walkDuration = Math.round(
              (new Date(leg.plannedArrival).getTime() -
                new Date(leg.plannedDeparture).getTime()) /
                60000,
            );
            if (walkDuration > 0) {
              return `   Walk ${leg.origin.name} → ${leg.destination.name} (${walkDuration} min)`;
            }
            return null;
          }

          const delay = leg.departureDelay
            ? ` (+${Math.floor(leg.departureDelay / 60)}min)`
            : "";
          const depPlatform = leg.departurePlatform
            ? ` Pl.${leg.departurePlatform}`
            : "";
          const arrPlatform = leg.arrivalPlatform
            ? ` Pl.${leg.arrivalPlatform}`
            : "";

          let result = `  ${leg.line.name} ${leg.origin.name}${depPlatform} → ${leg.destination.name}${arrPlatform} (${depTime} - ${arrTime})${delay}`;

          // Show next transfer info
          const nextTransportLeg = journey.legs
            .slice(legIndex + 1)
            .find((l) => l.line);

          if (nextTransportLeg) {
            const transferTime = Math.round(
              (new Date(nextTransportLeg.plannedDeparture).getTime() -
                new Date(leg.plannedArrival).getTime()) /
                60000,
            );

            // Check for walking leg between transports
            const walkingLeg = journey.legs
              .slice(legIndex + 1)
              .find((l) => !l.line && l.origin.id === leg.destination.id);

            let warning = "";
            if (walkingLeg) {
              const walkTime = Math.round(
                (new Date(walkingLeg.plannedArrival).getTime() -
                  new Date(walkingLeg.plannedDeparture).getTime()) /
                  60000,
              );

              if (walkTime >= transferTime - 2) {
                warning = " ⚠️ TIGHT!";
              }
            } else if (transferTime < 5) {
              warning = " ⚠️ TIGHT!";
            }

            const platformChange =
              leg.arrivalPlatform &&
              nextTransportLeg.departurePlatform &&
              leg.arrivalPlatform !== nextTransportLeg.departurePlatform
                ? ` | Change: Pl.${leg.arrivalPlatform} → Pl.${nextTransportLeg.departurePlatform}`
                : "";
            result += ` | Transfer: ${transferTime} min${platformChange}${warning}`;
          }

          return result;
        })
        .filter(Boolean)
        .join("\n");

      const actualLegs = journey.legs.filter((leg) => leg.line);
      const transfers =
        actualLegs.length === 1
          ? "Direct connection"
          : `${actualLegs.length - 1} ${actualLegs.length === 2 ? "transfer" : "transfers"}`;

      return `${index + 1}. ${transfers}:\n${legs}`;
    })
    .join("\n\n");
}

/**
 * Disruptions and warnings
 */
export function formatDisruptions(disruptions: Disruption[]): string {
  if (disruptions.length === 0) {
    return "✅ No disruptions or warnings found.";
  }

  const warnings = disruptions.filter((r) => r.type === "warning");
  const hints = disruptions.filter(
    (r) => r.type === "hint" || r.type === "status",
  );

  let result = "";

  if (warnings.length > 0) {
    result += " WARNINGS:\n";
    result += warnings.map((w, i) => `${i + 1}. ${w.text}`).join("\n");
  }

  if (hints.length > 0) {
    if (result) result += "\n\n";
    result += "INFORMATION:\n";
    result += hints.map((h, i) => `${i + 1}. ${h.text}`).join("\n");
  }

  return result;
}
