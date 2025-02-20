import { Transaction } from "../FinanceCalculator";

type TransactionListProps = {
  transactions: Transaction[];
  onUpdate: (updatedTransactions: Transaction[]) => void;
};

export const TransactionList = ({ transactions, onUpdate }: TransactionListProps) => {
  // Handle input change for transactions
  const handleChange = (index: number, key: keyof Transaction, value: string | number) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = { ...updatedTransactions[index], [key]: value };
    onUpdate(updatedTransactions);
  };

  return (
    <div>
      {transactions.map((transaction, index) => (
        <div key={index}>
          <input
            type="text"
            value={transaction.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            value={transaction.value}
            onChange={(e) => handleChange(index, "value", Number(e.target.value))}
          />
          <input
            type="number"
            value={transaction.startDate}
            onChange={(e) => handleChange(index, "startDate", Number(e.target.value))}
          />
          <input
            type="number"
            value={transaction.endDate}
            onChange={(e) => handleChange(index, "endDate", Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};
