import { UserData, UserDataSingleResponse } from "@app/types/user";

const URL = "https://reqres.in/api/users";

export default async function getSingleUserData(id: UserData["id"]) {
  let response;
  try {
    response = await fetch(`${URL}?id=${id}`);
  } catch (error) {
    throw new Error("Unable to fetch data");
  }

  const responseJson = (await response.json()) as UserDataSingleResponse;

  return responseJson.data;
}
