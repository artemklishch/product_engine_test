import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignIn from ".";
import { Wrapper } from "../../../tests/test-wrapper";
import { TEST_USER_DATA } from "../../../tests/constants";
import { fetchUser } from "../../../api/users";
import { act } from "react";

jest.mock("../../../api/users.ts", () => ({
  fetchUser: jest.fn(() => Promise.resolve(TEST_USER_DATA)),
}));

describe("Sign In page", () => {
  beforeEach(() => {
    render(<SignIn />, { wrapper: Wrapper });
  });

  test("Submit button should be disabled, when fields aren't filled", () => {
    expect(screen.getByTestId("sign-in-button-testid")).toBeDisabled();
  });

  test("Test fields with valid values", () => {
    const username = "admin";
    const password = "admin123";

    const usernameField: HTMLInputElement = screen.getByTestId(
      "signin-username-testid"
    );
    const passwordField: HTMLInputElement = screen.getByTestId(
      "signin-password-testid"
    );
    fireEvent.change(usernameField, {
      target: { value: username },
    });
    fireEvent.change(passwordField, {
      target: { value: password },
    });
    expect(usernameField.value).toBe(username);
    expect(passwordField.value).toBe(password);
    expect(screen.getByTestId("sign-in-button-testid")).toBeEnabled();
  });

  test("Test fields with invalid values", () => {
    const username = "ad";
    const password = "ad";

    fireEvent.change(screen.getByTestId("signin-username-testid"), {
      target: { value: username },
    });
    fireEvent.change(screen.getByTestId("signin-password-testid"), {
      target: { value: password },
    });

    expect(
      screen.getAllByTestId("input-field-error-message-testid").length
    ).toBe(2);
  });

  test("Check the submit handler query function invoked", async () => {
    const username = "admin";
    const password = "admin123";

    fireEvent.change(screen.getByTestId("signin-username-testid"), {
      target: { value: username },
    });
    fireEvent.change(screen.getByTestId("signin-password-testid"), {
      target: { value: password },
    });
    await userEvent.click(screen.getByTestId("sign-in-button-testid"));

    expect(fetchUser).toHaveBeenCalled();
  });
});
