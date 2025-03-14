import { pensionAnnualAvgInterest, pensionEmployerMatchPercent } from "./FinancialDefaults";
import { Transaction } from "./types/chartTypes";

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
    pension: TNetValues;
  } {
    const netValues: TNetValues = {};
    const cumulativeSavings: TNetValues = {};
    const freeCash: TNetValues = {};
    const totalAssets: TNetValues = {};
    const pension: TNetValues = {}; // Track pension contributions

    let runningSavings = 0;
    let runningFreeCash = 0;
    let runningPension = 0;

    for (let month = 1; month <= numMonths; month++) {
      // Calculate total income and deduct pension contributions
      let incomeSum = 0;
      let monthlyPensionContribution = 0;

      incomes
        .filter((t) => t.startDate <= month && t.endDate >= month)
        .forEach((t) => {
          if (t.type === "Salary" && t.pensionContributionPercent !== undefined) {
            const pensionAmount = t.value * (t.pensionContributionPercent);
            monthlyPensionContribution += pensionAmount;
            incomeSum += t.value - pensionAmount; // Deduct pension from salary
          } else {
            incomeSum += t.value;
          }
        });

      // Calculate total expenses
      const expenseSum = expenses
        .filter((t) => t.startDate <= month && t.endDate >= month)
        .reduce((acc, t) => acc + t.value, 0);

      // Net income after expenses
      const net = incomeSum + expenseSum;
      netValues[month] = net;

      // Update pension contributions
      runningPension += monthlyPensionContribution + (monthlyPensionContribution * (pensionEmployerMatchPercent/100));
      pension[month] = runningPension + (runningPension * pensionAnnualAvgInterest);

      // Calculate current month's savings
      let currentMonthSavings = 0;
      if (net > 0) {
        currentMonthSavings = net * savingsContributionPercent;
        runningSavings += currentMonthSavings;
      }

      // Apply savings interest (capped at 200)
      let savingsInterestAmount = Math.min(runningSavings * savingsInterestRate, 200);
      runningSavings += savingsInterestAmount;

      // Adjust free cash and handle negative balances
      if (net < 0 && Math.abs(net) > runningFreeCash) {
        let difference = Math.abs(net) - runningFreeCash;
        runningFreeCash = 0;
        if (runningSavings > Math.abs(difference)) {
          runningSavings -= difference;
        } else {
          runningSavings = 0
        }
      } else {
        runningFreeCash += net - currentMonthSavings;
      }

      // Total assets = savings + free cash + pension
      totalAssets[month] = runningSavings + runningFreeCash + runningPension;

      // Store results for the month
      cumulativeSavings[month] = runningSavings;
      freeCash[month] = runningFreeCash;
    }

    return { netValues, cumulativeSavings, freeCash, totalAssets, pension };
  }


  static transformChartValues(netValues: TNetValues): GraphData[] {
    return Object.keys(netValues).map((key) => {
      return { x: Number(key), y: netValues[key] };
    });
  }
}
