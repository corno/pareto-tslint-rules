"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const Lint = __importStar(require("tslint"));
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
        return this.applyWithWalker(new NoMagicNumbersWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
    }
}
exports.Rule = Rule;
Rule.FAILURE_STRING = "'magic numbers' are not allowed";
Rule.ALLOWED_NODES = new Set([]);
// The type parameter of AbstractWalker corresponds to the third constructor parameter.
// tslint:disable-next-line: max-classes-per-file
class NoMagicNumbersWalker extends Lint.AbstractWalker {
    walk(sourceFile) {
        const cb = (node) => {
            if (node.kind !== ts.SyntaxKind.EndOfFileToken) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
            // Finds specific node types and do checking.
            if (node.kind === ts.SyntaxKind.NumericLiteral) {
                this.checkNumericLiteral(node, node.text);
            }
            else if (node.kind === ts.SyntaxKind.PrefixUnaryExpression &&
                node.operator === ts.SyntaxKind.MinusToken) {
                this.checkNumericLiteral(node, "-" + node.operand.text);
            }
            else {
                // Continue rescursion: call function `cb` for all children of the current node.
                return ts.forEachChild(node, cb);
            }
        };
        // Start recursion for all children of `sourceFile`.
        return ts.forEachChild(sourceFile, cb);
    }
    checkNumericLiteral(node, num) {
        // `this.options` is the third constructor parameter from above (the Set we created in `Rule.apply`)
        if (!Rule.ALLOWED_NODES.has(node.parent.kind) && !this.options.has(num)) {
            // Add failures to the Walker.
            this.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    }
}
