import { render } from "@testing-library/react";
import { TransactionTable } from "./TransactionTable";

const transactions = [
  {
    id: 1,
    amount: 100,
    date: "2022-01-01",
    clientName: "John Doe",
    paymentMethod: "Credit Card",
    transactionStatus: "Completed",
  },
  {
    id: 2,
    amount: 200,
    date: "2022-01-02",
    clientName: "Erick Brown",
    paymentMethod: "Credit Card",
    transactionStatus: "Completed",
  },
];

describe("TransactionTable", () => {
  it("displays the transactions", () => {
    const { getByText } = render(
      <TransactionTable transactions={transactions} />
    );

    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("2022-01-01")).toBeInTheDocument();
    expect(getByText("200")).toBeInTheDocument();
    expect(getByText("2022-01-02")).toBeInTheDocument();
  });
});
