import type { OxlintConfig } from "oxlint";
import { ERROR, OFF } from "./constants/constants.ts";
import { noBarrelFiles } from "./custom-rules/no-barrel-files.ts";
import { noLintDisableComments } from "./custom-rules/no-lint-disable-comments.ts";
import { onlyNamedImportsExports } from "./custom-rules/only-named-imports-exports.ts";
import { enforceComponentFilenameMatch } from "./custom-rules/enforce-component-filename-match.ts";
import { enforceConstantNaming } from "./custom-rules/enforce-constant-naming.ts";

export function getBaseLintRules(): OxlintConfig["rules"] {
  return {
    "import/no-duplicates": ERROR,
    "typescript/no-explicit-any": ERROR,
    "typescript/ban-ts-comment": ERROR,
    "eslint/no-empty": ERROR,
    "react/rules-of-hooks": ERROR,
    "react/exhaustive-deps": ERROR,
    "react/jsx-key": ERROR,
    "react/no-danger": ERROR,
    "jsx-a11y/alt-text": ERROR,
    "jsx-a11y/label-has-associated-control": ERROR,
    "jsx-a11y/anchor-is-valid": ERROR,
    "typescript/no-floating-promises": ERROR,
    "typescript/no-misused-promises": ERROR,
  };
}

export function getCustomRules(): OxlintConfig["rules"] {
  return {
    "custom/no-barrel-files": ERROR,
    "custom/no-lint-disable-comments": ERROR,
    "custom/only-named-imports-exports": ERROR,
    "custom/enforce-component-filename-match": ERROR,
    "custom/enforce-constant-naming": ERROR,
  };
}

// Custom plugin: oxlint loads this file via `jsPlugins` and reads the default export
// to register these rules under the "custom/" prefix.
export default {
  rules: {
    "no-barrel-files": noBarrelFiles,
    "no-lint-disable-comments": noLintDisableComments,
    "only-named-imports-exports": onlyNamedImportsExports,
    "enforce-component-filename-match": enforceComponentFilenameMatch,
    "enforce-constant-naming": enforceConstantNaming,
  },
};

export function getOverrides(): OxlintConfig["overrides"] {
  return [
    {
      files: ["*.config.ts", "lint/rules.ts"],
      rules: {
        "custom/only-named-imports-exports": OFF,
      },
    },
  ];
}

export function getBaseRules() {
  return {
    ...getBaseLintRules(),
    ...getCustomRules(),
  };
}
