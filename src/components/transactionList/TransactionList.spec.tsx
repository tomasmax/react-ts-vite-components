import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList, { Transaction } from "./TransactionList";

const mockTransactions: Transaction[] = [
  {
    date: new Date("2022-01-01"),
    otherParty: "John Doe",
    amount: 100,
  },
  {
    date: new Date("2022-01-02"),
    otherParty: "Jane Smith",
    amount: 200,
  },
  {
    date: new Date("2022-01-03"),
    otherParty: "Alice Johnson",
    amount: 300,
  },
];

describe("TransactionList", () => {
  it("renders the list of transactions", () => {
    render(<TransactionList transactions={mockTransactions} pageSize={2} />);

    const transactionItems = screen.getAllByRole("listitem");
    expect(transactionItems).toHaveLength(2);

    const transactionDates = screen.getAllByText(/Date:/);
    expect(transactionDates).toHaveLength(2);

    const transactionParties = screen.getAllByText(/Other Party:/);
    expect(transactionParties).toHaveLength(3);

    const transactionAmounts = screen.getAllByText(/Amount:/);
    expect(transactionAmounts).toHaveLength(4);
  });

  it("filters transactions based on date range", () => {
    render(<TransactionList transactions={mockTransactions} pageSize={2} />);

    const dateFromInput = screen.getByLabelText("Date From:");
    const dateToInput = screen.getByLabelText("Date To:");

    fireEvent.change(dateFromInput, { target: { value: "2022-01-02" } });
    fireEvent.change(dateToInput, { target: { value: "2022-01-03" } });

    const transactionItems = screen.getAllByRole("listitem");
    expect(transactionItems).toHaveLength(1);

    const transactionDates = screen.getAllByText(/Date:/);
    expect(transactionDates).toHaveLength(1);

    const transactionParties = screen.getAllByText(/Other Party:/);
    expect(transactionParties).toHaveLength(2);

    const transactionAmounts = screen.getAllByText("Amount: 200");
    expect(transactionAmounts).toHaveLength(1);
  });

  // Add more test cases for other filter functionalities
});
