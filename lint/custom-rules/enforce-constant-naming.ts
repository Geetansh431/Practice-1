import type { ESTree, Rule } from "@oxlint/plugins";

export const enforceConstantNaming: Rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Top-level constants with a plain value must be UPPER_SNAKE_CASE, e.g. MAX_AMOUNT",
    },
  },
  create(context) {
    function checkDeclaration(declaration: ESTree.VariableDeclaration) {
      if (declaration.kind !== "const") {
        return;
      }

      for (const declarator of declaration.declarations) {
        // Only plain values: text, numbers and true/false.
        const value = declarator.init;
        const isPlainValue =
          value?.type === "Literal" &&
          (typeof value.value === "string" ||
            typeof value.value === "number" ||
            typeof value.value === "boolean");

        if (declarator.id.type !== "Identifier" || !isPlainValue) {
          continue;
        }

        const name = declarator.id.name;
        if (name !== name.toUpperCase()) {
          context.report({
            node: declarator.id,
            message: `Constant ${name} should be UPPER_SNAKE_CASE`,
          });
        }
      }
    }

    return {
      Program(node) {
        // Only top-level constants: `const X = 1` and `export const X = 1`.
        for (const statement of node.body) {
          if (statement.type === "VariableDeclaration") {
            checkDeclaration(statement);
          }
          if (
            statement.type === "ExportNamedDeclaration" &&
            statement.declaration?.type === "VariableDeclaration"
          ) {
            checkDeclaration(statement.declaration);
          }
        }
      },
    };
  },
};
