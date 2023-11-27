import { useState } from "react";

interface Transaction {
  id: number;
  amount: number;
  date: string;
  clientName: string;
  paymentMethod: string;
  transactionStatus: string;
}

export const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [filterAmount, setFilterAmount] = useState<number | undefined>(
    undefined
  );
  const [filterName, setFilterName] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [ascNameSorting, setAscNameSorting] = useState<boolean | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filterAmount === undefined || transaction.amount >= filterAmount) &&
      (filterName === undefined || transaction.clientName.includes(filterName))
    );
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortedTransactions =
    ascNameSorting !== null
      ? paginatedTransactions.sort((a, b) => {
          const aName = a.clientName.toUpperCase();
          const bName = b.clientName.toUpperCase();
          if (ascNameSorting) {
            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
          } else {
            if (aName < bName) return 1;
            if (aName > bName) return -1;
            return 0;
          }
        })
      : paginatedTransactions;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAmountChange = (newAmount: number) => {
    setFilterAmount(newAmount);
  };

  const handleNameChange = (newName: string) => {
    setFilterName(newName);
  };

  const handleNameSorting = () => {
    setAscNameSorting((prev) => !prev);
  };

  return (
    <div>
      <section>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by amount"
          value={filterAmount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
        />
      </section>

      <table>
        <thead>
          <th onClick={handleNameSorting}>Name</th>
          <th>Date</th>
          <th>Amount</th>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.clientName}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= filteredTransactions.length / itemsPerPage}
        >
          Next Page
        </button>
        <input
          type="number"
          placeholder="Filter by amount"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
