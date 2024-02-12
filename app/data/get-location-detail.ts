import { LocationDetailResponse } from "@app/types/location";

export default async function getLocationDetail(place_id: string) {
  let response;
  try {
    response = await fetch(`/api/location/detail?place_id=${place_id}`);
  } catch (error) {
    throw new Error("Unable to fetch data");
  }

  return (await response.json()) as LocationDetailResponse;
}
