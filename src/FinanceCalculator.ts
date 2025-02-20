export type Transaction = {
  name: string;
  value: number;
  startDate: number;
  endDate: number;
};

export type TNetValues = {
  [dict_key: string]: number;
};

export type GraphData = {
  x: number;
  y: number;
};

export class FinanceCalculator {
  private incomes: Transaction[] = [];
  private expenses: Transaction[] = [];
  private dates: number[];

  constructor(numMonths: number) {
    this.dates = Array.from({ length: numMonths }, (_, i) => i + 1);
  }

  getNetValues(): TNetValues {
    return this.calculateNetValues();
  }

  // Add income
  addIncome(name: string, value: number, startDate: number, endDate: number): void {
    if (value <= 0) {
      throw new Error("Income value must be positive.");
    }
    if (endDate < startDate) {
      throw new Error("End date must be after the start date.");
    }
    this.incomes.push({ name, value, startDate, endDate });
  }

  // Add expense
  addExpense(name: string, value: number, startDate: number, endDate: number): void {
    if (value >= 0) {
      throw new Error("Expense value must be negative.");
    }
    if (endDate < startDate) {
      throw new Error("End date must be after the start date.");
    }
    this.expenses.push({ name, value, startDate, endDate });
  }

  // Calculate net values per month (PURE FUNCTION)
  calculateNetValues(): TNetValues {
    const netValues: TNetValues = this.dates.reduce<TNetValues>((acc, date) => {
      acc[date.toString()] = 0;
      return acc;
    }, {});

    const processTransaction = (transaction: Transaction) => {
      for (let current = transaction.startDate; current <= transaction.endDate; current++) {
        netValues[current.toString()] += transaction.value;
      }
    };

    this.incomes.forEach(processTransaction);
    this.expenses.forEach(processTransaction);

    return netValues;
  }

  // Compute cumulative values (PURE FUNCTION)
  computeCumulativeValues(netValues: TNetValues): TNetValues {
    const cumulativeValues: TNetValues = {};
    let runningTotal = 0;

    Object.keys(netValues)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((month) => {
        runningTotal += netValues[month];
        cumulativeValues[month] = runningTotal;
      });

    return cumulativeValues;
  }

  prepareNetValuesGraphData(): GraphData[] {
    const netValues = this.calculateNetValues();
    return Object.keys(netValues).map((key) => ({
      x: Number(key),
      y: netValues[key],
    }));
  }

  prepareCumulativeValuesGraphData(): GraphData[] {
    const netValues = this.calculateNetValues();
    const cumulativeValues = this.computeCumulativeValues(netValues);
    return Object.keys(cumulativeValues).map((key) => ({
      x: Number(key),
      y: cumulativeValues[key],
    }));
  }
}
