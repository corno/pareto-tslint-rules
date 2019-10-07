import * as Writer from "steroid-writer"
import * as Utils from "../../utils"


type HandlerElement =
    ["any", string[]]
    |
    ["req", string]
    |
    ["opt", string]

export type Data = {
    [key: string]: HandlerElement[]
}



export function generate(data: Data, writer: Writer.Writer) {
    writer.write(`/* tslint:disable: variable-name no-empty max-line-length no-namespace object-literal-sort-keys no-string-literal */`)
    writer.write(
        `import * as Lint from "tslint"`,
        `import * as ts from "typescript"`,
        `//import * as skl from "../source/syntaxKindLookup"`,

        `export class Rule extends Lint.Rules.AbstractRule {`, () => {
            writer.write(
                `public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {`, () => {
                    writer.write(
                        `return this.applyWithWalker(new eDslValidator(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))`
                    )
                }, `}`
            )
        }, `}`
    )
    Object.keys(data).forEach(handlerName => {
        const handler = data[handlerName]
        writer.write(
            ``,
            `export function validate_${handlerName}(_validator: Lint.AbstractWalker<Set<string>>, _node: ts.Node) {`, () => {
                writer.write(
                    `const children = _node.getChildren()`,
                    `//console.log(children)`,
                    `let index = 0`,
                    `const pattern: string[] = []`,
                    `function addFailureAtNode(node: ts.Node, failure: string) { if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SourceFile ) { return }; console.log(node.kind) ; _validator.addFailureAtNode(node, failure) }`,
                    `function _getNextChild() { const child = children[index]; index++; return child }`,
                    `function _peek() { return children[index] }`,
                    `function _hasMore() { return (index <= children.length) }`
                )
                handler.forEach((handlerElement, index) => {
                    switch (handlerElement[0]) {
                        case "any":
                            writer.write(`pattern.push("(${handlerElement[1].join(" | ")})")`)
                            writer.write(
                                `let keepMatching_${index} = true`,
                                `while (keepMatching_${index} && _hasMore()) {`, () => {
                                    writer.write(
                                        `const child = _peek()`,
                                        `if (child === null) { addFailureAtNode(_node, "NIET ZO MOOI2") } else {`, () => {
                                            writer.write(
                                                `switch (child.kind) {`, () => {
                                                    handlerElement[1].forEach(opt => {
                                                        writer.write(
                                                            `case ts.SyntaxKind.${opt}: {`, () => {
                                                                writer.write(
                                                                    `validate_${opt} (_validator, _getNextChild())`,
                                                                    `break`
                                                                )
                                                            }, `} `
                                                        )
                                                    })
                                                    writer.write(
                                                        `default: {`, () => {
                                                            writer.write(`keepMatching_${index} = false`)
                                                        }, `}`
                                                    )
                                                }, `} `,
                                            )
                                        }, `}`
                                    )
                                }, `}`
                            )
                            break
                        case "req":
                            writer.write(`pattern.push("${handlerElement[1]}")`)
                            writer.write(
                                `const child_${index} = _getNextChild()`,
                                `if (child_${index} === null) { addFailureAtNode(_node, "NIET ZO 3") } else {`, () => {
                                    writer.write(
                                        `if (child_${index}.kind !== ts.SyntaxKind.${handlerElement[1]}) {`, () => {
                                            writer.write(
                                                `addFailureAtNode(_node, "missing ${handlerElement[1]}, found " + child_${index}.kind)` // + skl.syntaxKindLookup[ts.SyntaxKind.${handlerElement[1]}]
                                            )
                                        }, `} else {`, () => {
                                            writer.write(
                                                `validate_${handlerElement[1]} (_validator, child_${index})`,
                                            )
                                        }, `} `
                                    )
                                }, `}`
                            )
                            break
                        case "opt":
                            writer.write(`pattern.push("${handlerElement[1]}?")`)
                            writer.write(
                                `const child_${index} = _peek()`,
                                `if (child_${index} === null) { addFailureAtNode(_node, "NIET ZO 4") } else {`, () => {
                                    writer.write(
                                        `if (child_${index}.kind === ts.SyntaxKind.${handlerElement[1]}) {`, () => {
                                            writer.write(
                                                `validate_${handlerElement[1]} (_validator, _getNextChild()!)`,
                                            )
                                        }, `} `
                                    )
                                }, `}`
                            )
                            break
                        default: Utils.assertUnreachable(handlerElement[0])
                    }
                })
                writer.write(
                    `//console.log(pattern)`,
                    `if (_hasMore()) {`, () => {
                        writer.write(
                            `const child = _getNextChild()`,
                            `addFailureAtNode(child!, "unexpected: ")`
                        ) // + skl.syntaxKindLookup[child.kind]
                    }, `} `
                )
            }, `}`,

            ``,
            `export function wrap_${handlerName}(_node: ts.Node) {`, () => {
                handler.forEach(handlerElement => {
                    switch (handlerElement[0]) {
                        case "any":
                            break
                        case "req":
                            break
                        case "opt":
                            break
                        default: Utils.assertUnreachable(handlerElement[0])
                    }
                })
                writer.write(
                    `return {`, () => {

                    }, `}`
                )
            }, `}`
        )
        handler.forEach(handlerElement => {
            switch (handlerElement[0]) {
                case "any":
                    break
                case "req":
                    break
                case "opt":
                    break
                default: Utils.assertUnreachable(handlerElement[0])
            }
        })
    })
    writer.write(
        `class eDslValidator extends Lint.AbstractWalker<Set<string>> {`, () => {
            writer.write(
                `public walk(sourceFile: ts.SourceFile) {`, () => {
                    writer.write(`validate_SourceFile(this, sourceFile)`)
                }, `} `
            )
        }, `}`
    )

    writer.write(``)
}
