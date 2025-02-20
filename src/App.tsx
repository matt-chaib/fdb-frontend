import { DataPoint } from './types/chartTypes';
import { ScatterChart } from './components/ScatterChart';
import './App.css'
import { FinanceCalculator } from './FinanceCalculator';
import { useState } from 'react';
import { Transaction } from './FinanceCalculator';
import { TransactionList } from './components/TransactionList';
function App() {
  const numMonths: number = 160;

  // Store FinanceCalculator in state
  const [calc] = useState(() => new FinanceCalculator(numMonths));
  const [update, setUpdate] = useState(0); // Force re-render

  // Initialize transactions only once
  if (update === 0) {
    calc.addIncome("Salary", 100, 1, numMonths);
    calc.addExpense("Bills", -50, 5, 50);
    setUpdate(1);
  }

  // Function to add a new income
  const handleAddIncome = () => {
    calc.addIncome(`Income ${calc.getIncomes().length + 1}`, 50, 1, numMonths);
    setUpdate((prev) => prev + 1); // Re-render UI
  };

  // Function to add a new expense
  const handleAddExpense = () => {
    calc.addExpense(`Expense ${calc.getExpenses().length + 1}`, -30, 1, numMonths);
    setUpdate((prev) => prev + 1); // Re-render UI
  };

  const handleIncomeUpdate = (updatedIncomes: Transaction[]) => {
    calc.setIncomes(updatedIncomes);
    setUpdate((prev) => prev + 1);
  };

  const handleExpenseUpdate = (updatedExpenses: Transaction[]) => {
    calc.setExpenses(updatedExpenses);
    setUpdate((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <ScatterChart width={400} height={300} data={calc.prepareCumulativeValuesGraphData()} />
      </div>
      <div>
        <h1>Income</h1>
        <button onClick={handleAddIncome}>Add Income</button>
        <TransactionList transactions={calc.getIncomes()} onUpdate={handleIncomeUpdate} />

        <h1>Expenses</h1>
        <button onClick={handleAddExpense}>Add Expense</button>
        <TransactionList transactions={calc.getExpenses()} onUpdate={handleExpenseUpdate} />
      </div>
    </>
  );
}



export default App
