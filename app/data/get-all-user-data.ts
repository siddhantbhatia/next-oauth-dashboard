import { UserData, UserDataAllResponse } from "@app/types/user";

const URL = "https://reqres.in/api/users";

async function getUserData(page: number) {
  let response;
  try {
    response = await fetch(`${URL}?page=${page}`);
  } catch (error) {
    throw new Error("Unable to fetch data");
  }

  return (await response.json()) as UserDataAllResponse;
}

export default async function getAllUserData() {
  const numberOfPages = (await getUserData(1)).total_pages;

  const promises = [...Array(numberOfPages)].map((_, idx) =>
    getUserData(idx + 1)
  );
  const resolvedPromises = await Promise.allSettled(promises);

  return resolvedPromises.reduce((acc: UserData[], curr) => {
    if (curr.status === "fulfilled") {
      const userDataArray = curr.value.data.map((userData) => ({
        ...userData,
        email: "***",
      }));
      
      acc.push(...userDataArray);
    }

    return acc;
  }, []);
}
