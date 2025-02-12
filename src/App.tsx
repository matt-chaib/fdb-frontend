import { DataPoint } from './types/chartTypes';
import { ScatterChart } from './components/ScatterChart';
import './App.css'

function App() {

  const data: DataPoint[] = [
    { x: 16, y: 30 },
    { x: 32, y: 60 },
    { x: 64, y: 90 },
    { x: 120, y: 150 },
    { x: 160, y: 100 },
  ];

  return (
    <>
      <div>
        <ScatterChart width={400} height={300} data={data} />
      </div>
    </>
  )
}

export default App
