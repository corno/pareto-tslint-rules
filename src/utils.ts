//tslint:disable pareto no-bitwise
import * as ts from "typescript"
import { Maybe, MyArray, notSet, set } from "./states"

let kindCache: { [key: number]: string }

function getKindCache() {
    if (kindCache !== undefined) {
        return kindCache
    }
    kindCache = {}

    // some SyntaxKinds are repeated, so only use the first one
    for (const name of Object.keys(ts.SyntaxKind)) {
        const value = (ts.SyntaxKind as any)[name] as number
        if (kindCache[value] === undefined) {
            kindCache[value] = name
        }
    }
    return kindCache
}


export type ClassMemberKind =
    | ["ConstructorDeclaration", ts.ConstructorDeclaration]
    | ["MethodDeclaration", ts.MethodDeclaration]
    | ["PropertyDeclaration", ts.PropertyDeclaration]

export type ClauseKind =
    | ["CaseClause", ts.CaseClause]
    | ["DefaultClause", ts.DefaultClause]

export type ExpressionKind =
    | ["ArrayLiteralExpression", ts.ArrayLiteralExpression]
    | ["ArrowFunction", ts.ArrowFunction]
    | ["CallExpression", ts.CallExpression]
    | ["ElementAccessExpression", ts.ElementAccessExpression]
    | ["FalseKeyword"]
    | ["Identifier", ts.Identifier]
    | ["ObjectLiteralExpression", ts.ObjectLiteralExpression]
    | ["NoSubstitutionTemplateLiteral", ts.NoSubstitutionTemplateLiteral]
    | ["NullKeyword"]
    | ["NumericLiteral", ts.NumericLiteral]
    | ["NewExpression", ts.NewExpression]
    | ["ParenthesizedExpression", ts.ParenthesizedExpression]
    | ["PropertyAccessExpression", ts.PropertyAccessExpression]
    | ["StringLiteral", ts.StringLiteral]
    | ["TemplateExpression", ts.TemplateExpression]
    | ["ThisKeyword"]
    | ["TrueKeyword"]

export type NumericLiteralKind =
    | ["Zero"]
    | ["One"]


export type PropertyKind =
    | ["Identifier", ts.Identifier]
    | ["StringLiteral", ts.StringLiteral]


export type PlainOldDataTypeNodeKind =
    | ["BooleanKeyword"]
    | ["NumberKeyword"]
    | ["StringKeyword"]
    | ["TupleType", ts.TupleTypeNode]
    | ["TypeLiteral", ts.TypeLiteralNode]
    | ["TypeReference", ts.TypeReferenceNode]
    | ["Optional", ts.TypeNode]
    | ["UnionType", ts.UnionTypeNode]


export type RootStatementKind =
    | ["ClassDeclaration", ts.ClassDeclaration]
    | ["ImportDeclaration", ts.ImportDeclaration]
    | ["InterfaceDeclaration", ts.InterfaceDeclaration]
    | ["FunctionDeclaration", ts.FunctionDeclaration]
    | ["TypeAliasDeclaration", ts.TypeAliasDeclaration]


export type StatementKind =
    | ["ReturnStatement", ts.ReturnStatement]
    | ["SwitchStatement", ts.SwitchStatement]
    | ["IfStatement", ts.IfStatement]


export type TypeReferenceKind =
    | ["QualifiedName", ts.QualifiedName]
    | ["StringLiteral", ts.StringLiteral]

export type SplitStatements = {
    variableStatements: MyArray<ts.VariableStatement>
    expressionStatements: MyArray<ts.ExpressionStatement>
    endStatements: MyArray<StatementKind>
    otherStatements: MyArray<ts.Statement>
}

export type ConditionExpression =
    | ["Unknown", ts.Expression]
    | ["NullCheck", ts.Expression]
    | ["StateCheck", {
        expression: ts.Expression,
        stateName: string
    }]

export class ITypescriptAPI {
    public castToStringLiteral(node: ts.Node) {
        if (ts.isStringLiteral(node)) {
            return node
        } else {
            return null
        }
    }
    public castToMethodSignature(node: ts.Node) {
        if (ts.isMethodSignature(node)) {
            return node
        } else {
            return null
        }
    }
    public castToBlock(node: ts.Node) {
        if (ts.isBlock(node)) {
            return node
        } else {
            return null
        }
    }
    public castToPropertyAssignment(node: ts.Node) {
        if (ts.isPropertyAssignment(node)) {
            return node
        } else {
            return null
        }
    }
    public castToFunctionTypeNode(node: ts.Node) {
        if (ts.isFunctionTypeNode(node)) {
            return node
        } else {
            return null
        }
    }
    public castToTupleTypeNode(node: ts.Node) {
        if (ts.isTupleTypeNode(node)) {
            return node
        } else {
            return null
        }
    }
    public castToLiteralTypeNode(node: ts.Node) {
        if (ts.isLiteralTypeNode(node)) {
            return node
        } else {
            return null
        }
    }
    public castToLiteralExpression(node: ts.Node) {
        if (ts.isLiteralExpression(node)) {
            return node
        } else {
            return null
        }
    }
    public castToVariableStatement(node: ts.Node) {
        if (ts.isVariableStatement(node)) {
            return node
        } else {
            return null
        }
    }
    public castToPropertySignature(node: ts.Node) {
        if (ts.isPropertySignature(node)) {
            return node
        } else {
            return null
        }
    }
    public castToQualifiedName(node: ts.Node) {
        if (ts.isQualifiedName(node)) {
            return node
        } else {
            return null
        }
    }
    public castToCallExpression(node: ts.Node) {
        if (ts.isCallExpression(node)) {
            return node
        } else {
            return null
        }
    }
    public castToNumericalLiteral(node: ts.Node) {
        if (ts.isNumericLiteral(node)) {
            return node
        } else {
            return null
        }
    }
    public castToElementAccessExpression(node: ts.Node) {
        if (ts.isElementAccessExpression(node)) {
            return node
        } else {
            return null
        }
    }

    public castClause(clause: ts.CaseOrDefaultClause): Maybe<ClauseKind> {
        if (ts.isCaseClause(clause)) {
            return set(["CaseClause", clause])
        } else if (ts.isDefaultClause(clause)) {
            return set(["DefaultClause", clause])
        } else {
            return notSet({})
        }
    }
    public castClassMemberKind(classElement: ts.ClassElement): Maybe<ClassMemberKind> {
        if (ts.isConstructorDeclaration(classElement)) {
            return set(["ConstructorDeclaration", classElement])
        } else if (ts.isMethodDeclaration(classElement)) {
            return set(["MethodDeclaration", classElement])
        } else if (ts.isPropertyDeclaration(classElement)) {
            return set(["PropertyDeclaration", classElement])
        } else {
            return notSet({})
        }
    }
    public castExpression(expression: ts.Expression): Maybe<ExpressionKind> {
        if (ts.isArrayLiteralExpression(expression)) {
            return set(["ArrayLiteralExpression", expression])
        } else if (ts.isArrowFunction(expression)) {
            return set(["ArrowFunction", expression])
        } else if (ts.isCallExpression(expression)) {
            return set(["CallExpression", expression])
        } else if (ts.isElementAccessExpression(expression)) {
            return set(["ElementAccessExpression", expression])
        } else if (expression.kind === ts.SyntaxKind.FalseKeyword) {
            return set(["FalseKeyword"])
        } else if (ts.isIdentifier(expression)) {
            return set(["Identifier", expression])
        } else if (ts.isObjectLiteralExpression(expression)) {
            return set(["ObjectLiteralExpression", expression])
        } else if (ts.isNoSubstitutionTemplateLiteral(expression)) {
            return set(["NoSubstitutionTemplateLiteral", expression])
        } else if (expression.kind === ts.SyntaxKind.NullKeyword) {
            return set(["NullKeyword"])
        } else if (ts.isNumericLiteral(expression)) {
            return set(["NumericLiteral", expression])
        } else if (ts.isNewExpression(expression)) {
            return set(["NewExpression", expression])
        } else if (ts.isParenthesizedExpression(expression)) {
            return set(["ParenthesizedExpression", expression])
        } else if (ts.isPropertyAccessExpression(expression)) {
            return set(["PropertyAccessExpression", expression])
        } else if (ts.isStringLiteral(expression)) {
            return set(["StringLiteral", expression])
        } else if (ts.isTemplateExpression(expression)) {
            return set(["TemplateExpression", expression])
        } else if (expression.kind === ts.SyntaxKind.ThisKeyword) {
            return set(["ThisKeyword"])
        } else if (expression.kind === ts.SyntaxKind.TrueKeyword) {
            return set(["TrueKeyword"])
        } else {
            return notSet({})
        }
    }
    public castNumericLiteral(nl: ts.NumericLiteral): null | NumericLiteralKind {
        if (nl.text === "0") {
            return ["Zero"]
        } else if (nl.text === "1") {
            return ["One"]
        } else {
            return null
        }
    }
    public castPlainOldDataTypeNode(typeNode: ts.TypeNode): Maybe<PlainOldDataTypeNodeKind> {
        // if (ts.isArrayTypeNode(typeNode)) {
        //     return set(["ArrayType", typeNode])
        // } else
        if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) {
            return set(["BooleanKeyword"])
        } else if (typeNode.kind === ts.SyntaxKind.NumberKeyword) {
            return set(["NumberKeyword"])
            // } else if (typeNode.kind === ts.SyntaxKind.NullKeyword) {
            //     return set(["NullKeyword"])
        } else if (typeNode.kind === ts.SyntaxKind.StringKeyword) {
            return set(["StringKeyword"])
        } else if (ts.isTupleTypeNode(typeNode)) {
            return set(["TupleType", typeNode])
        } else if (ts.isTypeLiteralNode(typeNode)) {
            return set(["TypeLiteral", typeNode])
        } else if (ts.isTypeReferenceNode(typeNode)) {
            return set(["TypeReference", typeNode])
        } else if (ts.isUnionTypeNode(typeNode)) {
            if (typeNode.types.length === 2 && typeNode.types[0].kind === ts.SyntaxKind.NullKeyword) {
                return set(["Optional", typeNode.types[1]])
            } else {
                return set(["UnionType", typeNode])
            }
        } else {
            return notSet({})
        }
    }
    public castPropertyKind(propertyName: ts.PropertyName): Maybe<PropertyKind> {
        if (ts.isIdentifier(propertyName)) {
            return set(["Identifier", propertyName])
        } else if (ts.isStringLiteral(propertyName)) {
            return set(["StringLiteral", propertyName])
        } else {
            return notSet({})
        }
    }
    public castRootStatement(statement: ts.Statement): null | RootStatementKind {
        if (ts.isClassDeclaration(statement)) {
            return ["ClassDeclaration", statement]
        } else if (ts.isImportDeclaration(statement)) {
            return ["ImportDeclaration", statement]
        } else if (ts.isInterfaceDeclaration(statement)) {
            return ["InterfaceDeclaration", statement]
        } else if (ts.isFunctionDeclaration(statement)) {
            return ["FunctionDeclaration", statement]
        } else if (ts.isTypeAliasDeclaration(statement)) {
            return ["TypeAliasDeclaration", statement]
        } else {
            return null
        }
    }
    // public castStatement(statement: ts.Statement): Maybe<StatementKind> {
    //     if (ts.isReturnStatement(statement)) {
    //         return set(["ReturnStatement", statement])
    //     } else if (ts.isSwitchStatement(statement)) {
    //         return set(["SwitchStatement", statement])
    //     } else if (ts.isIfStatement(statement)) {
    //         return set(["IfStatement", statement])
    //     } else {
    //         return notSet({})
    //     }
    // }
    public castTypeReference(typeReference: ts.TypeReferenceNode): Maybe<TypeReferenceKind> {
        if (ts.isQualifiedName(typeReference)) {
            return set(["QualifiedName", typeReference])
        } else if (ts.isStringLiteral(typeReference)) {
            return set(["StringLiteral", typeReference])
        } else {
            return notSet({})
        }
    }
    public getKindName(node: ts.Node) {
        return getKindCache()[node.kind]
    }
    public isExpression(n: ts.Node): n is ts.Expression {
        switch (n.kind) {
            case ts.SyntaxKind.Identifier: return true
            case ts.SyntaxKind.StringLiteral: return true
            case ts.SyntaxKind.OmittedExpression: return true
            case ts.SyntaxKind.PartiallyEmittedExpression: return true
            //case ts.SyntaxKind.UnaryExpression: return true
            //case ts.SyntaxKind.UpdateExpression: return true
            case ts.SyntaxKind.PrefixUnaryExpression: return true
            case ts.SyntaxKind.PostfixUnaryExpression: return true
            //case ts.SyntaxKind.LeftHandSideExpression: return true
            // case ts.SyntaxKind.MemberExpression: return true
            // case ts.SyntaxKind.PrimaryExpression: return true
            // case ts.SyntaxKind.NullLiteral: return true
            case ts.SyntaxKind.NullKeyword: return true
            // case ts.SyntaxKind.BooleanLiteral: return true
            // case ts.SyntaxKind.ThisExpression: return true
            // case ts.SyntaxKind.SuperExpression: return true
            // case ts.SyntaxKind.ImportExpression: return true
            case ts.SyntaxKind.DeleteExpression: return true
            case ts.SyntaxKind.TypeOfExpression: return true
            case ts.SyntaxKind.VoidExpression: return true
            case ts.SyntaxKind.AwaitExpression: return true
            case ts.SyntaxKind.YieldExpression: return true
            //case ts.SyntaxKind.SyntheticExpression: return true
            case ts.SyntaxKind.BinaryExpression: return true
            // case ts.SyntaxKind.AssignmentExpression<TOperator: return true
            // case ts.SyntaxKind.ObjectDestructuringAssignment: return true
            // case ts.SyntaxKind.ArrayDestructuringAssignment: return true
            case ts.SyntaxKind.ConditionalExpression: return true
            case ts.SyntaxKind.FunctionExpression: return true
            case ts.SyntaxKind.ArrowFunction: return true
            //case ts.SyntaxKind.LiteralExpression: return true
            case ts.SyntaxKind.RegularExpressionLiteral: return true
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral: return true
            case ts.SyntaxKind.NumericLiteral: return true
            //case ts.SyntaxKind.BigIntLiteral: return true
            case ts.SyntaxKind.TemplateExpression: return true
            case ts.SyntaxKind.ParenthesizedExpression: return true
            case ts.SyntaxKind.ArrayLiteralExpression: return true
            case ts.SyntaxKind.SpreadElement: return true
            //case ts.SyntaxKind.ObjectLiteralExpressionBase<T: return true
            case ts.SyntaxKind.ObjectLiteralExpression: return true
            case ts.SyntaxKind.PropertyAccessExpression: return true
            // ts.SyntaxKind.SuperPropertyAccessExpression: return true
            // case ts.SyntaxKind.PropertyAccessEntityNameExpression: return true
            case ts.SyntaxKind.ElementAccessExpression: return true
            //case ts.SyntaxKind.SuperElementAccessExpression: return true
            case ts.SyntaxKind.CallExpression: return true
            //case ts.SyntaxKind.SuperCall: return true
            //case ts.SyntaxKind.ImportCall: return true
            case ts.SyntaxKind.NewExpression: return true
            case ts.SyntaxKind.TaggedTemplateExpression: return true
            case ts.SyntaxKind.AsExpression: return true
            //case ts.SyntaxKind.TypeAssertion: return true
            case ts.SyntaxKind.NonNullExpression: return true
            case ts.SyntaxKind.MetaProperty: return true
            case ts.SyntaxKind.JsxElement: return true
            //case ts.SyntaxKind.JsxTagNamePropertyAccess: return true
            case ts.SyntaxKind.JsxAttributes: return true
            case ts.SyntaxKind.JsxOpeningElement: return true
            case ts.SyntaxKind.JsxSelfClosingElement: return true
            case ts.SyntaxKind.JsxFragment: return true
            case ts.SyntaxKind.JsxOpeningFragment: return true
            case ts.SyntaxKind.JsxClosingFragment: return true
            case ts.SyntaxKind.JsxExpression: return true
            case ts.SyntaxKind.CommaListExpression: return true
            case ts.SyntaxKind.ClassExpression: return true
            //case ts.SyntaxKind.JsonMinusNumericLiteral: return true
            //case ts.SyntaxKind.JsonObjectExpressionStatement: return true
            default:
                return false
        }
    }

    public getPair(array: ts.NodeArray<ts.TypeNode>): Maybe<{
        first: ts.TypeNode
        second: ts.TypeNode
    }> {
        if (array.length !== 2) {
            return notSet({})
        } else {
            return set({
                first: array[0],
                second: array[1],
            })
        }
    }
    public validateModifiers(p: {
        readonly modifiers: ts.NodeArray<ts.Modifier> | undefined,
        readonly missingReadonly: () => void,
        readonly unsupported: (m: ts.Modifier) => void
    }) {
        let readonlyFound = false
        if (p.modifiers !== undefined) {
            p.modifiers.forEach(m => {
                if (m.kind === ts.SyntaxKind.ReadonlyKeyword) {
                    readonlyFound = true
                } else {
                    p.unsupported(m)
                }
            })
        }
        if (!readonlyFound) {
            p.missingReadonly()
        }
    }
    public validateNodeFlags(p: {
        readonly nodeFlags: ts.NodeFlags,
        readonly missingConst: () => void,
        readonly unsupported: (otherFlags: ts.NodeFlags, errorFlag: ts.NodeFlags) => void
    }) {
        // tslint:disable-next-line: no-bitwise
        if ((p.nodeFlags & ts.NodeFlags.Const) === 0) {
            p.missingConst()
        }
        const otherFlags = p.nodeFlags & ~ts.NodeFlags.Const & ~ts.NodeFlags.ThisNodeOrAnySubNodesHasError
        if (otherFlags !== 0) {
            p.unsupported(otherFlags, ts.NodeFlags.ThisNodeOrAnySubNodesHasError)
        }
        // let readonlyFound = false
        // if (p.modifiers !== undefined) {
        //     p.modifiers.forEach(m => {
        //         if (m.kind === ts.SyntaxKind.ReadonlyKeyword) {
        //          readonlyFound = true
        //         } else {
        //             p.unsupported(m)
        //         }
        //     })
        // }
        // if (!readonlyFound) {
        //     p.missingConst()
        // }
    }

    public splitStatements(statements: ts.NodeArray<ts.Statement>): SplitStatements {
        const varStats: Array<ts.VariableStatement> = []
        const expressionStatements: Array<ts.ExpressionStatement> = []
        const endStatements: Array<StatementKind> = []
        const otherStatements: Array<ts.Statement> = []
        statements.forEach(s => {
            if (ts.isVariableStatement(s)) {
                varStats.push(s)
            } else if (ts.isExpressionStatement(s)) {
                expressionStatements.push(s)
            } else if (ts.isIfStatement(s)) {
                endStatements.push(["IfStatement", s])
            } else if (ts.isSwitchStatement(s)) {
                endStatements.push(["SwitchStatement", s])
            } else if (ts.isReturnStatement(s)) {
                endStatements.push(["ReturnStatement", s])
            } else {
                otherStatements.push(s)
            }
        })
        return {
            variableStatements: new MyArray(varStats),
            expressionStatements: new MyArray(expressionStatements),
            endStatements: new MyArray(endStatements),
            otherStatements: new MyArray(otherStatements),
        }
    }
    public isSideEffect(text: string) {
        return text === "sideEffect"
    }
    public castToIdentifier(node: ts.Node): null | ts.Identifier {
        if (ts.isIdentifier(node)) {
            return node
        } else {
            return null
        }
    }
    public getOrElements(expression: ts.Expression): Array<ConditionExpression> {
        const orExpressions: Array<ts.Expression> = []
        let currentExpression = expression
        while (true) {
            if (ts.isBinaryExpression(currentExpression) && currentExpression.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
                //or expression
                orExpressions.push(currentExpression.right)
                currentExpression = currentExpression.left
            } else {
                orExpressions.push(currentExpression)
                break
            }
        }
        return orExpressions.map(exp => {
            if (ts.isBinaryExpression(exp) && exp.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken && exp.right.kind === ts.SyntaxKind.NullKeyword) {
                return ["NullCheck", exp.left]
            } else if (ts.isBinaryExpression(exp) && exp.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken && ts.isStringLiteral(exp.right)) {
                return ["StateCheck", {
                    expression: exp.left,
                    stateName: exp.right.text,
                }]
            } else {
                return ["Unknown", exp]
            }
        })
    }
}

export function createTypescriptAPI() {
    return new ITypescriptAPI()
}

