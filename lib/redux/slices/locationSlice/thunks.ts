import { createAsyncThunk } from "@reduxjs/toolkit";

import getLocationDetail from "@app/data/get-location-detail";
import getLocationPrediction from "@app/data/get-location-prediction";

export const getPredictionAsync = createAsyncThunk(
  "location/getPrediction",
  async (input: string) => {
    try {
      const response = await getLocationPrediction(input);

      if (response.status === "OK") {
        return response.predictions.map((prediction) => ({
          place_id: prediction.place_id,
          description: prediction.description,
        }));
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }
);

export const getDetailAsync = createAsyncThunk(
  "location/getDetail",
  async (place_id: string) => {
    try {
      const response = await getLocationDetail(place_id);

      if (response.status === "OK") {
        return {
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
        };
      }
    } catch (e) {
      // handle error
    }
  }
);
