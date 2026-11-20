import { RuleTester } from "oxlint/plugins-dev";
import { test } from "vitest";
import { enforceConstantNaming } from "../custom-rules/enforce-constant-naming.ts";

const tester = new RuleTester();

test("enforce-constant-naming", () => {
  tester.run("enforce-constant-naming", enforceConstantNaming, {
    valid: [
      // UPPER_SNAKE_CASE number
      {
        code: `const MAX_AMOUNT = 500`,
      },
      // UPPER_SNAKE_CASE string, exported
      {
        code: `export const API_URL = "https://api.example.com"`,
      },
      // UPPER_SNAKE_CASE boolean
      {
        code: `const IS_ENABLED = true`,
      },
      // Functions are not checked
      {
        code: `const formatAmount = (value) => value`,
      },
      // Objects and arrays are not checked
      {
        code: `const paymentMethods = ["card", "upi"]`,
      },
      // Function calls are not checked
      {
        code: `const tester = createTester()`,
      },
      // let is not a constant
      {
        code: `let count = 0`,
      },
      // Constants inside functions are not checked
      {
        code: `function total() { const taxRate = 18; return taxRate }`,
      },
    ],

    invalid: [
      // camelCase number
      {
        code: `const maxAmount = 500`,
        errors: [{ message: "Constant maxAmount should be UPPER_SNAKE_CASE" }],
      },
      // camelCase string, exported
      {
        code: `export const apiUrl = "https://api.example.com"`,
        errors: [{ message: "Constant apiUrl should be UPPER_SNAKE_CASE" }],
      },
      // camelCase boolean
      {
        code: `const isEnabled = true`,
        errors: [{ message: "Constant isEnabled should be UPPER_SNAKE_CASE" }],
      },
    ],
  });
});
