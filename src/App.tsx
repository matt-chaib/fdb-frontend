import { useState, useEffect } from "react";
import { FinanceCalculator } from "./FinanceCalculator";
import { ScatterChart } from "./components/ScatterChart";
import { TransactionList } from "./components/TransactionList";
import { Transaction } from "./types/chartTypes";
import { TransactionsChart } from "./components/TransactionsChart";
import "./App.css";

function App() {
  const numMonths = 12 * 100;
  const savingsContributionPercent = 0.2;
  const savingsInterestRate = 0.01;

  // Store incomes and expenses in React state
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  // Set default income and expense on first mount
  useEffect(() => {
    if (incomes.length === 0 && expenses.length === 0) {
      setIncomes([
        { name: "Salary", value: 2000, startDate: 1, endDate: numMonths, oneOff: false },
        {
          name: `Income ${incomes.length + 1}`,
          value: 1000,
          startDate: 30,
          endDate: 30,
          oneOff: true,
        }
      ]);
      setExpenses([
        { name: "Rent", value: -800, startDate: 1, endDate: numMonths, oneOff: false },
      ]);
    }
  }, []);

  // Compute all financial values in one pass
  const { netValues, cumulativeSavings, freeCash, totalAssets } =
    FinanceCalculator.computeFinancialValues(
      incomes,
      expenses,
      numMonths,
      savingsContributionPercent,
      savingsInterestRate
    );

  // Function to add an income
  const handleAddIncome = () => {
    const newIncome: Transaction = {
      name: `Income ${incomes.length + 1}`,
      value: 50,
      startDate: 1,
      endDate: numMonths,
      oneOff: false,
    };
    setIncomes([...incomes, newIncome]);
  };

  // Function to add an expense
  const handleAddExpense = () => {
    const newExpense: Transaction = {
      name: `Expense ${expenses.length + 1}`,
      value: -30,
      startDate: 1,
      endDate: numMonths,
      oneOff: false,
    };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div style={{ marginLeft: "3rem" }}>
      <h1>Financial Overview</h1>
      <div className="chart-top-row-container">
        <div className="transaction-list-container">
          <div>
            <div
              style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}
            >
              <button onClick={handleAddIncome}>Add Income</button>
              <button onClick={handleAddExpense}>Add Expense</button>
            </div>
            <TransactionList transactions={incomes} onUpdate={setIncomes} />
          </div>
          <TransactionList transactions={expenses} onUpdate={setExpenses} />
        </div>
        <div>
          {incomes.length > 0 && (
            <ScatterChart
              width={800}
              height={400}
              title="Total Assets"
              data={FinanceCalculator.transformChartValues(totalAssets)}
              incomes={incomes}
            />
          )}
          <div className="chart-row-horizontal">
            {incomes.length > 0 && (
              <ScatterChart
                width={400}
                height={300}
                title="Free Cash"
                data={FinanceCalculator.transformChartValues(freeCash)}
                incomes={incomes}
              />
            )}
            {incomes.length > 0 && (
              <ScatterChart
                width={400}
                height={300}
                title="Savings"
                data={FinanceCalculator.transformChartValues(cumulativeSavings)}
                incomes={incomes}
              />
            )}
          </div>
          <div className="chart-row-horizontal">
        {incomes.length > 0 && (
          <TransactionsChart
            width={400}
            height={300}
            title="Income"
            data={FinanceCalculator.transformChartValues(totalAssets)}
            incomes={incomes}
          />
        )}
         {expenses.length > 0 && (
          <TransactionsChart
            width={400}
            height={300}
            title="Expenses"
            data={FinanceCalculator.transformChartValues(totalAssets)}
            incomes={expenses}
          />
        )}
      </div>
        </div>
        
      </div>
     
    </div>
  );
}

export default App;
