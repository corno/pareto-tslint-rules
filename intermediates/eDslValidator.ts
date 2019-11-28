/* tslint:disable: variable-name no-empty max-line-length no-namespace object-literal-sort-keys no-string-literal */
import * as Lint from "tslint"
import * as ts from "typescript"
import * as skl from "../src/syntaxKindLookup"
export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new EDslValidator(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
    }
}

export function validate_SourceFile(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    let index = 0
    const pattern: string[] = []
    pattern.push("(ImportDeclaration | TypeAliasDeclaration)")
    let keepMatching_0 = true
    while (keepMatching_0 && _node.getChildAt(index) !== undefined) {
        switch (_node.getChildAt(index).kind) {
            case ts.SyntaxKind.ImportDeclaration: {
                validate_ImportDeclaration (_validator, _node.getChildAt(index))
                break
            }
            case ts.SyntaxKind.TypeAliasDeclaration: {
                validate_TypeAliasDeclaration (_validator, _node.getChildAt(index))
                break
            }
            default: keepMatching_0 = false
        }
        if (keepMatching_0) { index += 1 }
    }
    //console.log(pattern)
    const child = _node.getChildAt(index)
    if (child !== undefined && _node.getChildCount() > index) {
        _validator.addFailureAtNode(_node, "unexpected: " + skl.syntaxKindLookup[child.kind])
    }
}

export function wrap_SourceFile(_node: ts.Node) {
    return {
    }
}

export function validate_ImportDeclaration(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    let index = 0
    const pattern: string[] = []
    pattern.push("ImportClause")
    if (_node.getChildAt(index).kind !== ts.SyntaxKind.ImportClause) {
        _validator.addFailureAtNode(_node, "missing: " + skl.syntaxKindLookup[ts.SyntaxKind.ImportClause])
    } else {
        index += 1
    }
    //console.log(pattern)
    const child = _node.getChildAt(index)
    if (child !== undefined && _node.getChildCount() > index) {
        _validator.addFailureAtNode(_node, "unexpected: " + skl.syntaxKindLookup[child.kind])
    }
}

export function wrap_ImportDeclaration(_node: ts.Node) {
    return {
    }
}

export function validate_TypeAliasDeclaration(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    let index = 0
    const pattern: string[] = []
    pattern.push("ExportKeyword?")
    if (_node.getChildAt(index).kind === ts.SyntaxKind.ExportKeyword) {
        index += 1
    }
    //console.log(pattern)
    const child = _node.getChildAt(index)
    if (child !== undefined && _node.getChildCount() > index) {
        _validator.addFailureAtNode(_node, "unexpected: " + skl.syntaxKindLookup[child.kind])
    }
}

export function wrap_TypeAliasDeclaration(_node: ts.Node) {
    return {
    }
}
// tslint:disable-next-line: max-classes-per-file
class EDslValidator extends Lint.AbstractWalker<Set<string>> {
    public walk(sourceFile: ts.SourceFile) {
        validate_SourceFile(this, sourceFile)
    }
}
