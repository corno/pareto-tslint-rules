/* tslint:disable: variable-name no-empty max-line-length no-namespace object-literal-sort-keys no-string-literal */
import * as Lint from "tslint"
import * as ts from "typescript"
//import * as skl from "../source/syntaxKindLookup"
export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new eDslValidator(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
    }
}

export function validate_SourceFile(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    const children = _node.getChildren()
    //console.log(children)
    let index = 0
    const pattern: string[] = []
    function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }
    function _getNextChild() { const child = children[index]; index++; return child }
    function _peek() { return children[index] }
    function _hasMore() { return (index <= children.length) }
    pattern.push("SyntaxList")
    const child_0 = _getNextChild()
    if (child_0 === null) { addFailureAtNode(_node, "NIET ZO 3") } else {
        if (child_0.kind !== ts.SyntaxKind.SyntaxList) {
            addFailureAtNode(_node, "missing SyntaxList, found " + child_0.kind)
        } else {
            validate_SyntaxList (_validator, child_0)
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild()
        addFailureAtNode(child!, "unexpected: ")
    }
}

export function wrap_SourceFile(_node: ts.Node) {
    return {
    }
}

export function validate_SyntaxList(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    const children = _node.getChildren()
    //console.log(children)
    let index = 0
    const pattern: string[] = []
    function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }
    function _getNextChild() { const child = children[index]; index++; return child }
    function _peek() { return children[index] }
    function _hasMore() { return (index <= children.length) }
    pattern.push("(ImportDeclaration | TypeAliasDeclaration)")
    let keepMatching_0 = true
    while (keepMatching_0 && _hasMore()) {
        const child = _peek()
        if (child === null) { addFailureAtNode(_node, "NIET ZO MOOI2") } else {
            switch (child.kind) {
                case ts.SyntaxKind.ImportDeclaration: {
                    validate_ImportDeclaration (_validator, _getNextChild())
                    break
                }
                case ts.SyntaxKind.TypeAliasDeclaration: {
                    validate_TypeAliasDeclaration (_validator, _getNextChild())
                    break
                }
                default: {
                    keepMatching_0 = false
                }
            }
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild()
        addFailureAtNode(child!, "unexpected: ")
    }
}

export function wrap_SyntaxList(_node: ts.Node) {
    return {
    }
}

export function validate_ImportDeclaration(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    const children = _node.getChildren()
    //console.log(children)
    let index = 0
    const pattern: string[] = []
    function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }
    function _getNextChild() { const child = children[index]; index++; return child }
    function _peek() { return children[index] }
    function _hasMore() { return (index <= children.length) }
    pattern.push("ImportClause")
    const child_0 = _getNextChild()
    if (child_0 === null) { addFailureAtNode(_node, "NIET ZO 3") } else {
        if (child_0.kind !== ts.SyntaxKind.ImportClause) {
            addFailureAtNode(_node, "missing ImportClause, found " + child_0.kind)
        } else {
            validate_ImportClause (_validator, child_0)
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild()
        addFailureAtNode(child!, "unexpected: ")
    }
}

export function wrap_ImportDeclaration(_node: ts.Node) {
    return {
    }
}

export function validate_ImportClause(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    const children = _node.getChildren()
    //console.log(children)
    let index = 0
    const pattern: string[] = []
    function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }
    function _getNextChild() { const child = children[index]; index++; return child }
    function _peek() { return children[index] }
    function _hasMore() { return (index <= children.length) }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild()
        addFailureAtNode(child!, "unexpected: ")
    }
}

export function wrap_ImportClause(_node: ts.Node) {
    return {
    }
}

export function validate_TypeAliasDeclaration(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    const children = _node.getChildren()
    //console.log(children)
    let index = 0
    const pattern: string[] = []
    function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }
    function _getNextChild() { const child = children[index]; index++; return child }
    function _peek() { return children[index] }
    function _hasMore() { return (index <= children.length) }
    pattern.push("ExportKeyword?")
    const child_0 = _peek()
    if (child_0 === null) { addFailureAtNode(_node, "NIET ZO 4") } else {
        if (child_0.kind === ts.SyntaxKind.ExportKeyword) {
            validate_ExportKeyword (_validator, _getNextChild()!)
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild()
        addFailureAtNode(child!, "unexpected: ")
    }
}

export function wrap_TypeAliasDeclaration(_node: ts.Node) {
    return {
    }
}

export function validate_ExportKeyword(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {
    const children = _node.getChildren()
    //console.log(children)
    let index = 0
    const pattern: string[] = []
    function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }
    function _getNextChild() { const child = children[index]; index++; return child }
    function _peek() { return children[index] }
    function _hasMore() { return (index <= children.length) }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild()
        addFailureAtNode(child!, "unexpected: ")
    }
}

export function wrap_ExportKeyword(_node: ts.Node) {
    return {
    }
}
class eDslValidator extends Lint.AbstractWalker<Set<string>> {
    public walk(sourceFile: ts.SourceFile) {
        validate_SourceFile(this, sourceFile)
    }
}
