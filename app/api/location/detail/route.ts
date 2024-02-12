import { type NextRequest } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("place_id") ?? "";

  const res = await fetch(
    baseUrl +
      new URLSearchParams({
        key: apiKey,
        place_id: query,
      })
  );

  const data = await res.json();

  return Response.json(data);
}
