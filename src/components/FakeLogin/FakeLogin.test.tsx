import App from "App";
import FakeLogin from "./FakeLogin";

import { screen } from "@testing-library/react";
import { render } from "../../test/test-utils";
import userEvent from "@testing-library/user-event";

import SETTING from "core/constants";
import { getToken, removeToken } from "core/helpers";

afterEach(() => removeToken());

it("Should show login component when user does not login", () => {
  render(<FakeLogin />);
  expect(screen.getByRole("alert")).toHaveTextContent(/not/i);
});

it("should save fake accesstoken in the localstorage when user click login button", async () => {
  render(<FakeLogin />);
  expect(screen.getByRole("alert")).toHaveTextContent(/not/i);
  await userEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(getToken()).toBe(SETTING.fakeAccessToken);
});

it("should unmount when user click login button", async () => {
  render(<App />);
  expect(screen.getByRole("alert")).toHaveTextContent(/not/i);
  await userEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
