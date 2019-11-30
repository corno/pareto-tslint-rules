
class STUB {
    public readonly stub = "stub"
}
export const stub = new STUB()

// class Missing {
//     public readonly missing = "missing"
// }
// const missing = new Missing()

// class Optional {
//     public readonly optional = "optional"
// }
// const optional = new Optional()


export type Optional<T> = ["not set"] | ["set", T]
export function notSet<T>(): Optional<T> {
    return ["not set"]
}
export function set<T>(t: T): Optional<T> {
    return ["set", t]
}

export type PossiblyMissing<T> = ["missing"] | ["present", T]
export function present<T>(t: T): PossiblyMissing<T> {
    return ["present", t]
}

export type PossiblyUnsupported<T> = ["unsupported"] | ["supported", T]
export function supported<T>(t: T): PossiblyUnsupported<T> {
    return ["supported", t]
}

/////////////

export type TypeArgument = STUB

export type ArrowFunctionBodyKind =
    | ["Expression", {
        "expression": Expression
    }]
    | ["Block", {
        "block": Block
    }]

export type ArrowFunctionBody = {
    kind: PossiblyUnsupported<ArrowFunctionBodyKind>
}

export type ObjectLiteralPropertyType =
    | ["PropertyAssignment", {
        name: PropertyName,
        initializer: Expression
    }]

export type ExpressionKind =
    | ["ArrayLiteralExpression", {
        elements: Array<Expression>
    }]
    | ["ArrowFunction", {
        body: ArrowFunctionBody
    }]
    | ["StringLiteral", {
        text: string
    }]
    | ["CallExpression", {
        expression: Expression
        typeArguments: Optional<Array<TypeArgument>>
        arguments: Array<Expression>
    }]
    | ["Identifier", {
        text: string
    }]
    | ["ObjectLiteralExpression", {
        properties: Array<{
            kind: PossiblyUnsupported<ObjectLiteralPropertyType>
        }>
    }]
    | ["NoSubstitutionTemplateLiteral", {
        text: string
    }]
    | ["NullKeyword", {
    }]
    | ["NewExpression", {
    }]
    | ["ParenthesizedExpression", {
        expression: Expression
    }]
    | ["PropertyAccessExpression", {
        name: string,
        expression: Expression
    }]
    | ["This", {}]
    | ["TemplateExpression", {
        head: string,
        templateSpans: Array<{
            expression: Expression,
            text: string
        }>
    }]

export type Expression = {
    kind: PossiblyUnsupported<ExpressionKind>
}

export type ClauseKind =
    | ["CaseClause", {
        expression: Expression
        statements: Array<Statement>
    }]
    | ["DefaultClause", {
        statements: Array<Statement>
    }]

export type Clause = {
    kind: ClauseKind
}

export type Type = STUB

export type Statement = {
    kind: PossiblyUnsupported<StatementKind>
}

export type VariableStatementDeclaration = {
    name: BindingName
    type: Optional<Type>
    initializer: PossiblyMissing<Expression>
}

export type StatementKind =
    | ["ExpressionStatement", {
        expression: Expression
    }]
    | ["ReturnStatement", {
        expression: Optional<Expression>
    }]
    | ["SwitchStatement", {
        expression: Expression,
        clauses: Array<Clause>
    }]
    | ["VariableStatement", {
        declarations: Array<VariableStatementDeclaration>
    }]

export type BindingNameKind =
    | ["Identifier", {
        text: string
    }]

export type BindingName = {
    kind: PossiblyUnsupported<BindingNameKind>
}

export type Identifier = {
    text: string
}

export type Block = {
    statements: Iterable<Statement>
}

export type ParameterType = STUB

export type Parameter = {
    name: BindingName
    type: PossiblyMissing<ParameterType>
}

export type FunctionDeclaration = {
    name: PossiblyMissing<Identifier>
    parameters: Array<Parameter>
    body: PossiblyMissing<Block>
}

export type MethodDeclaration = {
    name: PossiblyMissing<PropertyName>
    parameters: Array<Parameter>
    body: PossiblyMissing<Block>
}

export type PropertyName = {
    kind: PossiblyUnsupported<PropertyNameKind>
}

export type PropertyNameKind =
    | ["Identifier", Identifier]

export type ClassMemberKind =
    | ["Constructor", STUB]
    | ["MethodDeclaration", MethodDeclaration]
    | ["PropertyDeclaration", STUB]

export type ClassMember = {
    kind: PossiblyUnsupported<ClassMemberKind>
}

export type RootStatementKind =
    | ["ClassDeclaration", {
        "name": PossiblyMissing<Identifier>
        "members": Array<ClassMember>
    }]
    | ["ImportDeclaration", STUB]
    | ["FunctionDeclaration", FunctionDeclaration]
    | ["TypeAliasDeclaration", STUB]

export type RootStatement = {
    kind: PossiblyUnsupported<RootStatementKind>
}

export type SourceFile = {
    statements: Array<RootStatement>
}
