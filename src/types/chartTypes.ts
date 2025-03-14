
// Define types for props
export type DataPoint = {
    x: number;
    y: number;
  };
  
export type TransactionType = "Salary" | "Loan" | "Expense" | "Other";

export type Transaction = | {
  name: string;
  type: "Salary";
  value: number;
  startDate: number;
  endDate: number;
  oneOff: boolean;
  pensionContributionPercent: number; // Required for Salary
}
| {
  name: string;
  type: "Loan" | "Expense" | "Other";
  value: number;
  startDate: number;
  endDate: number;
  oneOff: boolean;
  pensionContributionPercent?: never; // Disallowed for other types
};

export type ScatterChartProps = {
    width?: number;
    height?: number;
    data: DataPoint[];
    incomes: Transaction[];
    title: string;
  };