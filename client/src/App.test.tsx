import { render, screen } from "@testing-library/react";
import App from "./App";

test("Check right render", () => {
  render(<App />);
  const app = screen.getByText(/Your tasks/i);
  expect(app).toBeInTheDocument();
});
