
// Define types for props
export type DataPoint = {
    x: number;
    y: number;
  };
  
  export type Transaction = {
    name: string;
    value: number;
    startDate: number;
    endDate: number;
  };

export type ScatterChartProps = {
    width?: number;
    height?: number;
    data: DataPoint[];
    incomes: Transaction[];
    title: string;
  };