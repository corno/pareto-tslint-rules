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
const ts = __importStar(require("typescript"));
//import * as skl from "../source/syntaxKindLookup"
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new eDslValidator(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))));
    }
}
exports.Rule = Rule;
function validate_SourceFile(_validator, _node) {
    const children = _node.getChildren();
    //console.log(children)
    let index = 0;
    const pattern = [];
    function addFailureAtNode(node, failure) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile) {
        return;
    } ; console.log(node.kind); _validator.addFailureAtNode(node, failure); }
    function _getNextChild() { const child = children[index]; index++; return child; }
    function _peek() { return children[index]; }
    function _hasMore() { return (index <= children.length); }
    pattern.push("SyntaxList");
    const child_0 = _getNextChild();
    if (child_0 === null) {
        addFailureAtNode(_node, "NIET ZO 3");
    }
    else {
        if (child_0.kind !== ts.SyntaxKind.SyntaxList) {
            addFailureAtNode(_node, "missing SyntaxList, found " + child_0.kind);
        }
        else {
            validate_SyntaxList(_validator, child_0);
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild();
        addFailureAtNode(child, "unexpected: ");
    }
}
exports.validate_SourceFile = validate_SourceFile;
function wrap_SourceFile(_node) {
    return {};
}
exports.wrap_SourceFile = wrap_SourceFile;
function validate_SyntaxList(_validator, _node) {
    const children = _node.getChildren();
    //console.log(children)
    let index = 0;
    const pattern = [];
    function addFailureAtNode(node, failure) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile) {
        return;
    } ; console.log(node.kind); _validator.addFailureAtNode(node, failure); }
    function _getNextChild() { const child = children[index]; index++; return child; }
    function _peek() { return children[index]; }
    function _hasMore() { return (index <= children.length); }
    pattern.push("(ImportDeclaration | TypeAliasDeclaration)");
    let keepMatching_0 = true;
    while (keepMatching_0 && _hasMore()) {
        const child = _peek();
        if (child === null) {
            addFailureAtNode(_node, "NIET ZO MOOI2");
        }
        else {
            switch (child.kind) {
                case ts.SyntaxKind.ImportDeclaration: {
                    validate_ImportDeclaration(_validator, _getNextChild());
                    break;
                }
                case ts.SyntaxKind.TypeAliasDeclaration: {
                    validate_TypeAliasDeclaration(_validator, _getNextChild());
                    break;
                }
                default: {
                    keepMatching_0 = false;
                }
            }
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild();
        addFailureAtNode(child, "unexpected: ");
    }
}
exports.validate_SyntaxList = validate_SyntaxList;
function wrap_SyntaxList(_node) {
    return {};
}
exports.wrap_SyntaxList = wrap_SyntaxList;
function validate_ImportDeclaration(_validator, _node) {
    const children = _node.getChildren();
    //console.log(children)
    let index = 0;
    const pattern = [];
    function addFailureAtNode(node, failure) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile) {
        return;
    } ; console.log(node.kind); _validator.addFailureAtNode(node, failure); }
    function _getNextChild() { const child = children[index]; index++; return child; }
    function _peek() { return children[index]; }
    function _hasMore() { return (index <= children.length); }
    pattern.push("ImportClause");
    const child_0 = _getNextChild();
    if (child_0 === null) {
        addFailureAtNode(_node, "NIET ZO 3");
    }
    else {
        if (child_0.kind !== ts.SyntaxKind.ImportClause) {
            addFailureAtNode(_node, "missing ImportClause, found " + child_0.kind);
        }
        else {
            validate_ImportClause(_validator, child_0);
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild();
        addFailureAtNode(child, "unexpected: ");
    }
}
exports.validate_ImportDeclaration = validate_ImportDeclaration;
function wrap_ImportDeclaration(_node) {
    return {};
}
exports.wrap_ImportDeclaration = wrap_ImportDeclaration;
function validate_ImportClause(_validator, _node) {
    const children = _node.getChildren();
    //console.log(children)
    let index = 0;
    const pattern = [];
    function addFailureAtNode(node, failure) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile) {
        return;
    } ; console.log(node.kind); _validator.addFailureAtNode(node, failure); }
    function _getNextChild() { const child = children[index]; index++; return child; }
    function _peek() { return children[index]; }
    function _hasMore() { return (index <= children.length); }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild();
        addFailureAtNode(child, "unexpected: ");
    }
}
exports.validate_ImportClause = validate_ImportClause;
function wrap_ImportClause(_node) {
    return {};
}
exports.wrap_ImportClause = wrap_ImportClause;
function validate_TypeAliasDeclaration(_validator, _node) {
    const children = _node.getChildren();
    //console.log(children)
    let index = 0;
    const pattern = [];
    function addFailureAtNode(node, failure) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile) {
        return;
    } ; console.log(node.kind); _validator.addFailureAtNode(node, failure); }
    function _getNextChild() { const child = children[index]; index++; return child; }
    function _peek() { return children[index]; }
    function _hasMore() { return (index <= children.length); }
    pattern.push("ExportKeyword?");
    const child_0 = _peek();
    if (child_0 === null) {
        addFailureAtNode(_node, "NIET ZO 4");
    }
    else {
        if (child_0.kind === ts.SyntaxKind.ExportKeyword) {
            validate_ExportKeyword(_validator, _getNextChild());
        }
    }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild();
        addFailureAtNode(child, "unexpected: ");
    }
}
exports.validate_TypeAliasDeclaration = validate_TypeAliasDeclaration;
function wrap_TypeAliasDeclaration(_node) {
    return {};
}
exports.wrap_TypeAliasDeclaration = wrap_TypeAliasDeclaration;
function validate_ExportKeyword(_validator, _node) {
    const children = _node.getChildren();
    //console.log(children)
    let index = 0;
    const pattern = [];
    function addFailureAtNode(node, failure) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile) {
        return;
    } ; console.log(node.kind); _validator.addFailureAtNode(node, failure); }
    function _getNextChild() { const child = children[index]; index++; return child; }
    function _peek() { return children[index]; }
    function _hasMore() { return (index <= children.length); }
    //console.log(pattern)
    if (_hasMore()) {
        const child = _getNextChild();
        addFailureAtNode(child, "unexpected: ");
    }
}
exports.validate_ExportKeyword = validate_ExportKeyword;
function wrap_ExportKeyword(_node) {
    return {};
}
exports.wrap_ExportKeyword = wrap_ExportKeyword;
class eDslValidator extends Lint.AbstractWalker {
    walk(sourceFile) {
        validate_SourceFile(this, sourceFile);
    }
}
