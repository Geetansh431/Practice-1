import type { ESTree, Rule } from "@oxlint/plugins";

export const noBarrelFiles: Rule = {
  meta: {
    type: "problem", // Categorizes this as a problem rule (not style/suggestion)
    docs: {
      description:
        "Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused",
    },
  },
  create(context) {
    const importedNames = new Set<string>();
    const reportBarrel = (node: ESTree.Node, message = "Avoid using barrel files") => {
      context.report({ node, message });
    };

    return {
      ImportDeclaration(node) {
        node.specifiers.forEach((spec) => {
          importedNames.add(spec.local.name);
        });
      },

      ExportNamedDeclaration(node) {
        if (node.source) {
          // export { foo } from './fileName'
          reportBarrel(node);
        } else if (
          node.specifiers.some(
            (spec) => spec.local.type === "Identifier" && importedNames.has(spec.local.name),
          )
        ) {
          // import { foo }; export { foo }
          reportBarrel(node);
        }
      },
    };
  },
};
