import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Modal from "./components/modal/Modal";
import Autocomplete from "./components/autocomplete/Autocomplete.js";
import { TransactionTable } from "./components/transactionTable/TransactionTable";
import { transactions } from "./components/transactionTable/dataSource/transactions";
import Accordion, { AccordionItem } from "./components/accordion/Accordion";
import CurrencyExchange from "./components/currencyExchange/CurrencyExchange";
import TransferMoney, {
  Account,
} from "./components/transferMoney/TransferMoney.js";
import TransactionList from "./components/transactionList/TransactionList.js";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const suggestions = ["Apple", "Banana", "Orange"];
  const accordionItems: AccordionItem[] = [
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: "Content for section 2" },
    { title: "Section 3", content: "Content for section 3" },
  ];

  const mockAccounts: Account[] = [
    {
      id: "1",
      balance: 1000,
    },
    {
      id: "2",
      balance: 2000,
    },
    {
      id: "3",
      balance: 3000,
    },
  ];

  const mockTransactionlist = [
    {
      date: new Date("2022-01-01"),
      otherParty: "John Doe",
      amount: 100,
    },
    {
      date: new Date("2022-02-01"),
      otherParty: "Jane Doe",
      amount: 200,
    },
    {
      date: new Date("2022-03-01"),
      otherParty: "John Smith",
      amount: 300,
    },
  ];

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React app</h1>
      <div className="components-container">
        <h2>Modal</h2>
        <button onClick={openModal}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Modal title</h2>
          <p>Modal content</p>
        </Modal>

        <h2>Autocomplete</h2>
        <Autocomplete
          suggestions={suggestions}
          placeholder="Type to search"
          onSelect={() => {}}
        />

        <h2>Transaction Table</h2>
        <TransactionTable transactions={transactions} />

        <h2>Accordion</h2>
        <Accordion items={accordionItems} />

        <h2>Currency Exchange</h2>
        <CurrencyExchange />

        <h2>Transfer Money</h2>
        <TransferMoney accounts={mockAccounts} />

        <h2> Transaction list </h2>
        <TransactionList transactions={mockTransactionlist} pageSize={2} />
      </div>
    </>
  );
}

export default App;
