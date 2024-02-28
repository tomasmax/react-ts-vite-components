import { render, fireEvent } from "@testing-library/react";
import Accordion, { AccordionItem } from "./Accordion";

describe("Accordion", () => {
  const items: AccordionItem[] = [
    { title: "Item 1", content: "Content 1" },
    { title: "Item 2", content: "Content 2" },
    { title: "Item 3", content: "Content 3" },
  ];

  it("renders accordion items", () => {
    const { getByText } = render(<Accordion items={items} />);
    items.forEach((item) => {
      expect(getByText(item.title)).toBeInTheDocument();
    });
  });

  it("expands/collapses accordion item on click", () => {
    const { getByText, queryByText } = render(<Accordion items={items} />);
    const itemIndex = 1; // Index of the item to test

    fireEvent.click(getByText(items[itemIndex].title));
    expect(getByText(items[itemIndex].content)).toBeInTheDocument();

    fireEvent.click(getByText(items[itemIndex].title));
    expect(queryByText(items[itemIndex].content)).not.toBeInTheDocument();
  });

  it("only shows one expanded item at a time", () => {
    const { getByText, queryByText } = render(<Accordion items={items} />);
    const firstItemIndex = 0; // Index of the first item to test
    const secondItemIndex = 1; // Index of the second item to test

    fireEvent.click(getByText(items[firstItemIndex].title));
    expect(getByText(items[firstItemIndex].content)).toBeInTheDocument();

    fireEvent.click(getByText(items[secondItemIndex].title));
    expect(getByText(items[secondItemIndex].content)).toBeInTheDocument();
    expect(queryByText(items[firstItemIndex].content)).not.toBeInTheDocument();
  });
});
