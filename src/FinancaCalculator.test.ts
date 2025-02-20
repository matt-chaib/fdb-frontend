import { FinanceCalculator, TNetValues } from "./FinanceCalculator"; // Adjust path as needed

describe("FinanceCalculator", () => {
  let calculator: FinanceCalculator;

  beforeEach(() => {
    calculator = new FinanceCalculator(6); // Testing with 6 months
  });

  test("should initialize net values with all zeros", () => {
    const netValues = calculator.getNetValues();
    expect(Object.keys(netValues).length).toBe(6);
    Object.values(netValues).forEach((val) => expect(val).toBe(0));
  });

  test("should add income correctly", () => {
    calculator.addIncome("Salary", 1000, 1, 3);
    const netValues = calculator.getNetValues();
    expect(netValues["1"]).toBe(1000);
    expect(netValues["2"]).toBe(1000);
    expect(netValues["3"]).toBe(1000);
    expect(netValues["4"]).toBe(0);
  });

  test("should add expense correctly", () => {
    calculator.addExpense("Rent", -500, 1, 3);
    const netValues = calculator.getNetValues();
    expect(netValues["1"]).toBe(-500);
    expect(netValues["2"]).toBe(-500);
    expect(netValues["3"]).toBe(-500);
    expect(netValues["4"]).toBe(0);
  });

  test("should throw error for invalid income values", () => {
    expect(() => calculator.addIncome("Invalid", -100, 1, 3)).toThrow(
      "Income value must be positive."
    );
  });

  test("should throw error for invalid expense values", () => {
    expect(() => calculator.addExpense("Invalid", 100, 1, 3)).toThrow(
      "Expense value must be negative."
    );
  });

  test("should calculate net values correctly with mixed transactions", () => {
    calculator.addIncome("Salary", 1000, 1, 3);
    calculator.addExpense("Rent", -500, 2, 4);

    const netValues = calculator.getNetValues();
    expect(netValues["1"]).toBe(1000);
    expect(netValues["2"]).toBe(500);
    expect(netValues["3"]).toBe(500);
    expect(netValues["4"]).toBe(-500);
    expect(netValues["5"]).toBe(0);
  });

  test("should compute cumulative values correctly", () => {
    calculator.addIncome("Salary", 1000, 1, 3);
    calculator.addExpense("Rent", -500, 2, 4);

    const netValues = calculator.getNetValues();
    const cumulativeValues = calculator.computeCumulativeValues(netValues);

    expect(cumulativeValues["1"]).toBe(1000);
    expect(cumulativeValues["2"]).toBe(1500);
    expect(cumulativeValues["3"]).toBe(2000);
    expect(cumulativeValues["4"]).toBe(1500);
    expect(cumulativeValues["5"]).toBe(1500);
  });

  test("should prepare net values graph data correctly", () => {
    calculator.addIncome("Salary", 1000, 1, 3);
    calculator.addExpense("Rent", -500, 2, 4);

    const graphData = calculator.prepareNetValuesGraphData();
    expect(graphData.length).toBe(6);
    expect(graphData.find((d) => d.x === 1)?.y).toBe(1000);
    expect(graphData.find((d) => d.x === 2)?.y).toBe(500);
    expect(graphData.find((d) => d.x === 3)?.y).toBe(500);
    expect(graphData.find((d) => d.x === 4)?.y).toBe(-500);
  });

  test("should prepare cumulative values graph data correctly", () => {
    calculator.addIncome("Salary", 1000, 1, 3);
    calculator.addExpense("Rent", -500, 2, 4);

    const graphData = calculator.prepareCumulativeValuesGraphData();
    expect(graphData.length).toBe(6);
    expect(graphData.find((d) => d.x === 1)?.y).toBe(1000);
    expect(graphData.find((d) => d.x === 2)?.y).toBe(1500);
    expect(graphData.find((d) => d.x === 3)?.y).toBe(2000);
    expect(graphData.find((d) => d.x === 4)?.y).toBe(1500);
  });
});
