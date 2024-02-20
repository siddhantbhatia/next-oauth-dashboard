import getAllUserData from "./get-all-user-data";

const jestMock = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    page: 2,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
    ],
  }),
});

global.fetch = jestMock;

describe("filterUserStringData()", () => {
  test("multiple case sensitive rules with same property", async () => {
    const data = await getAllUserData();

    expect(jestMock).toHaveBeenCalledTimes(3); // first for page size followed by 2 for actual data fetch
    expect(jestMock).toHaveBeenLastCalledWith(
      "https://reqres.in/api/users?page=2"
    );

    expect(data).toStrictEqual([
      {
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
      {
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
    ]);
  });
});
