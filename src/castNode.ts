import * as ts from "typescript"

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

export function getKindName(node: ts.Node) {
    return getKindCache()[node.kind]
}

export function isExpression(n: ts.Node): n is ts.Expression {
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
