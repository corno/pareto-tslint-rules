"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable: variable-name no-empty max-line-length no-namespace object-literal-sort-keys no-string-literal */
const Lint = __importStar(require("tslint"));
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new eDslValidator(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
    }
}
exports.Rule = Rule;
Rule.FAILURE_STRING = "non allowed thingy";
function validate_SourceFile(_validator, _node) {
    console.log("X")
    //_validator.addFailureAtNode(_node, "unexpected: ");

}
exports.validate_SourceFile = validate_SourceFile;
class eDslValidator extends Lint.AbstractWalker {
    walk(sourceFile) {
        validate_SourceFile(this, sourceFile);
    }
}
