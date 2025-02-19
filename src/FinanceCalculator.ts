export type Transaction = {
    name: string;
    value: number; 
    startDate: number;
    endDate: number;
  };

  type TNetValues = {
    [dict_key: string]: number;
  };

  type GraphData = {
    x: number;
    y: number;
  }
  
  
  export class FinanceCalculator {
    private incomes: Transaction[] = [];
    private expenses: Transaction[] = [];
    private dates: number[];
    private netValues: TNetValues;

    constructor(numMonths: number) {
      this.dates = Array.from({ length: numMonths }, (_, i) => i + 1);
      this.netValues = this.dates.reduce<TNetValues>((acc, date) => {
        acc[date.toString()] = 0;
        return acc;
      }, {});
    }
  
    getNetValues(): TNetValues {
      return this.netValues;
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
  
    // Calculate net values per month
    calculateNetValues(): TNetValues {
  
      const processTransaction = (transaction: { value: number; startDate: number; endDate: number }) => {
        let current: number = transaction.startDate;
        while (current <= transaction.endDate) {
          let current_value: number | undefined = this.netValues[String(current)];
          if (!current_value) current_value = 0
          this.netValues[String(current)] = current_value + transaction.value
          current = current + 1
        }
      };
  
      // Process incomes and expenses separately
      this.incomes.forEach(processTransaction);
      this.expenses.forEach(processTransaction);
  
      return this.netValues;
    }

    computeCumulativeValues(netValues: TNetValues): TNetValues {
      const cumulativeValues: TNetValues = {};
      let runningTotal = 0;
    
      // Sort keys numerically to ensure correct order
      Object.keys(netValues)
        .sort((a, b) => Number(a) - Number(b))
        .forEach((month) => {
          runningTotal += netValues[month];
          cumulativeValues[month] = runningTotal;
        });
    
      return cumulativeValues;
    }
    

    prepareNetValuesGraphData(): GraphData[] {

      return Object.keys(this.netValues).map((key: string) => {return ({x: Number(key), y: this.netValues[key]})})

    }

    prepareCumulativeValuesGraphData(): GraphData[] {
      const cumulativeValues: TNetValues = this.computeCumulativeValues(this.getNetValues())
      return Object.keys(cumulativeValues).map((key: string) => {return ({x: Number(key), y: cumulativeValues[key]})})

    }
  }
  