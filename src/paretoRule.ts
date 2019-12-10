// tslint:disable: array-type max-classes-per-file pareto
import * as fp from "fountain-pen"
import { AbstractWalker, RuleFailure, Rules } from "tslint"
import { SourceFile } from "typescript"
import { createSourceFileBuilder } from "./buildSourceFile"
import { CodeGenerator } from "./generateCode"
import { createTypescriptAPI } from "./utils"

export class Rule extends Rules.AbstractRule {
    public apply(sourceFile: SourceFile): RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
    }
}

class Walker extends AbstractWalker<Set<string>> {
    public walk(sourceFile: SourceFile) {
        const sf = createSourceFileBuilder({
            reporter: {
                reportFailure: p => {
                    this.addFailureAtNode(p.node, p.message)
                },
            },
            typescriptAPI: createTypescriptAPI(),
        }).processSourceFile(sourceFile)
        const cg = new CodeGenerator()
        const paragraphs = cg.sourceFile(sf)
        //tslint:disable-next-line: no-console
        fp.serialize(paragraphs, "    ", true, str => console.log(str))

    }
}
