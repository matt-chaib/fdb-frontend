import { Transaction } from "../types/chartTypes";

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
    <div style={styles.container}>
      {transactions.map((transaction, index) => (
        <div key={index} style={styles.transactionBox}>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Income Name"
            value={transaction.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            style={styles.nameInput}
          />

          {/* Transaction Type Dropdown */}
          <div style={styles.inputWrapper}>
            <label>Type</label>
            <select
              value={transaction.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              style={styles.select}
            >
              <option value="Salary">Salary</option>
              <option value="Loan">Loan</option>
              <option value="Expense">Expense</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Pension Contribution Slider (Only for Salary) */}
          {transaction.type === "Salary" && (
            <div style={styles.inputWrapper}>
              <label>Pension Contribution: {Math.round(transaction.pensionContributionPercent * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transaction.pensionContributionPercent ?? 7}
                onChange={(e) => handleChange(index, "pensionContributionPercent", Number(e.target.value))}
                style={styles.slider}
              />
            </div>
          )}

          {/* Inputs for Start Date, End Date, and Value */}
          <div style={styles.inputsContainer}>
            <div style={styles.inputWrapper}>
              <label>Start</label>
              <input
                type="number"
                value={transaction.startDate}
                onChange={(e) => handleChange(index, "startDate", Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <label>End</label>
              <input
                type="number"
                value={transaction.endDate}
                onChange={(e) => handleChange(index, "endDate", Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <label>Value</label>
              <input
                type="number"
                value={transaction.value}
                onChange={(e) => handleChange(index, "value", Number(e.target.value))}
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <label>One-off</label>
              <input
                type="checkbox"
                value={"false"}
                onChange={(e) => handleChange(index, "oneOff", Boolean(e.target.value))}
                style={styles.input}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 🔹 Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
  },
  transactionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    border: "2px solid #007BFF",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
  },
  nameInput: {
    fontSize: "16px",
    padding: "8px",
    marginBottom: "10px",
    width: "100%",
    textAlign: "center",
    border: "1px solid #007BFF",
    borderRadius: "5px",
  },
  inputsContainer: {
    display: "flex",
    gap: "10px",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    fontSize: "14px",
    padding: "5px",
    width: "70px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};
