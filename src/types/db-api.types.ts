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
