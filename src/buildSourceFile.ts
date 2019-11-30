// tslint:disable: array-type max-classes-per-file
import * as ts from "typescript"
import { getKindName, isExpression } from "./castNode"
import {
    notSet,
    Optional,
    PossiblyMissing,
    PossiblyUnsupported,
    present,
    set,
    stub,
    supported,
} from "./states"
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
    ConstructorBlock,
    Expression,
    ExpressionKind,
    Identifier,
    InterfaceDeclarationMemberKind,
    ObjectLiteralPropertyType,
    Parameter,
    PropertyName,
    PropertyNameKind,
    RootStatement,
    RootStatementKind,
    SourceFile,
    Statement,
    StatementKind,
    TypeNode,
    TypeNodeKind,
    TypeParameterDeclaration,
    TypeParameterDeclarationKind,
    VariableStatementDeclaration,
} from "./typeSystem"

export interface IReporter {
    reportFailure(node: ts.Node, message: string): void
}

class SourceFileBuilder {
    private readonly reporter: IReporter
    constructor(reporter: IReporter) {
        this.reporter = reporter
    }
    public processSourceFile(sf: ts.SourceFile): SourceFile {
        // sourceFile.referencedFiles.forEach(rf => {
        //     console.log(">f>" + rf.fileName)
        // })
        // sourceFile.amdDependencies.forEach(amd => {
        //     console.log(">amd>" + amd.name + " " + amd.path)
        // })
        return {
            statements: sf.statements.map<RootStatement>(statement => {
                return {
                    kind: ((): PossiblyUnsupported<RootStatementKind> => {
                        if (ts.isClassDeclaration(statement)) {
                            const cd = statement
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
                                            if (ts.isConstructorDeclaration(m)) {
                                                return supported(["Constructor", {
                                                    parameters: m.parameters.map(p => {
                                                        return {
                                                            name: this.processBindingName(p.name),
                                                            type: ((): PossiblyMissing<TypeNode> => {
                                                                if (p.type === undefined) {
                                                                    return this.missing(p, "missing parameter type")
                                                                } else {
                                                                    return present(this.processTypeNode(p.type))
                                                                }
                                                            })(),
                                                        }
                                                    }),
                                                    body: ((): PossiblyMissing<ConstructorBlock> => {
                                                        if (m.body === undefined) {
                                                            return this.missing(m, "missing body")
                                                        } else {
                                                            return present({
                                                                statements: m.body.statements.map(s => {
                                                                    return {
                                                                        kind: this.unsupported(s, "constructor body statements"),
                                                                    }
                                                                }),
                                                            })
                                                        }
                                                    })(),

                                                }])
                                            } else if (ts.isMethodDeclaration(m)) {
                                                return supported(["MethodDeclaration", {
                                                    name: this.processPropertyName(m.name),
                                                    parameters: m.parameters.map(p => {
                                                        return {
                                                            name: this.processBindingName(p.name),
                                                            type: ((): PossiblyMissing<TypeNode> => {
                                                                if (p.type === undefined) {
                                                                    return this.missing(p, "missing parameter type")
                                                                } else {
                                                                    return present(this.processTypeNode(p.type))
                                                                }
                                                            })(),
                                                        }
                                                    }),
                                                    body: ((): PossiblyMissing<Block> => {
                                                        if (m.body === undefined) {
                                                            return this.missing(m, "missing body")
                                                        } else {
                                                            return present(this.processBlock(m.body))
                                                        }
                                                    })(),
                                                }])
                                            } else if (ts.isPropertyDeclaration(m)) {
                                                return supported(["PropertyDeclaration", {
                                                    name: this.processPropertyName(m.name),
                                                    type: m.type === undefined ? notSet() : set(this.processTypeNode(m.type)),
                                                    initializer: m.initializer === undefined ? notSet() : set(this.processExpression(m.initializer)),
                                                }])
                                            } else {
                                                return this.unsupported(statement, "class member")
                                            }
                                        })(),
                                    }
                                }),
                            }])

                        } else if (ts.isImportDeclaration(statement)) {
                            return supported(["ImportDeclaration", {
                                importClause: statement.importClause === undefined ? notSet() : set({
                                    name: statement.importClause.name === undefined ? notSet() : set(this.processIdentifier(statement.importClause.name)),
                                    namedBindings: statement.importClause.namedBindings === undefined ? notSet() : set(stub),
                                }),
                                moduleSpecifier: (() => {
                                    if (ts.isStringLiteral(statement.moduleSpecifier)) {
                                        return {
                                            text: statement.moduleSpecifier.text,
                                        }
                                    } else {
                                        throw new Error("Expected StringLiteral as moduleSpecifier")
                                    }
                                })(),
                            }])
                        } else if (ts.isInterfaceDeclaration(statement)) {
                            if (statement.typeParameters !== undefined) {
                                statement.typeParameters.map(tp => this.reporter.reportFailure(tp, "type parameters are not supported"))
                            }
                            if (statement.heritageClauses !== undefined) {
                                statement.heritageClauses.map(hc => this.reporter.reportFailure(hc, "heritage clauses are not supported"))
                            }
                            return supported(["InterfaceDeclaration", {
                                members: statement.members.map(m => {
                                    return {
                                        kind: ((): PossiblyUnsupported<InterfaceDeclarationMemberKind> => {
                                            return this.unsupported(m, "interface declaration member")
                                        })(),
                                    }
                                }),
                            }])
                        } else if (ts.isFunctionDeclaration(statement)) {
                            const fd = statement
                            return supported(["FunctionDeclaration", {
                                name: fd.name === undefined ? this.missing(fd, "missing name") : present(this.processIdentifier(fd.name)),
                                parameters: fd.parameters.map<Parameter>(p => {
                                    return {
                                        name: this.processBindingName(p.name),
                                        type: (() => {
                                            if (p.type === undefined) {
                                                return this.missing<TypeNode>(p, "missing parameter type")
                                            } else {
                                                return present(this.processTypeNode(p.type))
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

                        } else if (ts.isTypeAliasDeclaration(statement)) {
                            const tad = statement
                            return supported(["TypeAliasDeclaration", {
                                typeParameters: tad.typeParameters === undefined ? notSet() : set(tad.typeParameters.map(tp => {
                                    return this.processTypeParameterDeclaration(tp)
                                })),
                                type: this.processTypeNode(tad.type),
                            }])
                        } else {
                            return this.unsupported(statement, "root statement")
                        }
                    })(),
                }
            }),
        }
    }
    private processTypeParameterDeclaration(tpd: ts.TypeParameterDeclaration): TypeParameterDeclaration {
        return {
            kind: ((): PossiblyUnsupported<TypeParameterDeclarationKind> => {
                return this.unsupported(tpd, "type parameter declaration")
            })(),
        }
    }
    private processTypeNode(tn: ts.TypeNode): TypeNode {
        return {
            kind: ((): PossiblyUnsupported<TypeNodeKind> => {
                if (ts.isArrayTypeNode(tn)) {
                    return supported(["ArrayType", {
                        elementType: this.processTypeNode(tn.elementType),
                    }])
                } else if (ts.isUnionTypeNode(tn)) {
                    return supported(["UnionType", {
                        types: tn.types.map(t => this.processTypeNode(t)),
                    }])
                // } else if (ts.isTypeLiteralNode(tn)) {
                //     return supported(["TypeLiteral", {
                //         members: tn.members.map(m => {
                //             return stub
                //         }),
                //     }])
                } else if (ts.isFunctionTypeNode(tn)) {
                    return supported(["FunctionType", stub])
                } else if (tn.kind === ts.SyntaxKind.NumberKeyword) {
                    return supported(["NumberKeyword", {}])
                } else if (tn.kind === ts.SyntaxKind.NullKeyword) {
                    return supported(["NullKeyword", {}])
                } else if (tn.kind === ts.SyntaxKind.StringKeyword) {
                    return supported(["StringKeyword", {}])
                } else if (ts.isTupleTypeNode(tn)) {
                    return supported(["TupleType", stub])
                } else if (ts.isTypeReferenceNode(tn)) {
                    return supported(["TypeReference", stub])
                } else {
                    return this.unsupported(tn, "type node")
                }
            })(),
        }
    }
    private processBlock(b: ts.Block): Block {
        return {
            statements: this.processStatements(b.statements),
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
                if (ts.isIdentifier(pn)) {
                    return supported(["Identifier", { text: pn.text }])
                } else if (ts.isStringLiteral(pn)) {
                    return supported(["StringLiteral", { text: pn.text }])
                } else {
                    return this.unsupported(pn, "property name")
                }
            })(),
        }
    }
    private processExpression(e: ts.Expression): Expression {
        return {
            kind: ((): PossiblyUnsupported<ExpressionKind> => {
                if (ts.isArrayLiteralExpression(e)) {
                    return supported(["ArrayLiteralExpression", {
                        elements: e.elements.map(element => this.processExpression(element)),
                    }])
                } else if (ts.isArrowFunction(e)) {
                    const afArg: PossiblyUnsupported<ExpressionKind> = supported(["ArrowFunction", {
                        body: ((): ArrowFunctionBody => {
                            return {
                                kind: ((): PossiblyUnsupported<ArrowFunctionBodyKind> => {
                                    if (isExpression(e.body)) {
                                        return supported(["Expression", { expression: this.processExpression(e.body) }])
                                    }
                                    if (ts.isBlock(e.body)) {
                                        return supported(["Block", {
                                            block: this.processBlock(e.body),
                                        }])
                                    } else {
                                        return this.unsupported(e.body, "arrow function body")
                                    }
                                })(),
                            }
                        })(),
                    }])
                    return afArg
                } else if (ts.isCallExpression(e)) {
                    return supported(["CallExpression", {
                        expression: this.processExpression(e.expression),
                        typeArguments: ((): Optional<Array<TypeNode>> => {
                            if (e.typeArguments !== undefined) {
                                return ["set", e.typeArguments.map(ta => this.processTypeNode(ta))]
                            } else {
                                return ["not set"]
                            }
                        })(),
                        arguments: e.arguments.map<Expression>(arg => {
                            return this.processExpression(arg)
                        }),
                    }])

                } else if (ts.isElementAccessExpression(e)) {
                    return supported(["ElementAccessExpression", stub])
                } else if (ts.isIdentifier(e)) {
                    return supported(["Identifier", {
                        text: e.text,
                    }])
                } else if (ts.isParenthesizedExpression(e)) {
                    return supported(["ParenthesizedExpression", {
                        expression: this.processExpression(e.expression),
                    }])

                } else if (ts.isPropertyAccessExpression(e)) {
                    return supported(["PropertyAccessExpression", {
                        name: e.name.text,
                        expression: this.processExpression(e.expression),
                    }])

                } else if (ts.isNewExpression(e)) {
                    return supported<ExpressionKind>(["NewExpression", stub])
                } else if (ts.isObjectLiteralExpression(e)) {
                    return supported<ExpressionKind>(["ObjectLiteralExpression", {
                        properties: e.properties.map(prop => {
                            return {
                                kind: ((): PossiblyUnsupported<ObjectLiteralPropertyType> => {
                                    if (ts.isPropertyAssignment(prop)) {
                                        return supported(["PropertyAssignment", {
                                            name: this.processPropertyName(prop.name),
                                            initializer: this.processExpression(prop.initializer),
                                        }])
                                    } else {
                                        return this.unsupported(prop, "object literal property")
                                    }
                                })(),
                            }
                        }),
                    }])
                } else if (ts.isNoSubstitutionTemplateLiteral(e)) {
                    return supported(["NoSubstitutionTemplateLiteral", {
                        text: e.text,
                    }])
                } else if (e.kind === ts.SyntaxKind.NullKeyword) {
                    return supported(["NullKeyword", {
                    }])
                } else if (ts.isStringLiteral(e)) {
                    return supported(["StringLiteral", {
                        text: e.text,
                    }])
                } else if (ts.isTemplateExpression(e)) {
                    return supported(["TemplateExpression", {
                        head: e.head.text,
                        templateSpans: e.templateSpans.map(tspan => {
                            return {
                                expression: this.processExpression(tspan.expression),
                                text: tspan.literal.text,
                            }
                        }),
                    }])
                } else if (e.kind === ts.SyntaxKind.ThisKeyword) {
                    return supported(["This", {
                    }])
                } else {
                    return this.unsupported<ExpressionKind>(e, "expression")
                }
            })(),
        }
    }
    private processBindingName(bindingName: ts.BindingName): BindingName {
        return {
            kind: ((): PossiblyUnsupported<BindingNameKind> => {
                if (ts.isIdentifier(bindingName)) {
                    return supported(["Identifier", { text: bindingName.text }])
                } else {
                    return this.unsupported(bindingName, "variable name")
                }
            })(),
        }
    }
    private processStatements(statements: ts.NodeArray<ts.Statement>): Array<Statement> {
        return statements.map<Statement>(statement => {
            return {
                kind: ((): PossiblyUnsupported<StatementKind> => {
                    if (ts.isBreakStatement(statement)) {
                        return supported(["BreakStatement", {
                        }])
                    } else if (ts.isExpressionStatement(statement)) {
                        this.reporter.reportFailure(statement, "expression statements should not be used")
                        return supported(["ExpressionStatement", {
                            expression: this.processExpression(statement.expression),
                        }])
                    } else if (ts.isReturnStatement(statement)) {
                        const result: PossiblyUnsupported<StatementKind> = supported(["ReturnStatement", {
                            expression: ((): Optional<Expression> => {
                                if (statement.expression === undefined) {
                                    return notSet()
                                } else {
                                    const exp = this.processExpression(statement.expression)
                                    return ["set", exp]
                                }
                            })(),
                        }])
                        return result
                    } else if (ts.isSwitchStatement(statement)) {
                        return supported(["SwitchStatement", {
                            expression: this.processExpression(statement.expression),
                            clauses: statement.caseBlock.clauses.map(clause => {
                                const resultClause: Clause = {
                                    kind: ((): ClauseKind => {
                                        if (ts.isCaseClause(clause)) {
                                            return ["CaseClause", {
                                                expression: this.processExpression(clause.expression),
                                                statements: this.processStatements(clause.statements),
                                            }]
                                        } else if (ts.isDefaultClause(clause)) {
                                            return ["DefaultClause", {
                                                statements: this.processStatements(clause.statements),
                                            }]
                                        } else {
                                            throw new Error("Unexpected clause: " + getKindName(clause))
                                        }
                                    })(),
                                }
                                return resultClause
                            }),
                        }])
                    } else if (ts.isVariableStatement(statement)) {
                        return supported(["VariableStatement", {
                            declarations: statement.declarationList.declarations.map<VariableStatementDeclaration>(decl => {
                                return {
                                    name: this.processBindingName(decl.name),
                                    type: decl.type === undefined ? notSet() : set(this.processTypeNode(decl.type)),
                                    initializer: decl.initializer === undefined ? this.missing(decl, "missing initializer") : present(this.processExpression(decl.initializer)),
                                }
                            }),
                        }])
                    } else {
                        return this.unsupported(statement, "statement")
                    }
                })(),
            }
        })
    }
    private missing<T>(node: ts.Node, message: string): PossiblyMissing<T> {
        this.reporter.reportFailure(node, message)
        return ["missing"]
    }
    private unsupported<T>(node: ts.Node, typeDescription: string): PossiblyUnsupported<T> {
        this.reporter.reportFailure(node, `unsupported ${typeDescription} kind: ${getKindName(node)}`)
        return ["unsupported"]
    }
}

export function buildSourceFile(reporter: IReporter, sourceFile: ts.SourceFile) {
    const builder = new SourceFileBuilder(reporter)
    return builder.processSourceFile(sourceFile)
}
