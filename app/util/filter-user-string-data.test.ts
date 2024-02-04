import filterUserStringData from "./filter-user-string-data";

const userDataMock = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
];

describe("filterUserStringData()", () => {
  test("multiple case sensitive rules with same property", () => {
    expect(
      filterUserStringData(
        [
          { property: "first_name", regex: "^G", regexFlag: "i" },
          { property: "first_name", regex: "^E", regexFlag: "i" },
        ],
        userDataMock
      )
    ).toStrictEqual([
      {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
      {
        id: 4,
        email: "eve.holt@reqres.in",
        first_name: "eve",
        last_name: "Holt",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
      },
    ]);
  });

  test("case insensitive rules with multiple properties", () => {
    expect(
      filterUserStringData(
        [
          { property: "first_name", regex: "^G" },
          { property: "last_name", regex: "^E" },
        ],
        userDataMock
      )
    ).toStrictEqual([
      {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
    ]);
  });

  test("empty rules", () => {
    expect(filterUserStringData([], userDataMock)).toStrictEqual([]);
  });
});
