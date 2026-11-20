import { defineConfig } from "oxlint";
import { getBaseRules, getOverrides } from "./lint/rules.ts";

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "react", "jsx-a11y"],
  jsPlugins: [{ name: "custom", specifier: "./lint/rules.ts" }],
  rules: getBaseRules(),
  options: {
    typeAware: true,
    denyWarnings: true,
    respectEslintDisableDirectives: false,
  },
  overrides: getOverrides(),
});
