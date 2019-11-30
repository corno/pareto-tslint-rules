import {
    Optional,
    PossiblyMissing,
    PossiblyUnsupported,
    STUB
} from "./states"

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

export type TypeNodeKind =
    | ["ArrayType", {
        elementType: TypeNode
    }]
    // | ["TypeLiteral", {
    //     members: Array<STUB>
    // }]
    | ["FunctionType", STUB]
    | ["NumberKeyword", {}]
    | ["NullKeyword", {}]
    | ["StringKeyword", {}]
    | ["TupleType", STUB]
    | ["TypeReference", STUB]
    | ["UnionType", {
        types: Array<TypeNode>
    }]

export type TypeNode = {
    kind: PossiblyUnsupported<TypeNodeKind>
}

export type ExpressionKind =
    | ["ArrayLiteralExpression", {
        elements: Array<Expression>
    }]
    | ["ArrowFunction", {
        body: ArrowFunctionBody
    }]
    | ["CallExpression", {
        expression: Expression
        typeArguments: Optional<Array<TypeNode>>
        arguments: Array<Expression>
    }]
    | ["Identifier", {
        text: string
    }]
    | ["ElementAccessExpression", STUB]
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
    | ["StringLiteral", StringLiteral]
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

export type Statement = {
    kind: PossiblyUnsupported<StatementKind>
}

export type VariableStatementDeclaration = {
    name: BindingName
    type: Optional<TypeNode>
    initializer: PossiblyMissing<Expression>
}

export type StatementKind =
    | ["BreakStatement", {
    }]
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
export type StringLiteral = {
    text: string
}

export type Block = {
    statements: Array<Statement>
}

export type Parameter = {
    name: BindingName
    type: PossiblyMissing<TypeNode>
}

export type FunctionDeclaration = {
    name: PossiblyMissing<Identifier>
    parameters: Array<Parameter>
    body: PossiblyMissing<Block>
}

export type MethodDeclaration = {
    name: PropertyName
    parameters: Array<Parameter>
    body: PossiblyMissing<Block>
}

export type ConstructorStatementKind = STUB

export type ConstructorStatement = {
    kind: PossiblyUnsupported<ConstructorStatementKind>
}

export type ConstructorBlock = {
    statements: Iterable<ConstructorStatement>
}

export type ConstructorDeclaration = {
    parameters: Array<Parameter>
    body: PossiblyMissing<ConstructorBlock>
}

export type PropertyName = {
    kind: PossiblyUnsupported<PropertyNameKind>
}

export type PropertyNameKind =
    | ["Identifier", Identifier]
    | ["StringLiteral", StringLiteral]

export type ClassMemberKind =
    | ["Constructor", ConstructorDeclaration]
    | ["MethodDeclaration", MethodDeclaration]
    | ["PropertyDeclaration", {
        name: PropertyName,
        type: Optional<TypeNode>,
        initializer: Optional<Expression>
    }]

export type ClassMember = {
    kind: PossiblyUnsupported<ClassMemberKind>
}

export type TypeParameterDeclarationKind = STUB

export type TypeParameterDeclaration = {
    kind: PossiblyUnsupported<TypeParameterDeclarationKind>
}

export type InterfaceDeclarationMemberKind = STUB

export type InterfaceDeclarationMember = {
    kind: PossiblyUnsupported<InterfaceDeclarationMemberKind>
}

export type InterfaceDeclaration = {
    members: Array<InterfaceDeclarationMember>
}

export type RootStatementKind =
    | ["ClassDeclaration", {
        "name": PossiblyMissing<Identifier>
        "members": Array<ClassMember>
    }]
    | ["ImportDeclaration", {
        importClause: Optional<{
            name: Optional<Identifier>,
            namedBindings: Optional<STUB>
        }>,
        moduleSpecifier: StringLiteral
    }]
    | ["FunctionDeclaration", FunctionDeclaration]
    | ["InterfaceDeclaration", InterfaceDeclaration]
    | ["TypeAliasDeclaration", {
        typeParameters: Optional<Array<TypeParameterDeclaration>>,
        type: TypeNode
    }]

export type RootStatement = {
    kind: PossiblyUnsupported<RootStatementKind>
}

export type SourceFile = {
    statements: Array<RootStatement>
}
