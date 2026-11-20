import { RuleTester } from "oxlint/plugins-dev";
import { test } from "vitest";
import { noLintDisableComments } from "../custom-rules/no-lint-disable-comments.ts";

const tester = new RuleTester();

test("no-lint-disable-comments", () => {
  tester.run("no-lint-disable-comments", noLintDisableComments, {
    valid: [
      // Code without comments
      {
        code: `export const foo = 1`,
      },
      // A normal comment
      {
        code: `// Calculate the total amount\nexport const total = 1`,
      },
      // Mentioning the directive mid-sentence is not a directive
      {
        code: `// We never use eslint-disable comments here\nexport const foo = 1`,
      },
      // A TypeScript directive with a reason is not a lint directive
      {
        code: `// @ts-expect-error -- library types are wrong\nexport const foo = 1`,
      },
    ],

    invalid: [
      // eslint: next line
      {
        code: `// eslint-disable-next-line no-console\nconsole.log(1)`,
        errors: [{ message: "Do not disable lint rules" }],
      },
      // eslint: same line
      {
        code: `console.log(1) // eslint-disable-line no-console`,
        errors: [{ message: "Do not disable lint rules" }],
      },
      // eslint: whole file
      {
        code: `/* eslint-disable */\nexport const foo = 1`,
        errors: [{ message: "Do not disable lint rules" }],
      },
      // oxlint: next line
      {
        code: `// oxlint-disable-next-line no-console\nconsole.log(1)`,
        errors: [{ message: "Do not disable lint rules" }],
      },
      // oxlint: one rule for the whole file
      {
        code: `/* oxlint-disable no-empty */\nexport const foo = 1`,
        errors: [{ message: "Do not disable lint rules" }],
      },
    ],
  });
});
