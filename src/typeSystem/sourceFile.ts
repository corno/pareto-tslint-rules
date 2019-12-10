import {
    IInArray,
    Optional,
} from "../states"
import { Block } from "./block"
import { Expression } from "./expression"
import { PlainOldDataTypeNode } from "./typeDefinition"


export type Parameter = {
    readonly kind:
    | ["PlainOldData", PlainOldDataTypeNode]
    | ["Function", {
        readonly parameter: Parameter
    }]
}

export type FunctionSignature = {
    readonly name: string
    readonly parameter: Parameter
}

export type FunctionDeclaration = {
    readonly signature: FunctionSignature
    readonly body: Block
}

export type MethodDeclaration = {
    readonly signature: FunctionSignature
    readonly body: Block
}

export type ConstructorDeclaration = {
    //nothing needs to be stored, the constructor is regeneratable
}

export type ClassMemberKind =
    // | ["Constructor", ConstructorDeclaration]
    | ["MethodDeclaration", MethodDeclaration]
    | ["PropertyDeclaration", {
        readonly name: string,
        readonly type: PlainOldDataTypeNode,
        readonly initializer: Optional<Expression>
    }]

export type ClassMember = {
    readonly kind: ClassMemberKind
}

export type InterfaceDeclarationMember = {
    readonly signature: FunctionSignature
}

export type InterfaceDeclaration = {
    readonly members: IInArray<InterfaceDeclarationMember>
}

export type ImportDeclaration = {
    readonly importClause: {
        readonly name: Optional<string>,
        readonly namedBindings: Optional<{
            fixme: string
        }>
    },
    readonly moduleSpecifier: string
}

export type ClassDeclaration = {
    readonly name: string
    readonly members: IInArray<ClassMember>
}

export type TypeAliasDeclaration = {
    readonly name: string
    readonly type: PlainOldDataTypeNode
}

export type SourceFile = {
    readonly importDeclarations: IInArray<ImportDeclaration>
    readonly typeAliasDeclarations: IInArray<TypeAliasDeclaration>
    readonly classDeclarations: IInArray<ClassDeclaration>
    readonly functionDeclarations: IInArray<FunctionDeclaration>
    readonly interfaceDeclarations: IInArray<InterfaceDeclaration>
}
