import { type NextRequest } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const baseUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("input") ?? "";

  const res = await fetch(
    baseUrl +
      new URLSearchParams({
        key: apiKey,
        input: query,
        components: "country:my|country:sg|country:th|country:id|country:ph",
      })
  );

  const data = await res.json();

  return Response.json(data);
}
