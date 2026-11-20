import { RuleTester } from "oxlint/plugins-dev";
import { test } from "vitest";
import { onlyNamedImportsExports } from "../custom-rules/only-named-imports-exports.ts";

const tester = new RuleTester();

test("only-named-imports-exports", () => {
  tester.run("only-named-imports-exports", onlyNamedImportsExports, {
    valid: [
      // Named import from our own file
      {
        code: `import { foo } from './foo'`,
      },
      // Named export
      {
        code: `export const foo = 1`,
      },
      // Named export list
      {
        code: `const foo = 1; export { foo }`,
      },
      // Side-effect import (nothing imported)
      {
        code: `import './styles.css'`,
      },
      // Default import from a package - packages are not ours to change
      {
        code: `import react from '@vitejs/plugin-react'`,
      },
      // Namespace import from a package
      {
        code: `import * as path from 'node:path'`,
      },
    ],

    invalid: [
      // Default import from our own file
      {
        code: `import Foo from './foo'`,
        errors: [{ message: "Use a named import instead of a default import" }],
      },
      // Namespace import from our own file
      {
        code: `import * as foo from '../foo'`,
        errors: [{ message: "Use named imports instead of import * as" }],
      },
      // Default export
      {
        code: `export default function foo() {}`,
        errors: [{ message: "Use a named export instead of export default" }],
      },
      // Export everything from our own file
      {
        code: `export * from './foo'`,
        errors: [{ message: "Use named exports instead of export *" }],
      },
      // Export everything under a name from our own file
      {
        code: `export * as foo from './foo'`,
        errors: [{ message: "Use named exports instead of export *" }],
      },
    ],
  });
});
