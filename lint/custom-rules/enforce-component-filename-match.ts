import { basename } from "node:path";
import type { Rule } from "@oxlint/plugins";

export const enforceComponentFilenameMatch: Rule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "A component file must export a component with the same name, e.g. PayButton.tsx exports PayButton",
    },
  },
  create(context) {
    const fileName = basename(context.filename);

    // Only .tsx files are component files.
    if (!fileName.endsWith(".tsx")) {
      return {};
    }

    const componentName = fileName.replace(".tsx", "");

    // Skip lowercase files (main.tsx) and files with extra parts (PayButton.test.tsx).
    const startsWithCapital = componentName[0] === componentName[0]?.toUpperCase();
    if (!startsWithCapital || componentName.includes(".")) {
      return {};
    }

    const exportedNames: string[] = [];

    return {
      ExportNamedDeclaration(node) {
        const { declaration } = node;

        // export function PayButton() {}
        if (declaration?.type === "FunctionDeclaration" && declaration.id) {
          exportedNames.push(declaration.id.name);
        }

        // export const PayButton = () => {}
        if (declaration?.type === "VariableDeclaration") {
          for (const declarator of declaration.declarations) {
            if (declarator.id.type === "Identifier") {
              exportedNames.push(declarator.id.name);
            }
          }
        }

        // export { PayButton }
        for (const spec of node.specifiers) {
          if (spec.exported.type === "Identifier") {
            exportedNames.push(spec.exported.name);
          }
        }
      },

      "Program:exit"(node) {
        if (!exportedNames.includes(componentName)) {
          context.report({
            node,
            message: `${fileName} must export a component named ${componentName}`,
          });
        }
      },
    };
  },
};
