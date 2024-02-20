import { UserData, UserDataResponse } from "@app/types/user";

const URL = "https://reqres.in/api/users";

async function getUserData(page: number) {
  let response;
  try {
    response = await fetch(`${URL}?page=${page}`);
  } catch (error) {
    throw new Error("Unable to fetch data");
  }

  return (await response.json()) as UserDataResponse;
}

export default async function getAllUserData(ids: Array<UserData["id"]>) {
  const numberOfPages = (await getUserData(1)).total_pages;

  const promises = [...Array(numberOfPages)].map((_, idx) =>
    getUserData(idx + 1)
  );
  const resolvedPromises = await Promise.allSettled(promises);

  const data = resolvedPromises.reduce((acc: UserData[], curr) => {
    if (curr.status === "fulfilled") {
      acc.push(...curr.value.data);
    }

    return acc;
  }, []);

  const processedData = data.map((userData) => {
    if (!ids.includes(userData.id)) {
      userData.email = "***";
    }

    return userData;
  });

  return processedData;
}
