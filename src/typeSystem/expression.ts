import { IInArray } from "../states";
import {
    Block,
} from "./block"

export type StringLiteral = {
    readonly text: string
}

export type ArrowFunctionBodyKind =
    // | ["Expression", {
    //     readonly "expression": Expression
    // }]
    | ["Block", {
        readonly "block": Block
    }]

export type ArrowFunctionBody = {
    readonly kind: ArrowFunctionBodyKind
}

export type ObjectLiteralPropertyType =
    | ["PropertyAssignment", {
        readonly name: string,
        readonly initializer: Expression
    }]

export type CallSignature = {
    readonly argument: Expression
}

export type ExpressionKind =
    | ["ArrayLiteralExpression", {
        readonly elements: IInArray<Expression>
    }]
    | ["ArrowFunction", {
        readonly body: ArrowFunctionBody
    }]
    | ["CallExpression", {
        readonly expression: Expression
        readonly callSignature: CallSignature
    }]
    | ["Identifier", {
        readonly text: string
    }]
    | ["ElementAccessExpression", {
        readonly expression: Expression,
        readonly index:
        | ["One", {}]
        | ["Zero", {}]
    }]
    | ["FalseKeyword", {}]
    | ["ObjectLiteralExpression", {
        readonly properties: IInArray<{
            readonly kind: ObjectLiteralPropertyType
        }>
    }]
    | ["NoSubstitutionTemplateLiteral", {
        readonly text: string
    }]
    | ["NullKeyword", {
    }]
    | ["NewExpression", {
        readonly className: string
        readonly callSignature: CallSignature
    }]
    | ["OneKeyword", {}]
    | ["PropertyAccessExpression", {
        readonly expression: Expression
        readonly name: string
    }]
    | ["StringLiteral", StringLiteral]
    | ["TemplateExpression", {
        readonly head: string,
        readonly templateSpans: IInArray<{
            readonly expression: Expression,
            readonly text: string
        }>
    }]
    | ["This", {}]
    | ["TrueKeyword", {}]
    | ["ZeroKeyword", {}]


export type Expression = {
    readonly kind: ExpressionKind
}
