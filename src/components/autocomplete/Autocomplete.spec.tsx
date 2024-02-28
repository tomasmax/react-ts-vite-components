import { render, fireEvent } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

describe("Autocomplete", () => {
  const suggestions = ["apple", "banana", "cherry", "date", "elderberry"];
  const onSelect = jest.fn();

  it("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <Autocomplete
        suggestions={suggestions}
        onSelect={onSelect}
        placeholder="Type to search"
      />
    );
    expect(getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("shows suggestions based on input", () => {
    const { getByPlaceholderText, getAllByText } = render(
      <Autocomplete
        suggestions={suggestions}
        onSelect={onSelect}
        placeholder="Type to search"
      />
    );
    fireEvent.change(getByPlaceholderText("Type to search"), {
      target: { value: "a" },
    });
    expect(getAllByText("a")).toHaveLength(5);
    expect(getAllByText("b")).toHaveLength(1);
    expect(getAllByText("d")).toHaveLength(1);
  });

  it("calls onSelect when a suggestion is clicked", () => {
    const { getByPlaceholderText, getByText } = render(
      <Autocomplete
        suggestions={suggestions}
        onSelect={onSelect}
        placeholder="Type to search"
      />
    );
    fireEvent.change(getByPlaceholderText("Type to search"), {
      target: { value: "ba" },
    });
    fireEvent.click(getByText("b"));
    expect(onSelect).toHaveBeenCalledWith("banana");
  });

  it("does not show suggestions when input is empty", () => {
    const { getByPlaceholderText, queryByText } = render(
      <Autocomplete
        suggestions={suggestions}
        onSelect={onSelect}
        placeholder="Type to search"
      />
    );
    fireEvent.change(getByPlaceholderText("Type to search"), {
      target: { value: "" },
    });
    expect(queryByText("apple")).not.toBeInTheDocument();
  });
});
