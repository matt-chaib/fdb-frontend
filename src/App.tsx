import { DataPoint } from './types/chartTypes';
import { ScatterChart } from './components/ScatterChart';
import './App.css'
import { FinanceCalculator } from './FinanceCalculator';

function App() {


  const numMonths: number = 160;

  const calc = new FinanceCalculator(numMonths);

  calc.addIncome("Salary", 100, 1, numMonths)
  calc.addExpense("Bills", -50, 5, 50)
  console.log(calc.calculateNetValues())

  return (
    <>
      <div>
        <ScatterChart width={400} height={300} data={calc.prepareCumulativeValuesGraphData()} />
      </div>
    </>
  )
}

export default App
