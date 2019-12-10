
import {
    IInArray,
    Optional,
} from "../states"
import { Expression } from "./expression"
import { PlainOldDataTypeNode } from "./typeDefinition"


export type VariableStatementDeclaration = {
    readonly name: string
    readonly type: Optional<PlainOldDataTypeNode>
    readonly initializer: Expression
}

export type Clause = {
    readonly label: string
    readonly block: Block
}

export type ConditionKind =
    | ["NullCheck", {}]
    | ["StateCheck", {}]


export type Condition = {
    readonly kind: ConditionKind
}

export type StatementKind =
    | ["IfStatement", {
        readonly conditions: IInArray<Condition>,
        readonly thenBlock: Block,
        readonly elseBlock: Block
    }]
    | ["ReturnStatement", {
        readonly expression: Expression
    }]
    | ["SwitchStatement", {
        readonly expressionx: Expression,
        readonly clauses: IInArray<Clause>
    }]

export type Statement = {
    readonly kind: StatementKind
}

export type Block = {
    readonly variables: IInArray<VariableStatementDeclaration>
    readonly sideEffects: IInArray<Expression>
    readonly statement: Statement
}
