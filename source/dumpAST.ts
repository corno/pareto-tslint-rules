// import * as Lint from "tslint";
// import * as ts from "typescript";

// export class Rule extends Lint.Rules.AbstractRule {
//     public static FAILURE_STRING = "'magic numbers' are not allowed";

//     public static ALLOWED_NODES = new Set<ts.SyntaxKind>([
//     ]);

//     public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
//         // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
//         return this.applyWithWalker(new NoMagicNumbersWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
//     }
// }

// // The type parameter of AbstractWalker corresponds to the third constructor parameter.
// // tslint:disable-next-line: max-classes-per-file
// class NoMagicNumbersWalker extends Lint.AbstractWalker<Set<string>> {
//     public walk(sourceFile: ts.SourceFile) {
//         const cb = (node: ts.Node): void => {
//             // Finds specific node types and do checking.
//             if (node.kind === ts.SyntaxKind.NumericLiteral) {
//                 this.checkNumericLiteral(node, (node as ts.NumericLiteral).text);
//             } else if (node.kind === ts.SyntaxKind.PrefixUnaryExpression &&
//                        (node as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.MinusToken) {
//                 this.checkNumericLiteral(node, "-" + ((node as ts.PrefixUnaryExpression).operand as ts.NumericLiteral).text);
//             } else {
//                 // Continue rescursion: call function `cb` for all children of the current node.
//                 return ts.forEachChild(node, cb);
//             }
//         };

//         // Start recursion for all children of `sourceFile`.
//         return ts.forEachChild(sourceFile, cb);
//     }

//     private checkNumericLiteral(node: ts.Node, num: string) {
//         // `this.options` is the third constructor parameter from above (the Set we created in `Rule.apply`)
//         if (!Rule.ALLOWED_NODES.has(node.parent!.kind) && !this.options.has(num)) {
//             // Add failures to the Walker.
//             this.addFailureAtNode(node, Rule.FAILURE_STRING);
//         }
//     }
// }
