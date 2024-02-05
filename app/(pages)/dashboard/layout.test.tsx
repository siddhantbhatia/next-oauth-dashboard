import "@testing-library/jest-dom";
import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DashboardLayout from "./layout";
import { StoreProvider } from "@lib/redux/providers";

import * as nextAuthHandlers from "next-auth/react";

const signOutSpy = jest
  .spyOn(nextAuthHandlers, "signOut")
  .mockResolvedValue(undefined);

const user = userEvent.setup();

describe("Layout - Dashboard", () => {
  let component: React.JSX.Element;

  beforeEach(async () => {
    component = await DashboardLayout({});
    jest.clearAllMocks();
  });

  test("undefined session", async () => {
    render(<StoreProvider session={null}>{component}</StoreProvider>);

    expect(screen.queryByRole("img", { name: "user-avatar" })).toBeNull();
  });

  test("defined session", async () => {
    const imgSrc = "img";
    render(
      <StoreProvider
        session={{
          user: {
            image: imgSrc,
          },
          expires: "expiry",
        }}
      >
        {component}
      </StoreProvider>
    );

    const avatarMenu = screen.getByRole("img", { name: "user-avatar" });
    expect(avatarMenu).toHaveAttribute("src", imgSrc);

    await user.click(avatarMenu);
    expect(await screen.findByRole("menu")).toBeInTheDocument();

    await user.click(
      screen.getByRole("menuitem", {
        name: /logout/i,
      })
    );

    expect(signOutSpy).toHaveBeenCalledTimes(1);
  });
});
