// tslint:disable: array-type max-classes-per-file no-shadowed-variable one-variable-per-declaration
import * as ts from "typescript"
import {
    assertDefined,
    assertUnreachable,
    convertPossiblyNull,
    IInArray,
    Maybe,
    MyArray,
    notSet,
    Optional,
    set,
    sideEffect,
    undefinedToNull,
    wrapArray,
    wrapPossiblyUndefined,
} from "./states"
import {
    Block,
    CallSignature,
    ClassMember,
    Condition,
    Expression,
    ExpressionKind,
    FunctionSignature,
    GenericType,
    Parameter,
    PlainOldDataTypeNode,
    SourceFile,
    Statement,
    TypeNodeKind,
} from "./typeSystem"
import * as u from "./utils"

export interface IReporter {
    reportFailure(p: {
        readonly node: ts.Node,
        readonly message: string
    }): void
}

function supported<T>(t: T): Maybe<T> {
    return new Optional(t)
}

class SourceFileBuilder {
    private readonly reporter: IReporter
    private readonly tapi: u.ITypescriptAPI
    constructor(p: { reporter: IReporter, tapi: u.ITypescriptAPI }) {
        this.reporter = p.reporter
        this.tapi = p.tapi
    }
    public processSourceFile(sf: ts.SourceFile): SourceFile {
        // sourceFile.referencedFiles.forEach(rf => {
        //     console.log(">f>" + rf.fileName)
        // })
        // sourceFile.amdDependencies.forEach(amd => {
        //     console.log(">amd>" + amd.name + " " + amd.path)
        // })
        const knownStatements = wrapArray(sf.statements).filter(statement1 => {
            const statement = this.tapi.castRootStatement(statement1)
            if (statement === null) {
                sideEffect(() => {
                    return this.unsupported({ node: statement1, typeDescription: "root statement" })
                })
                return null
            } else {
                return statement
            }
        })
        return {
            importDeclarations: knownStatements.filterDep(ks => {
                if (ks[0] !== "ImportDeclaration") {
                    return notSet({})
                } else {
                    const $ = ks[1]
                    const
                        moduleSpecifier = $.moduleSpecifier,
                        importClause = undefinedToNull($.importClause)
                    if (importClause === null) {
                        return notSet({})
                    } else {
                        const stringLiteral = this.tapi.castToStringLiteral(moduleSpecifier)
                        if (stringLiteral === null) {
                            sideEffect(() => {
                                return this.unsupported({ node: $.moduleSpecifier, typeDescription: "module specifier" })
                            })
                            return notSet({})
                        } else {
                            return set({
                                importClause: {
                                    name: wrapPossiblyUndefined(importClause.name).mapOptional(name => set(this.processIdentifier(name))),
                                    namedBindings: wrapPossiblyUndefined(importClause.namedBindings).mapOptional(_namedBindings => {
                                        return set({
                                            fixme: "X",
                                        })
                                    }),
                                },
                                moduleSpecifier: stringLiteral.text,
                            })
                        }

                    }

                }
            }),
            typeAliasDeclarations: knownStatements.filterDep(ks => {
                if (ks[0] !== "TypeAliasDeclaration") {
                    return notSet({})
                } else {
                    const $ = ks[1]
                    const typeNode = this.processPlainOldDataTypeNode($.type)
                    if (typeNode === null) {
                        return notSet({})
                    } else {
                        return set({
                            name: $.name.text,
                            // typeParameters: wrapPossiblyUndefined(tad.typeParameters).rework({
                            //     onNotExist: () => [],
                            //     onExists: typeParameters => filter({
                            //         array: typeParameters,
                            //         callback: tp => {
                            //             return this.unsupported({ node: tp, typeDescription: "type parameter declaration" })
                            //         },
                            //     }),
                            // }),
                            type: typeNode,
                        })

                    }
                }
            }),
            interfaceDeclarations: knownStatements.filterDep(ks => {
                if (ks[0] !== "InterfaceDeclaration") {
                    return notSet({})
                } else {
                    const $ = ks[1]
                    return wrapPossiblyUndefined($.typeParameters).rework({
                        onNotExist: () => {
                            return wrapPossiblyUndefined($.heritageClauses).rework({
                                onNotExist: () => {
                                    return set({
                                        members: wrapArray($.members).filterDep(m => {
                                            const methodSignature = this.tapi.castToMethodSignature(m)
                                            if (methodSignature === null) {
                                                sideEffect(() => {
                                                    return this.unsupported({ node: m, typeDescription: "interface declaration" })
                                                })
                                                return notSet({})
                                            } else {
                                                const functionSignature = this.processFunctionSignature({ sdb: methodSignature, propertyName: methodSignature.name })
                                                if (functionSignature === null) {
                                                    return notSet({})
                                                } else {
                                                    return set({
                                                        signature: functionSignature,
                                                    })

                                                }
                                            }
                                        }),
                                    })
                                },
                                onExists: heritageClauses => {
                                    sideEffect(() => {
                                        return heritageClauses.forEach(hc => this.unsupported({ node: hc, typeDescription: "heritage clause" }))
                                    })
                                    return notSet({})
                                },
                            })
                        },
                        onExists: typeParameters => {
                            sideEffect(() => {
                                return typeParameters.forEach(tp => this.unsupported({ node: tp, typeDescription: "type parameter" }))
                            })
                            return notSet({})
                        },
                    })
                }
            }),
            classDeclarations: knownStatements.filterDep(ks => {
                if (ks[0] !== "ClassDeclaration") {
                    return notSet({})
                } else {
                    const $ = ks[1]
                    return wrapPossiblyUndefined($.typeParameters).rework({
                        onNotExist: () => {
                            // cd.members.reduce((constructorFound, member) => {
                            //     if (this.tapi.isConstructorDeclaration(member)) {
                            //         return true
                            //     } else {
                            //         if (this.tapi.isPropertyDeclaration(member)) {
                            //             if (constructorFound === true) {
                            //                 return this.reporter.re
                            //             }
                            //         }
                            //         return constructorFound
                            //     }
                            // }, false)
                            return wrapPossiblyUndefined($.name).rework({
                                onNotExist: () => {
                                    sideEffect(() => {
                                        return this.missing({ node: $, typeDescription: "name" })
                                    })
                                    return notSet({})
                                },
                                onExists: name => {
                                    return set({
                                        name: name.text,
                                        members: wrapArray($.members).filterDep(m => {
                                            return ((_p: {}): Maybe<ClassMember> => {
                                                return this.tapi.castClassMemberKind(m).rework({
                                                    onNotExist: () => {
                                                        sideEffect(() => {
                                                            return this.unsupported({ node: $, typeDescription: "class member" })
                                                        })
                                                        return notSet({})
                                                    },
                                                    onExists: classMember => {
                                                        switch (classMember[0]) {
                                                            case "ConstructorDeclaration": {
                                                                // sideEffect(() => {
                                                                //     // parameters: m.parameters.map(p => {
                                                                //     //     return {
                                                                //     //         name: this.processBindingName(p.name),
                                                                //     //         type: ((): PossiblyMissing<TypeNode> => {
                                                                //     //             if (p.type === undefined) {
                                                                //     //                 return this.missing({ node: p, typeDescription: "missing parameter type" })
                                                                //     //             } else {
                                                                //     //                 return present(this.processTypeNode(p.type))
                                                                //     //             }
                                                                //     //         })(),
                                                                //     //     }
                                                                //     // }),
                                                                //     // body: ((): PossiblyMissing<ConstructorBlock> => {
                                                                //     //     if (m.body === undefined) {
                                                                //     //         return this.missing({ node: m, typeDescription: "missing body" })
                                                                //     //     } else {
                                                                //     //         return present({
                                                                //     //             statements: m.body.statements.map(s => {
                                                                //     //                 return {
                                                                //     //  kind: this.unsupported({ node: s, typeDescription: "constructor body statements" }),
                                                                //     //                 }
                                                                //     //             }),
                                                                //     //         })
                                                                //     //     }
                                                                //     // })(),
                                                                //     //}],

                                                                // })
                                                                return notSet({})
                                                            }
                                                            case "MethodDeclaration": {
                                                                const $ = classMember[1]
                                                                return wrapPossiblyUndefined($.body).rework({
                                                                    onNotExist: () => {
                                                                        sideEffect(() => {
                                                                            return this.missing({ node: m, typeDescription: "body" })
                                                                        })
                                                                        return notSet({})
                                                                    },
                                                                    onExists: body => {
                                                                        const
                                                                            block = this.processBlock({
                                                                                block: body,
                                                                                typeNode: wrapPossiblyUndefined($.type),
                                                                            }),
                                                                            functionSignature = this.processFunctionSignature({ sdb: $, propertyName: $.name })
                                                                        if (block === null || functionSignature === null) {
                                                                            return notSet({})
                                                                        } else {
                                                                            return set({
                                                                                kind: ["MethodDeclaration", {
                                                                                    signature: functionSignature,
                                                                                    body: block,
                                                                                }],
                                                                            })

                                                                        }
                                                                    },
                                                                })

                                                            }
                                                            case "PropertyDeclaration": {
                                                                const $ = classMember[1]
                                                                return wrapPossiblyUndefined($.type).rework({
                                                                    onNotExist: () => {
                                                                        sideEffect(() => {
                                                                            return this.missing({ node: m, typeDescription: "type" })
                                                                        })
                                                                        return notSet({})
                                                                    },
                                                                    onExists: type1 => {
                                                                        const
                                                                            typeNode = this.processPlainOldDataTypeNode(type1),
                                                                            propertyName = this.processPropertyName($.name),
                                                                            optionalExpression = this.processOptionalExpression(
                                                                                wrapPossiblyUndefined($.initializer)
                                                                            )
                                                                        if (typeNode === null || propertyName === null || optionalExpression === null) {
                                                                            return notSet({})
                                                                        } else {
                                                                            return set({
                                                                                kind: ["PropertyDeclaration", {
                                                                                    name: propertyName,
                                                                                    type: typeNode,
                                                                                    initializer: optionalExpression,
                                                                                }],
                                                                            })
                                                                        }
                                                                    },
                                                                })

                                                            }
                                                            default:
                                                                return assertUnreachable(classMember[0])
                                                        }

                                                    },
                                                })
                                            })({})
                                        }),
                                    })
                                },
                            })
                        },
                        onExists: typeParameters => {
                            sideEffect(() => {
                                return typeParameters.forEach(tp => this.unsupported({ node: tp, typeDescription: "type parameters are not supported" }))
                            })
                            return notSet({})
                        },
                    })
                }
            }),
            functionDeclarations: knownStatements.filterDep(ks => {
                if (ks[0] !== "FunctionDeclaration") {
                    return notSet({})
                } else {
                    const $ = ks[1]
                    return wrapPossiblyUndefined($.name).rework({
                        onNotExist: () => {
                            sideEffect(() => {
                                return this.missing({ node: $, typeDescription: "name" })
                            })
                            return notSet({})
                        },
                        onExists: name => {
                            return wrapPossiblyUndefined($.body).rework({
                                onNotExist: () => {
                                    sideEffect(() => {
                                        return this.missing({ node: $, typeDescription: "body" })
                                    })
                                    return notSet({})
                                },
                                onExists: body => {
                                    const
                                        block = this.processBlock({ block: body, typeNode: wrapPossiblyUndefined($.type) }),
                                        functionSignature = this.processFunctionSignature({ sdb: $, propertyName: name })
                                    if (block === null || functionSignature === null) {
                                        return notSet({})
                                    } else {
                                        return set({
                                            signature: functionSignature,
                                            body: block,
                                        })
                                    }
                                },
                            })
                        },
                    })
                }
            }),
        }
    }
    private processBlock(p: {
        readonly block: ts.Block,
        readonly typeNode: Maybe<ts.TypeNode>
    }): null | Block {
        return this.processStatementsIntoBlock({ statements: this.tapi.splitStatements(p.block.statements), context: p.block, typeNode: p.typeNode }).rework({
            onNotExist: () => null,
            onExists: v => v,
        })
    }
    private processIdentifier(i: ts.Identifier): string {
        return i.text
    }
    private processParameters(p: {
        readonly sdb: ts.SignatureDeclarationBase
    }): null | Parameter {
        return wrapArray(p.sdb.parameters).onElementAmount({
            onZero: () => {
                sideEffect(() => {
                    return this.missing({ node: p.sdb, typeDescription: "parameter" })
                })
                return null
            },
            onOne: p2 => {
                sideEffect(() => {
                    return assertDefined({
                        value: p2.type,
                        onError: () => {
                            return this.missing({ node: p2, typeDescription: "type" })
                        },
                    })
                })
                const type = undefinedToNull(p2.type)
                if (type === null) {
                    return null
                } else {
                    return this.processParameter(type)
                }
            },
            onMultiple: parameters => {
                sideEffect(() => {
                    return parameters.allButFirst({}).forEach(param => {
                        return this.superfluous({ node: param, typeDescription: "parameter" })
                    })
                })
                return null
            },
        })
    }
    private processFunctionSignature(p: {
        readonly sdb: ts.SignatureDeclarationBase,
        readonly propertyName: ts.PropertyName
    }): null | FunctionSignature {
        const propertyName = this.processPropertyName(p.propertyName)
        if (propertyName === null) {
            return null
        } else {
            const parameter = this.processParameters({ sdb: p.sdb })
            if (parameter === null) {
                return null
            } else {
                return ({
                    name: propertyName,
                    parameter: parameter,
                })
            }
        }
    }
    private processPropertyName(pn: ts.PropertyName): null | string {
        return this.tapi.castPropertyKind(pn).rework({
            onNotExist: () => {
                sideEffect(() => {
                    return this.unsupported({ node: pn, typeDescription: "property name" })
                })
                return null
            },
            onExists: value => {
                switch (value[0]) {
                    case "Identifier": {
                        return value[1].text
                    }
                    case "StringLiteral": {
                        return value[1].text
                    }
                }
            },
        })
    }
    private processOptionalExpression(e: Maybe<ts.Expression>): null | Maybe<Expression> {
        return e.rework({
            onNotExist: () => null,
            onExists: value => {
                return this.processExpressionKind(value).rework({
                    onNotExist: () => null,
                    onExists: ek => set({
                        kind: ek,
                    }),
                })
            },
        })
    }
    private processExpression(e: ts.Expression): null | Expression {
        return this.processExpressionKind(e).rework({
            onNotExist: () => null,
            onExists: kind => ({
                kind: kind,
            }),
        })
    }
    private processExpressionKind(e1: ts.Expression): Maybe<ExpressionKind> {
        return this.tapi.castExpression(e1).rework({
            onNotExist: () => {
                sideEffect(() => {
                    return this.unsupported({ node: e1, typeDescription: "expression" })
                })
                return notSet({})
            },
            onExists: value => {
                switch (value[0]) {
                    case "ArrayLiteralExpression": {
                        const $ = value[1]
                        return supported(["ArrayLiteralExpression", {
                            elements: wrapArray($.elements).filterDep(element => {
                                const expression = this.processExpression(element)
                                if (expression === null) {
                                    return notSet({})
                                } else {
                                    return set(expression)
                                }
                            }),
                        }])
                    }
                    case "ArrowFunction": {
                        const $ = value[1]
                        //tslint:disable-next-line: pareto
                        if (this.tapi.isExpression($.body)) {
                            //tslint:disable-next-line: pareto
                            const expression = this.processExpression($.body)
                            if (expression === null) {
                                return notSet({})
                            } else {
                                return set(["ArrowFunction", {
                                    body: {
                                        kind: ["Block", {
                                            block: {
                                                variables: [],
                                                sideEffects: [],
                                                statement: {
                                                    kind: ["ReturnStatement", {
                                                        expression: expression,
                                                    }],
                                                },
                                            },
                                        }],
                                    },
                                }])
                            }
                        } else {
                            const block2 = this.tapi.castToBlock($.body)
                            if (block2 === null) {
                                sideEffect(() => {
                                    return this.unsupported({ node: $.body, typeDescription: "arrow function body" })
                                })
                                return notSet({})
                            } else {
                                const block = this.processBlock({ block: block2, typeNode: notSet({}) })
                                if (block === null) {
                                    return notSet({})
                                } else {
                                    return set(["ArrowFunction", {
                                        body: {
                                            kind: ["Block", {
                                                block: block,
                                            }],
                                        },
                                    }])
                                }
                            }
                        }
                    }
                    case "CallExpression": {
                        const $ = value[1]
                        const
                            callSignature = this.processCallSignature({
                                typeArguments: wrapPossiblyUndefined($.typeArguments),
                                args: wrapArray($.arguments),
                                contextNode: $,
                            }),
                            expression = this.processExpression($.expression)
                        if (callSignature === null || expression === null) {
                            return notSet({})
                        } else {
                            return supported(["CallExpression", {
                                expression: expression,
                                callSignature: callSignature,
                            }])
                        }
                    }
                    case "ElementAccessExpression": {
                        const $ = value[1]
                        const
                            expression = this.processExpression($.expression),
                            argumentExpression = this.tapi.castToNumericalLiteral($.argumentExpression)
                        if (expression === null || argumentExpression === null) {
                            //tslint:disable-next-line: pareto
                            if (argumentExpression === null) {
                                sideEffect(() => {
                                    return this.reporter.reportFailure({ node: $.argumentExpression, message: "Not a number (0 or 1)" })
                                })
                            }
                            return notSet({})
                        } else {
                            return set(["ElementAccessExpression", {
                                expression: expression,
                                index: ["One", {}],
                            }])
                        }
                    }
                    case "FalseKeyword": {
                        return supported(["FalseKeyword", {
                        }])
                    }
                    case "Identifier": {
                        const $ = value[1]
                        return supported(["Identifier", {
                            text: $.text,
                        }])
                    }
                    case "NewExpression": {
                        const $ = value[1]
                        const
                            exp = this.tapi.castToIdentifier($.expression),
                            callSignature = this.processCallSignature({
                                typeArguments: wrapPossiblyUndefined($.typeArguments),
                                //tslint:disable-next-line: pareto
                                args: convertPossiblyNull(undefinedToNull($.arguments), args => wrapArray(args)),
                                contextNode: $,
                            })
                        if (exp === null || callSignature === null) {
                            sideEffect(() => {
                                //tslint:disable-next-line: pareto
                                if (exp === null) {
                                    this.unsupported({ node: $.expression, typeDescription: "class specifier" })
                                }

                            })
                            return notSet({})
                        } else {
                            return supported(["NewExpression", {
                                className: exp.text,
                                callSignature: callSignature,
                            }])
                        }
                    }
                    case "NoSubstitutionTemplateLiteral": {
                        const $ = value[1]
                        return supported(["NoSubstitutionTemplateLiteral", {
                            text: $.text,
                        }])
                    }
                    case "NullKeyword": {
                        return supported(["NullKeyword", {
                        }])
                    }
                    case "NumericLiteral": {
                        const $ = value[1]
                        const numLit = this.tapi.castNumericLiteral($)
                        if (numLit === null) {
                            sideEffect(() => {
                                return this.reporter.reportFailure({ node: $, message: "magic numbers are not alllowed (only 0 and 1" })
                            })
                            return notSet({})
                        } else {
                            switch (numLit[0]) {
                                case "One": {
                                    return supported(["OneKeyword", {}])
                                }
                                case "Zero": {
                                    return supported(["ZeroKeyword", {}])
                                }
                                default: return assertUnreachable(numLit[0])
                            }
                        }
                    }
                    case "ObjectLiteralExpression": {
                        const $ = value[1]
                        return supported(["ObjectLiteralExpression", {
                            properties: wrapArray($.properties).filterDep(prop => {
                                return wrapPossiblyUndefined(prop.name).rework({
                                    onNotExist: () => {
                                        sideEffect(() => {
                                            return this.missing({ node: prop, typeDescription: "name" })
                                        })
                                        return notSet({})
                                    },
                                    onExists: name => {

                                        const propertyName = this.processPropertyName(name)
                                        if (propertyName === null) {
                                            return notSet({})
                                        } else {
                                            const propertyAssignment = this.tapi.castToPropertyAssignment(prop)
                                            if (propertyAssignment === null) {
                                                sideEffect(() => {
                                                    return this.unsupported({ node: prop, typeDescription: "object literal property" })
                                                })
                                                return notSet({})
                                            } else {
                                                const initializer = this.processExpression(propertyAssignment.initializer)
                                                if (initializer === null) {
                                                    return notSet({})
                                                } else {
                                                    return set({
                                                        kind: ["PropertyAssignment", {
                                                            name: propertyName,
                                                            initializer: initializer,
                                                        }],
                                                    })
                                                }
                                            }
                                        }
                                    },
                                })
                            }),
                        }])
                    }
                    case "ParenthesizedExpression": {
                        const $ = value[1]
                        //no reason to keep this one
                        return this.processExpressionKind($.expression)
                    }
                    case "PropertyAccessExpression": {
                        const $ = value[1]
                        const expression = this.processExpression($.expression)
                        if (expression === null) {
                            return notSet({})
                        } else {
                            return supported(["PropertyAccessExpression", {
                                name: $.name.text,
                                expression: expression,
                            }])
                        }
                    }
                    case "StringLiteral": {
                        const $ = value[1]
                        return supported(["StringLiteral", {
                            text: $.text,
                        }])
                    }
                    case "TemplateExpression": {
                        const $ = value[1]
                        return supported(["TemplateExpression", {
                            head: $.head.text,
                            templateSpans: wrapArray($.templateSpans).filterDep(tspan => {
                                const expr = this.processExpression(tspan.expression)
                                if (expr === null) {
                                    return notSet({})
                                } else {
                                    return set({
                                        expression: expr,
                                        text: tspan.literal.text,
                                    })
                                }
                            }),
                        }])
                    }
                    case "ThisKeyword": {
                        return supported(["This", {
                        }])
                    }
                    case "TrueKeyword": {
                        return supported(["TrueKeyword", {
                        }])
                    }
                    default: return assertUnreachable(value[0])
                }
            },
        })
    }
    private processIfExpression(e: ts.Expression): MyArray<Condition> {
        return wrapArray(this.tapi.getOrElements(e)).filter(expression => {
            switch (expression[0]) {
                case "NullCheck":
                    return {
                        kind: ["NullCheck", {}],
                    }
                case "StateCheck":
                    return {
                        kind: ["StateCheck", {}],
                    }
                case "Unknown":
                    const $ = expression[1]
                    sideEffect(() => {
                        return this.unsupported({ node: $, typeDescription: "condition" })
                    })
                    return null
                default: return assertUnreachable(expression[0])

            }
        })
    }
    private processCallSignature(p: {
        readonly typeArguments: Maybe<ts.NodeArray<ts.TypeNode>>,
        readonly args: null | MyArray<ts.Expression>,
        readonly contextNode: ts.Node
    }): null | CallSignature {
        if (p.args === null) {
            sideEffect(() => {
                return this.missing({ node: p.contextNode, typeDescription: "argument" })
            })
            return null
        } else {
            return p.args.onElementAmount({
                onZero: () => {
                    sideEffect(() => {
                        return this.missing({ node: p.contextNode, typeDescription: "argument" })
                    })
                    return null
                },
                onOne: arg => {
                    const argumentExpression = this.processExpression(arg)
                    if (argumentExpression === null) {
                        return null
                    } else {
                        return {
                            typeArguments: ((_p: {}): IInArray<Parameter> => {
                                return p.typeArguments.rework({
                                    onNotExist: () => new MyArray([]),
                                    onExists: typeArguments2 => {
                                        return wrapArray(typeArguments2).filterDep(ta => {
                                            sideEffect(() => {
                                                return this.unsupported({ node: ta, typeDescription: "type arguments" })
                                            })
                                            const parameter = this.processParameter(ta)
                                            if (parameter === null) {
                                                return notSet({})
                                            } else {
                                                return set(parameter)
                                            }
                                        })
                                    },
                                })
                            })({}),
                            argument: argumentExpression,
                        }
                    }
                },
                onMultiple: args2 => {
                    sideEffect(() => {
                        return args2.allButFirst({}).forEach(a => {
                            return this.superfluous({ node: a, typeDescription: "argument" })
                        })
                    })
                    return null
                },
            })


        }
    }
    private processOptionalTypeNode(tn: Maybe<ts.TypeNode>): null | Optional<PlainOldDataTypeNode> {
        return tn.rework({
            onNotExist: () => notSet({}),
            onExists: value => {
                const typeNode = this.processPlainOldDataTypeNode(value)
                if (typeNode === null) {
                    return null
                } else {
                    return set(typeNode)
                }
            },
        })
    }
    private processPlainOldDataTypeNode(tn: ts.TypeNode): null | PlainOldDataTypeNode {
        const tnk = this.processPlainOldDataTypeNodeKind(tn)
        if (tnk === null) {
            return null
        } else {
            return {
                kind: tnk,
            }
        }
    }
    private processParameter(tn: ts.TypeNode): null | Parameter {
        const functionTypeNode = this.tapi.castToFunctionTypeNode(tn)
        if (functionTypeNode === null) {
            const typeNode = this.processPlainOldDataTypeNode(tn)
            if (typeNode === null) {
                return null
            } else {
                return {
                    kind: ["PlainOldData", typeNode],
                }
            }
        } else {
            const parameter = this.processParameters({
                sdb: functionTypeNode,
            })
            if (parameter === null) {
                return null
            } else {
                return {
                    kind: ["Function", {
                        parameter: parameter,
                    }],
                }
            }
        }
    }
    private processPlainOldDataTypeNodeKind(tn1: ts.TypeNode): null | TypeNodeKind {
        return this.tapi.castPlainOldDataTypeNode(tn1).rework({
            onExists: value => {
                return ((_p: {}): null | TypeNodeKind => {
                    switch (value[0]) {
                        case "BooleanKeyword": {
                            return ["Boolean", {}]
                        }
                        case "NumberKeyword": {
                            return ["Number", {}]
                        }
                        case "Optional": {
                            const $ = value[1]
                            const typeNode = this.processPlainOldDataTypeNode($)
                            if (typeNode === null) {
                                return null
                            } else {
                                return ["Optional", {
                                    type: typeNode,
                                }]
                            }
                        }
                        case "StringKeyword": {
                            return ["String", {}]
                        }
                        case "TupleType": {
                            const $ = value[1]
                            return ["Tuple", {
                                elementTypes: wrapArray($.elementTypes).filterDep(et => {
                                    const typeNode = this.processPlainOldDataTypeNode(et)
                                    if (typeNode === null) {
                                        return notSet({})
                                    } else {
                                        return set(typeNode)
                                    }
                                }),
                            }]
                        }
                        case "TypeLiteral": {
                            const $ = value[1]
                            return ["TypeLiteral", {
                                members: wrapArray($.members).filterDep(m => {
                                    const propertySignature = this.tapi.castToPropertySignature(m)
                                    if (propertySignature === null) {
                                        sideEffect(() => {
                                            return this.unsupported({ node: m, typeDescription: "type literal member" })
                                        })
                                        return notSet({})
                                    } else {
                                        sideEffect(() => {
                                            return this.tapi.validateModifiers({
                                                modifiers: m.modifiers,
                                                missingReadonly: () => this.missing({ node: propertySignature, typeDescription: "readonly keyword" }),
                                                unsupported: modifier => this.unsupported({ node: modifier, typeDescription: "modifier" }),
                                            })
                                        })
                                        const propertyName = this.processPropertyName(propertySignature.name)
                                        if (propertyName === null) {
                                            return notSet({})
                                        } else {
                                            return wrapPossiblyUndefined(propertySignature.type).rework({
                                                onNotExist: () => {
                                                    sideEffect(() => {
                                                        return this.missing({
                                                            node: m,
                                                            typeDescription: "type",
                                                        })
                                                    })
                                                    return notSet({})
                                                },
                                                onExists: type => {
                                                    const typeNode = this.processPlainOldDataTypeNode(type)
                                                    if (typeNode === null) {
                                                        return notSet({})
                                                    } else {
                                                        return set({
                                                            name: propertyName,
                                                            type: typeNode,
                                                        })
                                                    }
                                                },
                                            })
                                        }
                                    }
                                }),
                            }]
                        }
                        case "TypeReference": {
                            const $ = value[1]
                            const identifier = this.tapi.castToIdentifier($.typeName)
                            if (identifier === null) {
                                const typeName = this.tapi.castToQualifiedName($.typeName)
                                if (typeName === null) {
                                    sideEffect(() => {
                                        return this.unsupported({ node: $.typeName, typeDescription: "type reference" })
                                    })
                                    return null
                                } else {
                                    const left = typeName.left
                                    const identifier = this.tapi.castToIdentifier(left)
                                    if (identifier === null) {
                                        sideEffect(() => {
                                            return this.unsupported({ node: typeName.left, typeDescription: "first type reference step" })
                                        })
                                        return null
                                    } else {
                                        const typeArguments = undefinedToNull($.typeArguments)
                                        if (typeArguments === null) {
                                            return ["TypeReference", {
                                                kind: ["remote", {
                                                    moduleName: identifier.text,
                                                }],
                                                id: typeName.right.text,
                                            }]
                                        } else {
                                            const type = ((_p: {}): null | GenericType => {
                                                switch (identifier.text) {
                                                    case "IInArray": return ["Array", {}]
                                                    case "Optional": return ["Optional", {}]
                                                    default: return null
                                                }
                                            })({})
                                            if (type === null) {
                                                sideEffect(() => {
                                                    return this.reporter.reportFailure({ node: identifier, message: `unsupported generic type ${identifier.text}` })
                                                })
                                                return null
                                            } else {
                                                return ["TypeReference", {
                                                    kind: ["generic", {
                                                        type: type,
                                                        typeArguments: wrapArray(typeArguments).filter(ta => {
                                                            return this.processPlainOldDataTypeNode(ta)
                                                        }),
                                                    }],
                                                    id: typeName.right.text,
                                                }]
                                            }
                                        }
                                    }
                                }
                            } else {
                                return ["TypeReference", {
                                    kind: ["local", {}],
                                    id: identifier.text,
                                }]
                            }
                        }
                        case "UnionType": {
                            const $ = value[1]
                            return ["TaggedUnion", {
                                alternatives: wrapArray($.types).filterDep(t => {
                                    const tupleType = this.tapi.castToTupleTypeNode(t)
                                    if (tupleType === null) {
                                        sideEffect(() => {
                                            return this.unsupported({ node: t, typeDescription: "tagged union type alternative" })
                                        })
                                        return notSet({})
                                    } else {
                                        return this.tapi.getPair(tupleType.elementTypes).rework({
                                            onNotExist: () => {
                                                sideEffect(() => {
                                                    return this.reporter.reportFailure({ node: t, message: "expected 2 elements: [string, Type]" })
                                                })
                                                return notSet({})
                                            },
                                            onExists: elementTypes => {
                                                const first = elementTypes.first
                                                const literalTypeNode = this.tapi.castToLiteralTypeNode(first)
                                                if (literalTypeNode === null) {
                                                    sideEffect(() => {
                                                        return this.unsupported({ node: elementTypes.first, typeDescription: "tagged union type alternative name" })
                                                    })
                                                    return notSet({})
                                                } else {
                                                    const nnLiteral = this.tapi.castToLiteralExpression(literalTypeNode.literal)
                                                    if (nnLiteral === null) {
                                                        sideEffect(() => {
                                                            return this.unsupported({
                                                                node: literalTypeNode.literal,
                                                                typeDescription: "tagged union type alternative name",
                                                            })
                                                        })
                                                        return notSet({})
                                                    } else {
                                                        const typeNode = this.processPlainOldDataTypeNode(elementTypes.second)
                                                        if (typeNode === null) {
                                                            return notSet({})
                                                        } else {
                                                            return set({
                                                                name: nnLiteral.text,
                                                                type: typeNode,
                                                            })

                                                        }
                                                    }

                                                }

                                            },
                                        })
                                    }
                                }),
                            }]
                        }
                        default: return assertUnreachable(value[0])
                    }

                })({})
            },
            onNotExist: () => {
                sideEffect(() => {
                    return this.unsupported({ node: tn1, typeDescription: "type node" })
                })
                return null
            },
        })
    }
    private processBindingName(bindingName: ts.BindingName): null | string {
        const identifier = this.tapi.castToIdentifier(bindingName)
        if (identifier === null) {
            sideEffect(() => {
                return this.unsupported({ node: bindingName, typeDescription: "variable name" })
            })
            return null
        } else {
            return identifier.text
        }
    }
    private processStatement(p: {
        readonly statement: u.StatementKind,
        readonly typeNode: Maybe<ts.TypeNode>
    }): Maybe<Statement> {
        switch (p.statement[0]) {
            case "IfStatement": {
                const $ = p.statement[1]
                return wrapPossiblyUndefined($.elseStatement).rework({
                    onNotExist: () => {
                        sideEffect(() => {
                            return this.missing({ node: $, typeDescription: "else" })
                        })
                        return notSet({})
                    },
                    onExists: elseStatement => {
                        const thenBlock1 = this.tapi.castToBlock($.thenStatement)
                        if (thenBlock1 === null) {
                            sideEffect(() => {
                                return this.unsupported({ node: $.thenStatement, typeDescription: "then statement" })
                            })
                            return notSet({})
                        } else {
                            const elseBlock1 = this.tapi.castToBlock(elseStatement)
                            if (elseBlock1 === null) {
                                sideEffect(() => {
                                    return this.unsupported({ node: elseStatement, typeDescription: "else statement" })
                                })
                                return notSet({})
                            } else {
                                const
                                    thenBlock = this.processBlock({ block: thenBlock1, typeNode: p.typeNode }),
                                    elseBlock = this.processBlock({ block: elseBlock1, typeNode: p.typeNode })
                                if (thenBlock === null || elseBlock === null) {
                                    return notSet({})
                                } else {
                                    return set({
                                        kind: ["IfStatement", {
                                            conditions: this.processIfExpression($.expression),
                                            thenBlock: thenBlock,
                                            elseBlock: elseBlock,
                                        }],
                                    })
                                }
                            }
                        }
                    },
                })
            }
            case "ReturnStatement": {
                const $ = p.statement[1]
                const expression = undefinedToNull($.expression)
                if (expression === null) {
                    sideEffect(() => {
                        return this.missing({ node: $, typeDescription: "expression" })
                    })
                    return notSet({})
                } else {
                    const exp = this.processExpression(expression)
                    if (exp === null) {
                        return notSet({})
                    } else {
                        return set({
                            kind: ["ReturnStatement", {
                                expression: exp,
                            }],
                        })
                    }
                }
            }
            case "SwitchStatement": {
                const $ = p.statement[1]
                // sideEffect((): void => {
                //     return p.typeNode.rework<void>({
                //         onExists: () => { return void },
                //         onNotExist: () => this.reporter.reportFailure({ node: statement, message: "missing type nde" }),
                //     })
                // }).map(() => {
                const elementAccessExpression = this.tapi.castToElementAccessExpression($.expression)
                if (elementAccessExpression === null) {
                    return notSet({})
                } else {
                    const
                        index = this.tapi.castToNumericalLiteral(elementAccessExpression.argumentExpression),
                        expression = this.processExpression(elementAccessExpression.expression)
                    if (index === null || expression === null) {
                        return notSet({})
                    } else {
                        //tslint:disable-next-line: pareto
                        if (index.text !== "0") {
                            this.reporter.reportFailure({ node: index, message: "unexpected value, expected 0" })
                        }
                        return set({
                            kind: ["SwitchStatement", {
                                expressionx: expression,
                                clauses: wrapArray($.caseBlock.clauses).filterDep(clause1 => {
                                    return this.tapi.castClause(clause1).rework({
                                        onNotExist: () => {
                                            sideEffect(() => {
                                                return this.unsupported({ node: clause1, typeDescription: "switch clause" })
                                            })
                                            return notSet({})
                                        },
                                        onExists: castClause => {
                                            switch (castClause[0]) {
                                                case "CaseClause": {
                                                    const $ = castClause[1]
                                                    const stringLiteral = this.tapi.castToStringLiteral($.expression)
                                                    if (stringLiteral === null) {
                                                        sideEffect(() => {
                                                            return this.unsupported({ node: $.expression, typeDescription: "case label" })
                                                        })
                                                        return notSet({})
                                                    } else {
                                                        return ((_p: {}): Optional<Block> => {
                                                            return wrapArray($.statements).onElementAmount({
                                                                onZero: () => {
                                                                    sideEffect(() => {
                                                                        return this.missing({ node: $, typeDescription: "clause statements" })
                                                                    })
                                                                    return notSet({})
                                                                },
                                                                onOne: clauseStatement => {
                                                                    const block1 = this.tapi.castToBlock(clauseStatement)
                                                                    if (block1 === null) {
                                                                        return this.processStatementsIntoBlock({
                                                                            statements: this.tapi.splitStatements($.statements),
                                                                            context: $,
                                                                            typeNode: p.typeNode,
                                                                        })
                                                                    } else {
                                                                        const block = this.processBlock({ block: block1, typeNode: p.typeNode })
                                                                        if (block === null) {
                                                                            return notSet({})
                                                                        } else {
                                                                            return set(block)
                                                                        }
                                                                    }
                                                                },
                                                                onMultiple: _multiple => {
                                                                    return this.processStatementsIntoBlock({ statements: this.tapi.splitStatements($.statements), context: $, typeNode: p.typeNode })
                                                                },
                                                            })
                                                        })({}).rework({
                                                            onNotExist: () => notSet({}),
                                                            onExists: blck => {
                                                                return set({
                                                                    label: stringLiteral.text,
                                                                    block: blck,
                                                                })
                                                            },
                                                        })
                                                    }
                                                }
                                                case "DefaultClause": {
                                                    // const $ = castClause[1]
                                                    // onElementAmount({
                                                    //     array: $.statements,
                                                    //     onZero: () => this.missing($, "assertUnreachable call"),
                                                    //     onOne: statement => this.unsupported(statement, "FIXME"),
                                                    //     onMultiple: statements => {}
                                                    // })
                                                    return notSet({})
                                                }
                                                default:
                                                    return assertUnreachable(castClause[0])
                                            }
                                        },
                                    })
                                }),
                            }],
                        })
                    }
                }
            }
            default:
                return assertUnreachable(p.statement[0])
        }
    }
    private processStatementsIntoBlock(p: {
        readonly statements: u.SplitStatements,
        readonly context: ts.Node,
        readonly typeNode: Maybe<ts.TypeNode>
    }): Maybe<Block> {
        sideEffect(() => {
            return p.statements.otherStatements.forEach(os => {
                return this.unsupported({ node: os, typeDescription: "statement" })
            })
        })
        return p.statements.endStatements.onElementAmount({
            onZero: () => {
                sideEffect(() => {
                    return this.missing({ node: p.context, typeDescription: "end statement" })
                })
                return notSet({})
            },
            onOne: statement => {
                return this.processStatement({ statement: statement, typeNode: p.typeNode }).rework({
                    onNotExist: () => notSet({}),
                    onExists: stmnt => {
                        return set({
                            variables: p.statements.variableStatements.flatten(x => {
                                sideEffect(() => {
                                    return this.tapi.validateNodeFlags({
                                        nodeFlags: x.declarationList.flags,
                                        missingConst: () => this.missing({
                                            node: x.declarationList,
                                            typeDescription: "const keyword",
                                        }),
                                        unsupported: otherFlags => this.reporter.reportFailure({ node: x.declarationList, message: `unsupported node flag(s): ${otherFlags}` }),
                                    })
                                })
                                return x.declarationList.declarations
                            }).filterDep(decl => {
                                sideEffect(() => {
                                    return assertDefined({ value: decl.initializer, onError: () => this.missing({ node: decl, typeDescription: "initializer" }) })
                                })
                                const
                                    bindingName = this.processBindingName(decl.name),
                                    optionalTypeNode = this.processOptionalTypeNode(wrapPossiblyUndefined(decl.type)),
                                    initializer = undefinedToNull(decl.initializer)
                                if (bindingName === null || optionalTypeNode === null || initializer === null) {
                                    return notSet({})
                                } else {
                                    const exp = this.processExpression(initializer)
                                    if (exp === null) {
                                        return notSet({})
                                    } else {
                                        return set({
                                            name: bindingName,
                                            type: optionalTypeNode,
                                            initializer: exp,
                                        })
                                    }
                                }
                            }),
                            sideEffects: p.statements.expressionStatements.filterDep(expressionStatement => {
                                const callExpression1 = this.tapi.castToCallExpression(expressionStatement.expression)
                                if (callExpression1 === null) {
                                    sideEffect(() => {
                                        return this.unsupported({ node: expressionStatement, typeDescription: "side effect statement3" })
                                    })
                                    return notSet({})
                                } else {
                                    const identifier = this.tapi.castToIdentifier(callExpression1.expression)
                                    if (identifier === null) {
                                        sideEffect(() => {
                                            return this.unsupported({ node: expressionStatement, typeDescription: "side effect statement2" })
                                        })
                                        return notSet({})
                                    } else {
                                        //tslint:disable-next-line: pareto
                                        if (this.tapi.isSideEffect(identifier.text)) {
                                            const callExpression = this.processExpression(callExpression1)
                                            if (callExpression === null) {
                                                return notSet({})
                                            } else {
                                                return set(callExpression)
                                            }
                                        } else {
                                            sideEffect(() => {
                                                return this.unsupported({ node: expressionStatement, typeDescription: "side effect statement1" })
                                            })
                                            return notSet({})
                                        }
                                    }
                                }
                            }),
                            statement: stmnt,
                        })
                    },
                })
            },
            onMultiple: multipleStatements => {
                sideEffect(() => {
                    return multipleStatements.allButLast({}).forEach(statementKind => {
                        switch (statementKind[0]) {
                            case "IfStatement": {
                                return this.superfluous({ node: statementKind[1], typeDescription: "statements" })
                            }
                            case "ReturnStatement": {
                                return notSet({})
                            }
                            case "SwitchStatement": {
                                return this.superfluous({ node: statementKind[1], typeDescription: "statements" })
                            }
                        }
                    })
                })
                return notSet({})
            },
        })
    }
    private unsupported(p: {
        readonly node: ts.Node,
        readonly typeDescription: string
    }): void {
        return this.reporter.reportFailure({ node: p.node, message: `unsupported ${p.typeDescription} kind: ${this.tapi.getKindName(p.node)}` })
    }
    private missing(p: {
        readonly node: ts.Node,
        readonly typeDescription: string
    }): void {
        return this.reporter.reportFailure({ node: p.node, message: `missing ${p.typeDescription}` })
    }
    private superfluous(p: {
        readonly node: ts.Node,
        readonly typeDescription: string
    }): void {
        return this.reporter.reportFailure({ node: p.node, message: `superfluous ${p.typeDescription}` })
    }
}

export function createSourceFileBuilder(p: {
    readonly reporter: IReporter,
    readonly typescriptAPI: u.ITypescriptAPI
}) {
    return new SourceFileBuilder({ reporter: p.reporter, tapi: p.typescriptAPI })
}
