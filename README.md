# ÖPNV MCP Server

A Model Context Protocol (MCP) server for German public transport information using the Deutsche Bahn API.

## Features

- **Search stations and stops** - Find train stations, bus stops, tram stops across Germany
- **Live departures/arrivals** - Real-time information with delay tracking
- **Journey planning** - Find connections with transfers, platform info, and tight connection warnings
- **Smart warnings** - Highlights delays, cancellations, platform changes, and risky transfers

Supports all transport types: ICE, IC, RE, RB, S-Bahn, U-Bahn, Tram, Bus

## Installation

```bash
npm install
npm run build
```

## Usage

Add to your MCP client configuration. This server uses stdio transport.

Example configuration:

```json
{
  "mcpServers": {
    "oepnv": {
      "command": "node",
      "args": ["/absolute/path/to/oepnv-mcp/dist/index.js"]
    }
  }
}
```

Restart your MCP client to activate the server.

## Example Queries

- "Find trains from München Hbf to Berlin"
- "Show me departures from Alexanderplatz"
- "When does the next S-Bahn leave from Marienplatz?"
- "Plan a journey from Stuttgart to Hamburg tomorrow at 10:00"

## Available Tools

### `search_station`

Search for stations and stops by name.

**Parameters:**

- `query` (string): Station name (e.g., "München Hbf", "Berlin Alexanderplatz")

### `get_departures`

Get live departures from a station.

**Parameters:**

- `stationId` (string): Station ID from search results
- `duration` (number, optional): Time window in minutes (default: 90, max: 120)

### `get_arrivals`

Get live arrivals at a station.

**Parameters:**

- `stationId` (string): Station ID from search results
- `duration` (number, optional): Time window in minutes (default: 90, max: 120)

### `search_journeys`

Find journey connections between two stations.

**Parameters:**

- `originId` (string): Origin station ID
- `destinationId` (string): Destination station ID
- `departureTime` (string, optional): Departure time in `YYYY-MM-DDTHH:MM` format

## Development

```bash
# Run in development mode
npm run dev

# Build
npm run build

# Start production server
npm start
```

## API

This server uses the [Deutsche Bahn REST API](https://v6.db.transport.rest/) (v6.db.transport.rest).

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
