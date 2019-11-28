// tslint:disable: no-console array-type
//import * as FP from "fountain-pen"
import * as Lint from "tslint"
//import * as utils from "tsutils"
import * as ts from "typescript"
import { castNode, isExpression } from "../castNode"


class STUB {
    public readonly stub = "stub"
}
const stub = new STUB()


type Possible<Type> = null | Type

type PossiblyUnsupported<Type> = undefined | Type

type TypeArgument = STUB

type ArrowFunctionBody =
    | ["expression", {
        "expression": Possible<Expression>
    }]
    | ["block", {
        "block": Block
    }]

type Argument = Expression

type Expression = PossiblyUnsupported<
    | ["ArrayLiteralExpression", STUB]
    | ["ArrowFunction", {
        "body": Possible<ArrowFunctionBody>
    }]
    | ["StringLiteral", {
        "value": string
    }]
    | ["CallExpression", {
        "expression": Possible<Expression>
        "type arguments": Possible<Array<TypeArgument>>
        "arguments": Array<Argument>
    }]
    | ["Identifier", {
        value: string
    }]
    | ["PropertyAccessExpression", {
        name: string,
        expression: Possible<Expression>
    }]
    | ["NullKeyword", {
    }]
    | ["NewExpression", {
    }]
    | ["This", {}]
>

type Statement = PossiblyUnsupported<
    | ["ExpressionStatement", {
        "expression": Expression
    }]
    | ["ReturnStatement", {
        "expression": Possible<Expression>
    }]
    | ["SwitchStatement", STUB]
    | ["VariableStatement", STUB]
>

type Block = {
    "statements": Iterable<Statement>
}

type Parameter = {
    name: string
    type: Possible<STUB>
}

type FunctionDeclaration = {
    "name": Possible<string>
    "parameters": Array<Parameter>
    "body": Possible<Block>
}

type ClassMember = PossiblyUnsupported<
    | ["Constructor", STUB]
    | ["MethodDeclaration", FunctionDeclaration]
    | ["PropertyDeclaration", STUB]
>

type RootStatement = PossiblyUnsupported<
    | ["ClassDeclaration", {
        "name": Possible<string>
        "members": Array<ClassMember>
    }]
    | ["ImportDeclaration", {}]
    | ["FunctionDeclaration", FunctionDeclaration]
    | ["TypeAliasDeclaration", {}]
>

// interface IExpressionVisistor {
//     CallExpression(): void
//     Identifier(): void
//     PropertyAccessExpression(): void
// }

// function cast<Type>(value: null | Type) {
//     if (value === null) {
//         throw new Error("Unexpected null")
//     } else {
//         return value
//     }
// }

// function printExpression(w: FP.IFountainPen, e: Expression) {
//     switch (e[0]) {
//         case "CallExpression": {
//             const s = e[1]
//             printExpression(w, cast(s.expression))
//             w.snippet(
//                 `(`,
//                 () => {
//                     s.arguments.forEach(a => {
//                         switch (a[0]) {
//                             case "ArrowFunction": {
//                                 const s = a[1]
//                                 w.write(``)
//                                 break
//                             }
//                             case "StringLiteral": {
//                                 const s = a[1]

//                                 break
//                             }
//                             default:
//                                 assertUnreachable(a[0])
//                                 throw new Error("UNREACHABLE")
//                         }
//                     })
//                 },
//                 `)`
//             )
//             break
//         }
//         case "Identifier": {
//             const s = e[1]

//             break
//         }
//         case "PropertyAccessExpression": {
//             const s = e[1]

//             break
//         }
//         default:
//             assertUnreachable(e[0])
//             throw new Error("UNREACHABLE")
//     }
// }

// tslint:disable-next-line: max-classes-per-file
export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
        return this.applyWithWalker(new AllWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
    }
}

// function filter<Old, New>(array: Old[], callback: (element: Old) => [false] | [true, New]): New[] {
//     const newArray: New[] = []
//     array.forEach(element => {
//         const filterResult = callback(element)
//         if (filterResult[0] === true) {
//             newArray.push(filterResult[1])
//         }
//     })
//     return newArray
// }

// The type parameter of AbstractWalker corresponds to the third constructor parameter.
// tslint:disable-next-line: max-classes-per-file
class AllWalker extends Lint.AbstractWalker<Set<string>> {
    public walk(sourceFile: ts.SourceFile) {
        // const callback = (node: ts.Node, indent: string): void => {
        //     if (node.kind !== ts.SyntaxKind.EndOfFileToken) {
        //         //return this.failure(node, Rule.FAILURE_STRING)
        //     }
        //     //console.log(indent + SK.syntaxKindLookup[node.kind])
        //     // Finds specific node types and do checking.

        // }


        console.log(sourceFile.fileName)
        sourceFile.referencedFiles.forEach(rf => {
            console.log(">f>" + rf.fileName)
        })
        sourceFile.amdDependencies.forEach(amd => {
            console.log(">amd>" + amd.name + " " + amd.path)
        })
        const resultSourceFile = {
            statements: sourceFile.statements.map<RootStatement>(statement => {
                const castStatement = castNode(statement)
                switch (castStatement[0]) {
                    case "ClassDeclaration": {
                        const cd = castStatement[1]

                        if (cd.typeParameters !== undefined) {
                            cd.typeParameters.map(tp => {
                                this.failure(tp, "type parameters are not supported")
                            })
                        }

                        return ["ClassDeclaration", {
                            name: cd.name === undefined ? null : cd.name.text,
                            members: cd.members.map<PossiblyUnsupported<ClassMember>>(m => {
                                const castMember = castNode(m)
                                switch (castMember[0]) {
                                    case "Constructor": {
                                        return ["Constructor", stub]
                                    }
                                    case "MethodDeclaration": {
                                        const md = castMember[1]
                                        return ["MethodDeclaration", {
                                            name: md.name === undefined ? null : this.processPropertyName(md.name),
                                            parameters: md.parameters.map(p => {
                                                return {
                                                    name: p.name.getText(),
                                                    type: (() => {
                                                        if (p.type === undefined) {
                                                            return this.failure(p, "missing parameter type")
                                                        } else {
                                                            return stub
                                                            //return p.type.getFullText()
                                                        }
                                                    })(),
                                                }
                                            }),
                                            body: (() => {
                                                if (md.body === undefined) {
                                                    return this.failure(md, "unexpected missing body")
                                                } else {
                                                    return this.processBlock(md.body)
                                                }
                                            })(),
                                        }]
                                    }
                                    case "PropertyDeclaration": {
                                        //const propertyDeclaration = castMember[1]
                                        return ["PropertyDeclaration", stub]
                                        // return ["PropertyDeclaration", {
                                        //     name: this.processPropertyName(propertyDeclaration.name),
                                        // }]
                                    }
                                    default:
                                        return this.unsupported(statement, "unsupported class member type: " + castMember[0])
                                }
                                // return {
                                //     name: (() => {
                                //         if (m.name === undefined) {
                                //             console.log(SK.syntaxKindLookup[m.kind])
                                //             return this.failure(m, "missing name")
                                //         } else {
                                //             if (m.name.kind !== ts.SyntaxKind.Identifier) {
                                //                 return this.failure(m.name, "expected an identifier")
                                //             }
                                //             return id.text
                                //         }
                                //     })(),
                                // }
                            }),
                        }]
                    }
                    case "ImportDeclaration": {
                        return ["ImportDeclaration", {}]
                    }
                    case "FunctionDeclaration": {
                        const fd = castStatement[1]
                        return ["FunctionDeclaration", {
                            name: fd.name === undefined ? null : fd.name.text,
                            parameters: fd.parameters.map(p => {
                                return {
                                    name: p.name.getText(),
                                    type: (() => {
                                        if (p.type === undefined) {
                                            return this.failure(p, "missing parameter type")
                                        } else {
                                            return stub
                                            //return p.type.getFullText()
                                        }
                                    })(),
                                }
                            }),
                            body: (() => {
                                if (fd.body === undefined) {
                                    return this.failure(fd, "unexpected missing body")
                                } else {
                                    return this.processBlock(fd.body)
                                }
                            })(),
                        }]
                    }
                    case "TypeAliasDeclaration": {
                        //const tad = castStatement[1]

                        return ["TypeAliasDeclaration", {}]
                    }
                    default:
                        return this.unsupported(statement, "unsupported root statement type: " + castStatement[0])
                }
            }),
        }

        //console.log(JSON.stringify(resultSourceFile, undefined, " "))



        // // Start recursion for all children of `sourceFile`.
        // return ts.forEachChild(sourceFile, node => {
        //     callback(node, "")
        // })

    }



    // private checkNumericLiteral(node: ts.Node, num: string) {
    //     // `this.options` is the third constructor parameter from above (the Set we created in `Rule.apply`)
    //     if (!Rule.ALLOWED_NODES.has(node.parent!.kind) && !this.options.has(num)) {
    //         // Add failures to the Walker.
    //         return this.failure(node, Rule.FAILURE_STRING)
    //     }
    // }
    private processPropertyName(pn: ts.PropertyName) {
        const castPropertyName = castNode(pn)
        switch (castPropertyName[0]) {
            case "Identifier":
                return castPropertyName[1].text
            default:
                return this.failure(pn, "expected an identifier")
        }
    }
    private processExpression(e: ts.Expression): PossiblyUnsupported<Expression> {
        const castExpression = castNode(e)
        switch (castExpression[0]) {
            case "ArrayLiteralExpression": {
                return ["ArrayLiteralExpression", stub]
            }
            case "ArrowFunction": {
                const arrowFunction = castExpression[1]
                const afArg: Argument = ["ArrowFunction", {

                    body: ((): Possible<ArrowFunctionBody> => {
                        const castArrowFunctionBody = castNode(arrowFunction.body)
                        if (isExpression(arrowFunction.body)) {
                            return ["expression", { expression: this.processExpression(arrowFunction.body) }]
                        }
                        switch (castArrowFunctionBody[0]) {
                            case "Block":
                                return ["block", {
                                    block: this.processBlock(castArrowFunctionBody[1]),
                                }]
                            default:
                                return this.failure(arrowFunction.body, "unsupported arrow function body: " + castArrowFunctionBody[0])
                        }
                    })(),
                }]
                return afArg
            }
            case "CallExpression": {
                const ce = castExpression[1]
                return ["CallExpression", {
                    "expression": this.processExpression(ce.expression),
                    "type arguments": (() => {
                        if (ce.typeArguments !== undefined) {
                            return ce.typeArguments.map(_ta => {
                                return stub
                            })
                        } else {
                            return null
                        }
                    })(),
                    "arguments": ce.arguments.map<Argument>(arg => {
                        return this.processExpression(arg)
                    }),
                }]
            }
            case "Identifier": {
                const id = castExpression[1]
                //this.processExpression(ce.expression)
                // if (rs.expression === undefined) {
                //     return this.failure(statement, "missing expression")
                // } else {
                //     this.processExpression(rs.expression)
                // }
                return ["Identifier", {
                    value: id.text,
                }]
            }
            case "PropertyAccessExpression": {
                const pae = castExpression[1]

                // if (rs.expression === undefined) {
                //     return this.failure(statement, "missing expression")
                // } else {
                //     this.processExpression(rs.expression)
                // }
                return ["PropertyAccessExpression", {
                    name: pae.name.text,
                    expression: this.processExpression(pae.expression),
                }]
            }
            case "NewExpression": {
                return ["NewExpression", stub]
            }
            case "NullKeyword": {
                return ["NullKeyword", {
                }]
            }
            case "StringLiteral": {
                const stringLiteral = castExpression[1]
                return ["StringLiteral", {
                    value: stringLiteral.text,
                }]
            }
            case "ThisKeyword": {
                return ["This", {
                }]
            }
            default:
                return this.unsupported(e, "unsupported expression type: " + castExpression[0])
        }
    }
    private processBlock(b: ts.Block): Block {
        return {
            statements: b.statements.map<Statement>(statement => {
                const castStatement = castNode(statement)
                switch (castStatement[0]) {
                    case "ExpressionStatement":
                        return ["ExpressionStatement", {
                            expression: this.processExpression(castStatement[1].expression),
                        }]
                    case "ReturnStatement": {
                        const rs = castStatement[1]
                        const result: Statement = ["ReturnStatement", {
                            expression: (() => {
                                if (rs.expression === undefined) {
                                    return this.failure(statement, "missing expression")
                                } else {
                                    const exp = this.processExpression(rs.expression)
                                    return exp
                                }
                            })(),
                        }]
                        return result
                    }
                    case "SwitchStatement":
                        return ["SwitchStatement", stub]
                    case "VariableStatement":
                        return ["VariableStatement", stub]
                    default:
                        return this.unsupported(statement, "unsupported statement type: " + castStatement[0])
                }
            }),
        }

    }

    private failure(node: ts.Node, message: string) {
        this.addFailureAtNode(node, message)
        return null
    }
    private unsupported(node: ts.Node, message: string) {
        this.addFailureAtNode(node, message)
        return undefined
    }
}

// type SourceFile = {
//     statements: {
//         ImportDeclaration: null | (() => void)
//         FunctionDeclaration: null | (() => void)
//     }
// }

