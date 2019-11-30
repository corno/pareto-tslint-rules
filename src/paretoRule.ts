// tslint:disable: array-type max-classes-per-file
import { AbstractWalker, RuleFailure, Rules } from "tslint"
import { SourceFile } from "typescript"
import { buildSourceFile } from "./buildSourceFile"

export class Rule extends Rules.AbstractRule {
    public apply(sourceFile: SourceFile): RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
    }
}

class Walker extends AbstractWalker<Set<string>> {
    public walk(sourceFile: SourceFile) {
        buildSourceFile(
            {
                reportFailure: (node, message) => {
                    this.addFailureAtNode(node, message)
                },
            },
            sourceFile
        )
    }
}
