// Define types for props
export type DataPoint = {
    x: number;
    y: number;
  };
  
export type ScatterChartProps = {
    width?: number;
    height?: number;
    data: DataPoint[];
  };