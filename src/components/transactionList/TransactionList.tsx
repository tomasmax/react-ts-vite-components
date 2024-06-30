import { useMemo, useState } from "react";

// Create a React component in TypeScript that displays a list of transactions for a given account. Each transaction should display the date, the other party, and the amount. The transactions should be sorted by date in descending order.

//Modify the TransactionList component to include a filter functionality. The user should be able to filter transactions based on a date range (from and to), the other party involved, and a minimum and maximum amount. The component should update the displayed transactions as the user changes the filter inputs.
export type Transaction = {
  date: Date;
  otherParty: string;
  amount: number;
};

type Props = {
  transactions: Transaction[];
  pageSize: number;
};

const TransactionList = ({ transactions, pageSize = 2 }: Props) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [otherParty, setOtherParty] = useState<string>("");
  const [minAmount, setMinAmount] = useState<number | null>(null);
  const [maxAmount, setMaxAmount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(transactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredTransactions = useMemo(
    () =>
      currentTransactions.filter((transaction) => {
        const { date, amount } = transaction;
        if (dateFrom && date < dateFrom) return false;
        if (dateTo && date > dateTo) return false;
        if (
          otherParty &&
          transaction.otherParty.toLocaleLowerCase() !==
            otherParty.toLocaleLowerCase()
        )
          return false;
        if (minAmount && amount < minAmount) return false;
        if (maxAmount && amount > maxAmount) return false;
        return true;
      }),
    [currentTransactions, dateFrom, dateTo, otherParty, minAmount, maxAmount]
  );

  const sortedTransactions = useMemo(
    () =>
      [...filteredTransactions].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      ),
    [filteredTransactions]
  );

  return (
    <div>
      <label>
        Date From:
        <input
          type="date"
          onChange={(e) => setDateFrom(new Date(e.target.value))}
        />
      </label>
      <label>
        Date To:
        <input
          type="date"
          onChange={(e) => setDateTo(new Date(e.target.value))}
        />
      </label>
      <label>
        Other Party:
        <input type="text" onChange={(e) => setOtherParty(e.target.value)} />
      </label>
      <label>
        Min Amount:
        <input
          type="number"
          onChange={(e) => setMinAmount(Number(e.target.value))}
        />
      </label>
      <label>
        Max Amount:
        <input
          type="number"
          onChange={(e) => setMaxAmount(Number(e.target.value))}
        />
      </label>
      <ul>
        {sortedTransactions.map((transaction, index) => (
          <li
            style={{ listStyleType: "none" }}
            key={`transaction-${index}`}
            aria-disabled={currentPage === 1}
          >
            {
              <>
                <p>Date: {transaction.date.toLocaleDateString()}</p>
                <p>Other Party: {transaction.otherParty}</p>
                <p>Amount: {transaction.amount}</p>
              </>
            }
          </li>
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === 1}
      >
        Next
      </button>
    </div>
  );
};

export default TransactionList;
