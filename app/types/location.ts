type LocationResponseStatus =
  | "OK"
  | "ZERO_RESULTS"
  | "INVALID_REQUEST"
  | "OVER_QUERY_LIMIT"
  | "UNKNOWN_ERROR";

export interface LocationPrediction {
  description: string;
  place_id: string;
}

export interface LocationPredictionResponse {
  predictions: LocationPrediction[];
  status: LocationResponseStatus;
}

/** Geocode API */

export interface LocationDetail {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface LocationDetailResponse {
  results: LocationDetail[];
  status: LocationResponseStatus;
}
