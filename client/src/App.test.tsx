import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders header", () => {
    render(<App />);
    expect(screen.getByText(/My Project Frontend/i)).toBeInTheDocument();
  });
  it("renders the counter and increments when button is clicked", () => {
    render(<App />);

    // find elements
    const countText = screen.getByText(/Count:/i);
    const button = screen.getByRole("button", { name: /increment/i });

    // verify initial state
    expect(countText).toHaveTextContent("Count: 0");

    // simulate a click
    fireEvent.click(button);

    // verify state changed
    expect(countText).toHaveTextContent("Count: 1");

    // click again to ensure it increments multiple times
    fireEvent.click(button);
    expect(countText).toHaveTextContent("Count: 2");
  });
});
