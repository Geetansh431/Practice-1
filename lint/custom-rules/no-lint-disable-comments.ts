import type { Rule } from "@oxlint/plugins";

export const noLintDisableComments: Rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow comments that disable lint rules; fix the code instead of silencing the linter",
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          const text = comment.value.trim();

          if (
            text.startsWith("eslint-disable") ||
            text.startsWith("oxlint-disable")
          ) {
            context.report({
              node: comment,
              message: "Do not disable lint rules",
            });
          }
        }
      },
    };
  },
};
