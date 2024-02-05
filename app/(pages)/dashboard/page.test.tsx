import "@testing-library/jest-dom";
import React from "react";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DashboardHomePage from "./page";

jest.mock("../../data/get-user-data", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([
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
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
  ]),
}));

const user = userEvent.setup();

describe("Page - Dashboard", () => {
  let component: React.JSX.Element;

  beforeEach(async () => {
    component = await DashboardHomePage();
  });

  it("renders table data correctly", async () => {
    render(component);

    const rows = screen.getAllByRole("row");

    expect(rows.length).toBe(3); // header + two data rows

    expect(
      within(rows[2]).getByRole("cell", {
        name: /janet/i,
      })
    ).toBeInTheDocument();
  });

  it("renders masks email and unmask on user action", async () => {
    render(component);

    const userEmails = screen.getAllByTestId("user-email");

    expect(userEmails.length).toBe(2); // header + two data rows
    expect(userEmails[0]).toHaveTextContent("***");

    // toggle to unmask emails
    await user.click(screen.getByLabelText("Mask emails"));

    expect(userEmails[0]).toHaveTextContent("george.bluth@reqres.in");
  });
});
