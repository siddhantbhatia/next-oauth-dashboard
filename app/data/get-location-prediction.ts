import { LocationPredictionResponse } from "@app/types/location";

export default async function getLocationPrediction(input: string) {
  let response;
  try {
    response = await fetch(
      `/api/location/autocomplete?input=${encodeURI(input)}`
    );
  } catch (error) {
    throw new Error("Unable to fetch data");
  }

  return (await response.json()) as LocationPredictionResponse;
}
