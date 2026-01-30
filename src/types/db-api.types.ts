export interface Location {
  type: "location" | "stop" | "station";
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
  products?: {
    nationalExpress: boolean;
    national: boolean;
    regionalExpress: boolean;
    regional: boolean;
    suburban: boolean;
    subway: boolean;
    tram: boolean;
    bus: boolean;
    taxi: boolean;
    ferry: boolean;
  };
  station?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface Departure {
  tripId: string;
  stop: {
    type: string;
    id: string;
    name: string;
    location?: {
      type: string;
      id: string;
      latitude: number;
      longitude: number;
    };
    products?: {
      nationalExpress: boolean;
      national: boolean;
      regionalExpress: boolean;
      regional: boolean;
      suburban: boolean;
      subway: boolean;
      tram: boolean;
      bus: boolean;
      taxi: boolean;
      ferry: boolean;
    };
    station?: {
      id: string;
      name: string;
      type: string;
    };
  };
  when: string | null;
  plannedWhen: string;
  delay: number | null;
  platform: string | null;
  plannedPlatform: string | null;
  direction: string;
  provenance: string | null;
  line: {
    type: string;
    id: string;
    fahrtNr?: string;
    name: string;
    public: boolean;
    productName: string;
    mode: string;
    product: string;
    operator: string | null;
  };
  remarks?: Array<{
    type: string;
    code?: string;
    text: string;
  }>;
  origin: unknown | null;
  destination: unknown | null;
}

export interface Arrival {
  tripId: string;
  stop: {
    type: string;
    id: string;
    name: string;
    location?: {
      type: string;
      id: string;
      latitude: number;
      longitude: number;
    };
    products?: {
      nationalExpress: boolean;
      national: boolean;
      regionalExpress: boolean;
      regional: boolean;
      suburban: boolean;
      subway: boolean;
      tram: boolean;
      bus: boolean;
      taxi: boolean;
      ferry: boolean;
    };
    station?: {
      id: string;
      name: string;
      type: string;
    };
  };
  when: string | null;
  plannedWhen: string;
  delay: number | null;
  platform: string | null;
  plannedPlatform: string | null;
  direction: string | null;
  provenance: string | null;
  line: {
    type: string;
    id: string;
    fahrtNr?: string;
    name: string;
    public: boolean;
    productName: string;
    mode: string;
    product: string;
    operator: string | null;
  };
  remarks?: Array<{
    type: string;
    code?: string;
    text: string;
  }>;
  origin: unknown | null;
  destination: unknown | null;
}

export interface Journey {
  type: "journey";
  legs: JourneyLeg[];
  refreshToken?: string;
  remarks?: Array<{
    type: string;
    code?: string;
    text: string;
  }>;
  price?: {
    amount: number;
    currency: string;
  };
}

export interface JourneyLeg {
  origin: Station;
  destination: Station;
  departure: string;
  plannedDeparture: string;
  departureDelay: number | null;
  departurePlatform: string | null;
  plannedDeparturePlatform: string | null;
  arrival: string;
  plannedArrival: string;
  arrivalDelay: number | null;
  arrivalPlatform: string | null;
  plannedArrivalPlatform: string | null;
  tripId: string;
  line?: {
    type: string;
    id: string;
    fahrtNr?: string;
    name: string;
    public: boolean;
    adminCode?: string;
    productName: string;
    mode: string;
    product: string;
    operator?: {
      type: string;
      id: string;
      name: string;
    };
  };
  direction: string;
  stopovers?: Stopover[];
  remarks?: Array<{
    type: string;
    code?: string;
    text: string;
  }>;
  loadFactor?: string;
  distance?: number;
}

export interface Station {
  type: "station" | "stop" | "location";
  id: string;
  name: string;
  location?: {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
  };
  products?: {
    nationalExpress: boolean;
    national: boolean;
    regionalExpress: boolean;
    regional: boolean;
    suburban: boolean;
    subway: boolean;
    tram: boolean;
    bus: boolean;
    taxi: boolean;
    ferry: boolean;
  };
  station?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface Stopover {
  stop: Station;
  arrival: string | null;
  plannedArrival: string | null;
  arrivalDelay: number | null;
  arrivalPlatform: string | null;
  plannedArrivalPlatform: string | null;
  departure: string | null;
  plannedDeparture: string | null;
  departureDelay: number | null;
  departurePlatform: string | null;
  plannedDeparturePlatform: string | null;
  remarks?: Array<{
    type: string;
    code?: string;
    text: string;
  }>;
}

export interface JourneysResponse {
  earlierRef?: string;
  laterRef?: string;
  journeys: Journey[];
}
