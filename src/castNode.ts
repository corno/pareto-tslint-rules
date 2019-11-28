import * as ts from "typescript"
import * as gcn from "./generatedCastNode"


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

export type TypedNode =
    | gcn.GeneratedTypedNode

    | gcn.GeneratedUncastableNode
    | ["Constructor", ts.ConstructorDeclaration]
    | ["NullKeyword", ts.NullLiteral]


export function castNode(node: ts.Node): TypedNode {
    const cache = getKindCache()
    const sk = cache[node.kind]
    if (sk === undefined) {
        throw new Error("XXXX")
    }
    switch (node.kind) {
        case ts.SyntaxKind.Constructor: return ["Constructor", node as ts.ConstructorDeclaration]
        case ts.SyntaxKind.NullKeyword: return ["NullKeyword", node as ts.NullLiteral]
    }
    const castResult = gcn.castNode(node)
    if (castResult !== null) {
        return castResult
    }
    const castResult2 = gcn.castUnsupportedNode(node)
    if (castResult2 !== null) {
        return castResult2
    }
    throw new Error("Unknown SyntaxKind: " + node.kind)
}

export function castToExpression(node: ts.Node): null | ts.Expression {
    const castResult = castNode(node)
    switch (castResult[0]) {
        case "Identifier": return castResult[1]
        case "StringLiteral": return castResult[1]
        case "OmittedExpression": return castResult[1]
        case "PartiallyEmittedExpression": return castResult[1]
        //case "UnaryExpression": return castResult[1]
        //case "UpdateExpression": return castResult[1]
        case "PrefixUnaryExpression": return castResult[1]
        case "PostfixUnaryExpression": return castResult[1]
        //case "LeftHandSideExpression": return castResult[1]
        // case "MemberExpression": return castResult[1]
        // case "PrimaryExpression": return castResult[1]
        // case "NullLiteral": return castResult[1]
        case "NullKeyword": return castResult[1]
        // case "BooleanLiteral": return castResult[1]
        // case "ThisExpression": return castResult[1]
        // case "SuperExpression": return castResult[1]
        // case "ImportExpression": return castResult[1]
        case "DeleteExpression": return castResult[1]
        case "TypeOfExpression": return castResult[1]
        case "VoidExpression": return castResult[1]
        case "AwaitExpression": return castResult[1]
        case "YieldExpression": return castResult[1]
        //case "SyntheticExpression": return castResult[1]
        case "BinaryExpression": return castResult[1]
        // case "AssignmentExpression<TOperator": return castResult[1]
        // case "ObjectDestructuringAssignment": return castResult[1]
        // case "ArrayDestructuringAssignment": return castResult[1]
        case "ConditionalExpression": return castResult[1]
        case "FunctionExpression": return castResult[1]
        case "ArrowFunction": return castResult[1]
        //case "LiteralExpression": return castResult[1]
        case "RegularExpressionLiteral": return castResult[1]
        case "NoSubstitutionTemplateLiteral": return castResult[1]
        case "NumericLiteral": return castResult[1]
        //case "BigIntLiteral": return castResult[1]
        case "TemplateExpression": return castResult[1]
        case "ParenthesizedExpression": return castResult[1]
        case "ArrayLiteralExpression": return castResult[1]
        case "SpreadElement": return castResult[1]
        //case "ObjectLiteralExpressionBase<T": return castResult[1]
        case "ObjectLiteralExpression": return castResult[1]
        case "PropertyAccessExpression": return castResult[1]
        // "SuperPropertyAccessExpression": return castResult[1]
        // case "PropertyAccessEntityNameExpression": return castResult[1]
        case "ElementAccessExpression": return castResult[1]
        //case "SuperElementAccessExpression": return castResult[1]
        case "CallExpression": return castResult[1]
        //case "SuperCall": return castResult[1]
        //case "ImportCall": return castResult[1]
        case "NewExpression": return castResult[1]
        case "TaggedTemplateExpression": return castResult[1]
        case "AsExpression": return castResult[1]
        //case "TypeAssertion": return castResult[1]
        case "NonNullExpression": return castResult[1]
        case "MetaProperty": return castResult[1]
        case "JsxElement": return castResult[1]
        //case "JsxTagNamePropertyAccess": return castResult[1]
        case "JsxAttributes": return castResult[1]
        case "JsxOpeningElement": return castResult[1]
        case "JsxSelfClosingElement": return castResult[1]
        case "JsxFragment": return castResult[1]
        case "JsxOpeningFragment": return castResult[1]
        case "JsxClosingFragment": return castResult[1]
        case "JsxExpression": return castResult[1]
        case "CommaListExpression": return castResult[1]
        case "ClassExpression": return castResult[1]
        //case "JsonMinusNumericLiteral": return castResult[1]
        //case "JsonObjectExpressionStatement": return castResult[1]
        default:
            return null
    }
}
export function isExpression(n: ts.Node): n is ts.Expression {
    const castResult = castToExpression(n)
    return (castResult !== null)
}
