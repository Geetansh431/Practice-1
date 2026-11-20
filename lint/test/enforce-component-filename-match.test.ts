import { RuleTester } from "oxlint/plugins-dev";
import { test } from "vitest";
import { enforceComponentFilenameMatch } from "../custom-rules/enforce-component-filename-match.ts";

const tester = new RuleTester();

test("enforce-component-filename-match", () => {
  tester.run("enforce-component-filename-match", enforceComponentFilenameMatch, {
    valid: [
      // Function component with the same name as the file
      {
        filename: "PayButton.tsx",
        code: `export function PayButton() { return null }`,
      },
      // Arrow function component with the same name as the file
      {
        filename: "PayButton.tsx",
        code: `export const PayButton = () => null`,
      },
      // Export list with the same name as the file
      {
        filename: "PayButton.tsx",
        code: `function PayButton() { return null } export { PayButton }`,
      },
      // Lowercase file is not a component file
      {
        filename: "main.tsx",
        code: `export const root = 1`,
      },
      // Test file is skipped
      {
        filename: "PayButton.test.tsx",
        code: `export const something = 1`,
      },
      // .ts file is not a component file
      {
        filename: "Utils.ts",
        code: `export const helper = 1`,
      },
    ],

    invalid: [
      // Component name does not match the file name
      {
        filename: "PayButton.tsx",
        code: `export function Button() { return null }`,
        errors: [{ message: "PayButton.tsx must export a component named PayButton" }],
      },
      // No exports at all
      {
        filename: "PayButton.tsx",
        code: `function PayButton() { return null }`,
        errors: [{ message: "PayButton.tsx must export a component named PayButton" }],
      },
    ],
  });
});
