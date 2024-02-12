import { LocationDetail, LocationPrediction } from "@app/types/location";
import { createSlice } from "@reduxjs/toolkit";
import { getDetailAsync, getPredictionAsync } from "./thunks";

const initialState: LocationState = {
  prediction: [],
  coordinate: {
    lat: 3.1472732,
    lng: 101.6995352,
  },
  predictionLoading: false,
  coordinateLoading: false,
};

export const locationSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPredictionAsync.pending, (state) => {
        state.predictionLoading = true;
      })
      .addCase(getPredictionAsync.fulfilled, (state, action) => {
        state.predictionLoading = false;
        state.prediction = action.payload;
      })
      .addCase(getDetailAsync.pending, (state) => {
        state.coordinateLoading = true;
      })
      .addCase(getDetailAsync.fulfilled, (state, action) => {
        state.coordinateLoading = false;

        if (action.payload) {
          state.coordinate = action.payload;
        }
      });
  },
});

/* Types */

export interface LocationState {
  prediction: LocationPrediction[];
  coordinate: LocationDetail["geometry"]["location"];
  predictionLoading: boolean;
  coordinateLoading: boolean;
}
