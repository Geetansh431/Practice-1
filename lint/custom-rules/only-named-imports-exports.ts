import type { Rule } from "@oxlint/plugins";

// Only our own files are checked; packages decide their own exports.
function isOwnFile(path: string): boolean {
  return path.startsWith("./") || path.startsWith("../");
}

export const onlyNamedImportsExports: Rule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Allow only named imports and exports between our own files",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (!isOwnFile(node.source.value)) {
          return;
        }

        for (const spec of node.specifiers) {
          if (spec.type === "ImportDefaultSpecifier") {
            // import Foo from './foo'
            context.report({
              node: spec,
              message: "Use a named import instead of a default import",
            });
          }
          if (spec.type === "ImportNamespaceSpecifier") {
            // import * as foo from './foo'
            context.report({
              node: spec,
              message: "Use named imports instead of import * as",
            });
          }
        }
      },

      ExportDefaultDeclaration(node) {
        // export default ...
        context.report({
          node,
          message: "Use a named export instead of export default",
        });
      },

      ExportAllDeclaration(node) {
        // export * from './foo' and export * as foo from './foo'
        if (isOwnFile(node.source.value)) {
          context.report({
            node,
            message: "Use named exports instead of export *",
          });
        }
      },
    };
  },
};
