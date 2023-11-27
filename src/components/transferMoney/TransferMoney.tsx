import { useState } from "react";

export type Account = {
  id: string;
  balance: number;
};

type Props = {
  accounts: Account[];
};

const TransferMoney = ({ accounts }: Props) => {
  const [sourceAccount, setSourceAccount] = useState<Account | undefined>(
    undefined
  );
  const [targetAccount, setTargetAccount] = useState<Account | undefined>(
    undefined
  );
  const [amount, setAmount] = useState<number>(0);

  const handleTransfer = () => {
    if (sourceAccount?.id === "" || targetAccount?.id === "" || amount <= 0) {
      alert("Please select both accounts and enter a valid amount.");
      return;
    }

    const source = accounts.find((account) => account.id === sourceAccount?.id);
    const target = accounts.find((account) => account.id === targetAccount?.id);

    if (!source || !target) {
      alert("Account not found");
      return;
    }

    if (source.balance < amount) {
      alert("Insufficient funds");
      return;
    }

    source.balance -= amount;
    target.balance += amount;
    setSourceAccount(source);
    setTargetAccount(target);

    alert("Transfer succesfull");
  };

  return (
    <div>
      <select
        value={sourceAccount?.id}
        onChange={(e) =>
          setSourceAccount({
            id: e.target.value.split(",")[0],
            balance: e.target.value.split(",")[1],
          } as unknown as Account)
        }
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.id}, {account.balance}
          </option>
        ))}
      </select>
      <select
        value={targetAccount?.id}
        onChange={(e) =>
          setTargetAccount({
            id: e.target.value.split(",")[0],
            balance: e.target.value.split(",")[1],
          } as unknown as Account)
        }
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.id}, {account.balance}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransferMoney;
