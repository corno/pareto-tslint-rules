import { IInArray } from "../states"

export type GenericType =
    | ["Array", {}]
    | ["Optional", {}]

export type TypeNodeKind =
    | ["Boolean", {}]
    | ["Number", {}]
    | ["String", {}]
    | ["Tuple", { //eg: [number, string, string]
        readonly elementTypes: IInArray<PlainOldDataTypeNode>
    }]
    | ["TypeLiteral", {//eg: { a: number, b: string }
        readonly members: IInArray<{
            readonly name: string,
            readonly type: PlainOldDataTypeNode
        }>
    }]
    | ["TypeReference", {
        readonly kind:
        | ["local", {
        }]
        | ["remote", {
            readonly moduleName: string
        }]
        | ["generic", {
            readonly type: GenericType

            readonly typeArguments: IInArray<PlainOldDataTypeNode>
        }]
        readonly id: string
    }]
    | ["Optional", {
        readonly type: PlainOldDataTypeNode
    }]
    | ["TaggedUnion", {
        readonly alternatives: IInArray<{
            readonly name: string
            readonly type: PlainOldDataTypeNode
        }>
    }]

export type PlainOldDataTypeNode = {
    readonly kind: TypeNodeKind
}


