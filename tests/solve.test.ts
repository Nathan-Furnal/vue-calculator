import { expect, test } from "vitest";
import { Op, solveOperations, toOperations } from "../src/parser/parser";

test("Conversion from string array to operations", () => {
  const expected: Op = { leftOperand: 1, rightOperand: 2, operator: "+" };

  expect(toOperations(["1", "+", "2"])).toStrictEqual(expected);
});

test("Double operations", () => {
  const expected: Op = {
    leftOperand: 1,
    rightOperand: 2,
    operator: "+",
    next: { leftOperand: 2, rightOperand: 4, operator: "-" },
  };

  expect(toOperations(["1", "+", "2", "-", "4"])).toStrictEqual(expected);
});

test("Triple operations", () => {
  const expected: Op = {
    leftOperand: 1,
    rightOperand: 2,
    operator: "+",
    next: {
      leftOperand: 2,
      rightOperand: 4,
      operator: "-",
      next: { leftOperand: 4, rightOperand: 2, operator: "x" },
    },
  };

  expect(toOperations(["1", "+", "2", "-", "4", "x", "2"])).toStrictEqual(
    expected,
  );
});

test("More operations", () => {
  const expected: Op = {
    leftOperand: -1.2,
    rightOperand: -4,
    operator: "÷",
    next: {
      leftOperand: -4,
      rightOperand: 5,
      operator: "-",
      next: {
        leftOperand: 5,
        rightOperand: 2,
        operator: "x",
        next: { leftOperand: 2, rightOperand: -7, operator: "+" },
      },
    },
  };
  expect(toOperations(["-1.2", "÷", "-4", "-", "5", "x", "2", "+", "-7"]))
    .toStrictEqual(expected);
});

test("Solve simple operation", () => {
  const expected = 2;
  const op: Op = { leftOperand: 1, rightOperand: 1, operator: "+" };
  expect(solveOperations(op)).toBe(expected);
});

test("Solve operations with multiple symbols", () => {
  const expected = 5;
  const ops: Op = {
    leftOperand: 1,
    rightOperand: 1,
    operator: "+",
    next: { leftOperand: 1, rightOperand: 3, operator: "+" },
  };
  expect(solveOperations(ops)).toBe(expected);
});

test("Operation order is respected", () => {
  const expected = 2;
  const ops: Op = {
    leftOperand: 1,
    rightOperand: 2,
    operator: "+",
    next: { leftOperand: 2, rightOperand: 3, operator: "x",
      next: {leftOperand: 3, rightOperand: 5, operator: "-"}
    },
  };
  expect(solveOperations(ops)).toBe(expected);
});

test("String to operation solving", () => {
  const formula  = ["1", "+", "2", "x", "4", "-", "7"];
  const expected = 1 + 2 * 4 - 7
  expect(solveOperations(toOperations(formula))).toBe(expected)
})

test("All operations are covered", () => {
  const formula  = ["0.1", "+", "0.2", "÷", "4", "*", "3"];
  const expected = 0.1 + 0.2 / 4 * 3
  expect(solveOperations(toOperations(formula))).closeTo(expected, 5)  
})