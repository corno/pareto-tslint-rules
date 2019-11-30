// tslint:disable: no-console array-type max-classes-per-file
import * as Lint from "tslint"
import * as ts from "typescript"
import { castNode, isExpression } from "./castNode"
import {
    ArrowFunctionBody,
    ArrowFunctionBodyKind,
    BindingName,
    BindingNameKind,
    Block,
    ClassMember,
    ClassMemberKind,
    Clause,
    ClauseKind,
    Expression,
    ExpressionKind,
    Identifier,
    notSet,
    ObjectLiteralPropertyType,
    Optional,
    Parameter,
    ParameterType,
    PossiblyMissing,
    PossiblyUnsupported,
    present,
    PropertyName,
    PropertyNameKind,
    RootStatement,
    RootStatementKind,
    set,
    Statement,
    StatementKind,
    stub,
    supported,
    TypeArgument,
    VariableStatementDeclaration,
} from "./typeSystem"

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
        return this.applyWithWalker(new AllWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
    }
}

class AllWalker extends Lint.AbstractWalker<Set<string>> {
    public walk(sourceFile: ts.SourceFile) {
        sourceFile.referencedFiles.forEach(rf => {
            console.log(">f>" + rf.fileName)
        })
        sourceFile.amdDependencies.forEach(amd => {
            console.log(">amd>" + amd.name + " " + amd.path)
        })
        const resultSourceFile = this.processSourceFile(sourceFile)
        resultSourceFile.statements.forEach(() => { })
    }
    private processTypeNode(tn: ts.TypeNode) {
        const castTypeNode = castNode(tn)
        switch (castTypeNode[0]) {
            case "ArrayType":
                break
            case "UnionType":
                break
            case "TypeLiteral":
                break
            case "TypeReference":
                break
            default:
                console.log(castTypeNode[0])
        }
        return stub
    }
    private processBlock(b: ts.Block): Block {
        return {
            statements: this.processStatements(b.statements),
        }
    }
    private missing<T>(node: ts.Node, message: string): PossiblyMissing<T> {
        this.addFailureAtNode(node, message)
        return ["missing"]
    }
    private unsupported<T>(node: ts.Node, message: string): PossiblyUnsupported<T> {
        this.addFailureAtNode(node, message)
        return ["unsupported"]
    }

    private processSourceFile(sf: ts.SourceFile) {
        return {
            statements: sf.statements.map<RootStatement>(statement => {
                return {
                    kind: ((): PossiblyUnsupported<RootStatementKind> => {
                        const castStatement = castNode(statement)
                        switch (castStatement[0]) {
                            case "ClassDeclaration": {
                                const cd = castStatement[1]

                                if (cd.typeParameters !== undefined) {
                                    cd.typeParameters.map(tp => {
                                        this.missing(tp, "type parameters are not supported")
                                    })
                                }

                                return supported(["ClassDeclaration", {
                                    name: cd.name === undefined ? this.missing(cd, "missing class name") : present({ text: cd.name.text }),
                                    members: cd.members.map<ClassMember>(m => {
                                        return {
                                            kind: ((): PossiblyUnsupported<ClassMemberKind> => {

                                                const castMember = castNode(m)
                                                switch (castMember[0]) {
                                                    case "Constructor": {
                                                        return supported(["Constructor", stub])
                                                    }
                                                    case "MethodDeclaration": {
                                                        const md = castMember[1]
                                                        return supported(["MethodDeclaration", {
                                                            name: md.name === undefined ? this.missing(md, "missing method name") : present(this.processPropertyName(md.name)),
                                                            parameters: md.parameters.map(p => {
                                                                return {
                                                                    name: this.processBindingName(p.name),
                                                                    type: ((): PossiblyMissing<ParameterType> => {
                                                                        if (p.type === undefined) {
                                                                            return this.missing(p, "missing parameter type")
                                                                        } else {
                                                                            return present(stub)
                                                                            //return p.type.getFullText()
                                                                        }
                                                                    })(),
                                                                }
                                                            }),
                                                            body: ((): PossiblyMissing<Block> => {
                                                                if (md.body === undefined) {
                                                                    return this.missing(md, "missing body")
                                                                } else {
                                                                    return present(this.processBlock(md.body))
                                                                }
                                                            })(),
                                                        }])
                                                    }
                                                    case "PropertyDeclaration": {
                                                        //const propertyDeclaration = castMember[1]
                                                        return supported(["PropertyDeclaration", stub])
                                                        // return ["PropertyDeclaration", {
                                                        //     name: this.processPropertyName(propertyDeclaration.name),
                                                        // }]
                                                    }
                                                    default:
                                                        return this.unsupported(statement, "unsupported class member type: " + castMember[0])
                                                }
                                            })(),
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
                                }])
                            }
                            case "ImportDeclaration": {
                                return supported(["ImportDeclaration", stub])
                            }
                            case "FunctionDeclaration": {
                                const fd = castStatement[1]
                                return supported(["FunctionDeclaration", {
                                    name: fd.name === undefined ? this.missing(fd, "missing name") : present(this.processIdentifier(fd.name)),
                                    parameters: fd.parameters.map<Parameter>(p => {
                                        return {
                                            name: this.processBindingName(p.name),
                                            type: (() => {
                                                if (p.type === undefined) {
                                                    return this.missing<ParameterType>(p, "missing parameter type")
                                                } else {
                                                    return present(stub)
                                                    //return p.type.getFullText()
                                                }
                                            })(),
                                        }
                                    }),
                                    body: ((): PossiblyMissing<Block> => {
                                        if (fd.body === undefined) {
                                            return this.missing(fd, "unexpected missing body")
                                        } else {
                                            return present(this.processBlock(fd.body))
                                        }
                                    })(),
                                }])
                            }
                            case "TypeAliasDeclaration": {
                                //const tad = castStatement[1]
                                return supported(["TypeAliasDeclaration", stub])
                            }
                            default:
                                return this.unsupported(statement, "unsupported root statement type: " + castStatement[0])
                        }
                    })(),
                }
            }),
        }
    }
    private processIdentifier(i: ts.Identifier): Identifier {
        return {
            text: i.text,
        }
    }
    private processPropertyName(pn: ts.PropertyName): PropertyName {
        return {
            kind: ((): PossiblyUnsupported<PropertyNameKind> => {
                const castPropertyName = castNode(pn)
                switch (castPropertyName[0]) {
                    case "Identifier":
                        return supported(["Identifier", { text: castPropertyName[1].text }])
                    default:
                        return this.unsupported(pn, "expected an identifier")
                }
            })(),
        }
    }
    private processExpression(e: ts.Expression): Expression {
        return {
            kind: ((): PossiblyUnsupported<ExpressionKind> => {
                const castExpression = castNode(e)
                switch (castExpression[0]) {
                    case "ArrayLiteralExpression": {
                        const alExp = castExpression[1]
                        return supported(["ArrayLiteralExpression", {
                            elements: alExp.elements.map(element => this.processExpression(element)),
                        }])
                    }
                    case "ArrowFunction": {
                        const arrowFunction = castExpression[1]
                        const afArg: PossiblyUnsupported<ExpressionKind> = supported(["ArrowFunction", {
                            body: ((): ArrowFunctionBody => {
                                return {
                                    kind: ((): PossiblyUnsupported<ArrowFunctionBodyKind> => {
                                        const castArrowFunctionBody = castNode(arrowFunction.body)
                                        if (isExpression(arrowFunction.body)) {
                                            return supported(["Expression", { expression: this.processExpression(arrowFunction.body) }])
                                        }
                                        switch (castArrowFunctionBody[0]) {
                                            case "Block":
                                                return supported(["Block", {
                                                    block: this.processBlock(castArrowFunctionBody[1]),
                                                }])
                                            default:
                                                return this.unsupported(arrowFunction.body, "unsupported arrow function body: " + castArrowFunctionBody[0])
                                        }
                                    })(),
                                }
                            })(),
                        }])
                        return afArg
                    }
                    case "CallExpression": {
                        const ce = castExpression[1]
                        return supported(["CallExpression", {
                            expression: this.processExpression(ce.expression),
                            typeArguments: ((): Optional<Array<TypeArgument>> => {
                                if (ce.typeArguments !== undefined) {
                                    return ["set", ce.typeArguments.map(_ta => {
                                        return stub
                                    })]
                                } else {
                                    return ["not set"]
                                }
                            })(),
                            arguments: ce.arguments.map<Expression>(arg => {
                                return this.processExpression(arg)
                            }),
                        }])
                    }
                    case "Identifier": {
                        const id = castExpression[1]
                        return supported(["Identifier", {
                            text: id.text,
                        }])
                    }
                    case "ParenthesizedExpression": {
                        const pae = castExpression[1]
                        return supported(["ParenthesizedExpression", {
                            expression: this.processExpression(pae.expression),
                        }])
                    }
                    case "PropertyAccessExpression": {
                        const pae = castExpression[1]
                        return supported(["PropertyAccessExpression", {
                            name: pae.name.text,
                            expression: this.processExpression(pae.expression),
                        }])
                    }
                    case "NewExpression": {
                        return supported<ExpressionKind>(["NewExpression", stub])
                    }
                    case "ObjectLiteralExpression": {
                        const olExp = castExpression[1]
                        return supported<ExpressionKind>(["ObjectLiteralExpression", {
                            properties: olExp.properties.map(prop => {
                                return {
                                    kind: ((): PossiblyUnsupported<ObjectLiteralPropertyType> => {
                                        const castProperty = castNode(prop)
                                        switch (castProperty[0]) {
                                            case "PropertyAssignment":
                                                const pa = castProperty[1]
                                                return supported(["PropertyAssignment", {
                                                    name: this.processPropertyName(pa.name),
                                                    initializer: this.processExpression(pa.initializer),
                                                }])
                                            default:
                                                return this.unsupported(prop, "unsupported object literal property type: " + castProperty[0])
                                        }
                                    })(),
                                }
                            }),
                        }])
                    }
                    case "NoSubstitutionTemplateLiteral": {
                        const nstl = castExpression[1]
                        return supported(["NoSubstitutionTemplateLiteral", {
                            text: nstl.text,
                        }])
                    }
                    case "NullKeyword": {
                        return supported(["NullKeyword", {
                        }])
                    }
                    case "StringLiteral": {
                        const stringLiteral = castExpression[1]
                        return supported(["StringLiteral", {
                            text: stringLiteral.text,
                        }])
                    }
                    case "TemplateExpression": {
                        const te = castExpression[1]
                        console.log(">>>>>", te.head.text)
                        te.templateSpans.forEach(tspan => console.log(">" + tspan.literal.text))
                        return supported(["TemplateExpression", {
                            head: te.head.text,
                            templateSpans: te.templateSpans.map(tspan => {
                                return {
                                    expression: this.processExpression(tspan.expression),
                                    text: tspan.literal.text,
                                }
                            }),
                        }])
                    }
                    case "ThisKeyword": {
                        return supported(["This", {
                        }])
                    }
                    default:
                        return this.unsupported<ExpressionKind>(e, "unsupported expression type: " + castExpression[0])
                }
            })(),
        }
    }
    private processBindingName(bindingName: ts.BindingName): BindingName {
        return {
            kind: ((): PossiblyUnsupported<BindingNameKind> => {
                const nameNode = castNode(bindingName)
                switch (nameNode[0]) {
                    case "Identifier":
                        return supported(["Identifier", { text: nameNode[1].text }])
                    default:
                        return this.unsupported(bindingName, "unsupported variable name type: " + nameNode[0])
                }
            })(),
        }
    }
    private processStatements(statements: ts.NodeArray<ts.Statement>): Array<Statement> {
        return statements.map<Statement>(statement => {
            return {
                kind: ((): PossiblyUnsupported<StatementKind> => {

                    const castStatement = castNode(statement)
                    switch (castStatement[0]) {
                        case "ExpressionStatement":
                            return supported(["ExpressionStatement", {
                                expression: this.processExpression(castStatement[1].expression),
                            }])
                        case "ReturnStatement": {
                            const rs = castStatement[1]
                            const result: PossiblyUnsupported<StatementKind> = supported(["ReturnStatement", {
                                expression: ((): Optional<Expression> => {
                                    if (rs.expression === undefined) {
                                        return notSet()
                                    } else {
                                        const exp = this.processExpression(rs.expression)
                                        return ["set", exp]
                                    }
                                })(),
                            }])
                            return result
                        }
                        case "SwitchStatement":
                            const switchStatement = castStatement[1]
                            return supported(["SwitchStatement", {
                                expression: this.processExpression(switchStatement.expression),
                                clauses: switchStatement.caseBlock.clauses.map(clause => {
                                    const castClause = castNode(clause)
                                    const resultClause: Clause = {
                                        kind: ((): ClauseKind => {
                                            switch (castClause[0]) {
                                                case "CaseClause":
                                                    const caseClause = castClause[1]
                                                    return ["CaseClause", {
                                                        expression: this.processExpression(caseClause.expression),
                                                        statements: this.processStatements(caseClause.statements),
                                                    }]
                                                case "DefaultClause":
                                                    const defaultClause = castClause[1]
                                                    return ["DefaultClause", {
                                                        statements: this.processStatements(defaultClause.statements),
                                                    }]
                                                default:
                                                    throw new Error("Unexpected clause: " + castClause[0])
                                            }
                                        })(),
                                    }
                                    return resultClause
                                }),
                            }])
                        case "VariableStatement":
                            const vs = castStatement[1]
                            return supported(["VariableStatement", {
                                declarations: vs.declarationList.declarations.map<VariableStatementDeclaration>(decl => {
                                    return {
                                        name: this.processBindingName(decl.name),
                                        type: decl.type === undefined ? notSet() : set(this.processTypeNode(decl.type)),
                                        initializer: decl.initializer === undefined ? this.missing(decl, "missing initializer") : present(this.processExpression(decl.initializer)),
                                    }
                                }),
                            }])
                        default:
                            return this.unsupported(statement, "unsupported statement type: " + castStatement[0])
                    }
                })(),
            }
        })
    }
}
