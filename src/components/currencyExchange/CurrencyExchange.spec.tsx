import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CurrencyExchange from "./CurrencyExchange";

// Mock fetch function to return a fixed exchange rate
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ conversion_result: 2 }),
  })
) as any;

test("renders without crashing", () => {
  render(<CurrencyExchange />);
});

test("updates target amount when source amount changes", async () => {
  render(<CurrencyExchange />);
  fireEvent.change(screen.getByTestId("sourceAmount"), {
    target: { value: "1" },
  });
  await waitFor(() => screen.getByDisplayValue("2"));
});
