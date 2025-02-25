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
  static computeFinancialValues(
    incomes: Transaction[],
    expenses: Transaction[],
    numMonths: number,
    savingsContributionPercent: number,
    savingsInterestRate: number
  ): {
    netValues: TNetValues;
    cumulativeSavings: TNetValues;
    freeCash: TNetValues;
    totalAssets: TNetValues;
  } {
    const netValues: TNetValues = {};
    const cumulativeSavings: TNetValues = {};
    const freeCash: TNetValues = {};
    const totalAssets: TNetValues = {};

    let runningSavings = 0;
    let runningFreeCash = 0;

    for (let month = 1; month <= numMonths; month++) {
      // Calculate net income for the month
      const incomeSum = incomes
        .filter((t) => t.startDate <= month && t.endDate >= month)
        .reduce((acc, t) => acc + t.value, 0);

      const expenseSum = expenses
        .filter((t) => t.startDate <= month && t.endDate >= month)
        .reduce((acc, t) => acc + t.value, 0);

      const net = incomeSum + expenseSum;
      netValues[month] = net;

      // Calculate current month's savings
      let currentMonthSavings = 0;
      if (net > 0) {
        currentMonthSavings = net * savingsContributionPercent;

        // Update cumulative savings with interest
        runningSavings += currentMonthSavings;
      }

      let savingsInterestAmount = Math.min(runningSavings * savingsInterestRate, 1500)
      runningSavings += savingsInterestAmount;

      // Calculate free cash (net value after savings)
      if (net < 0 && Math.abs(net) > runningFreeCash) {
        let difference = Math.abs(net) - runningFreeCash
        runningFreeCash = 0
        runningSavings -= difference;
      } else {
        runningFreeCash += net - currentMonthSavings;
      }

      // Total assets = savings + free cash
      totalAssets[month] = runningSavings + runningFreeCash;

      // Store results for the month
      cumulativeSavings[month] = runningSavings;
      freeCash[month] = runningFreeCash;
    }

    return { netValues, cumulativeSavings, freeCash, totalAssets };
  }

  static transformChartValues(netValues: TNetValues): GraphData[] {
    return Object.keys(netValues).map((key) => {
      return { x: Number(key), y: netValues[key] };
    });
  }
}
