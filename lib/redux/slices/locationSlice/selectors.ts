import type { ReduxState } from "@lib/redux";

export const selectPrediction = (state: ReduxState) =>
  state.location.prediction;

export const selectPredictionStatus = (state: ReduxState) =>
  state.location.predictionLoading;

export const selectCoordinate = (state: ReduxState) =>
  state.location.coordinate;

export const selectCoordinateStatus = (state: ReduxState) =>
  state.location.coordinateLoading;
