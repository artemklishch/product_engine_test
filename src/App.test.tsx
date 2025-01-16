import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Wrapper } from "./tests/test-wrapper";

test("renders App root component", () => {
  const component = render(<App />, { wrapper: Wrapper });
  expect(
    component.container.getElementsByClassName("app")[0]
  ).toBeInTheDocument();
});
