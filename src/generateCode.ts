import * as fp from "fountain-pen"
import * as p from "./states"
import { PlainOldDataTypeNode, SourceFile } from "./typeSystem"

export class CodeGenerator {
    public sourceFile(sf: SourceFile): fp.IParagraph {
        return [
            sf.typeAliasDeclarations.map(tad => {
                return this.typeNodeDeclaration({ type: tad.type, path: `${tad.name}` })
            }),
            // sf.typeAliasDeclarations.map(tad => {
            //     return [
            //         ``,
            //         fp.line([`typedef /*${tad.name}*/ `, this.typeNode({ type: tad.type, path: `${tad.name}` }), ` ${tad.name};`]),
            //     ]
            // }),
        ]
    }
    private typeNode(pr: { readonly type: PlainOldDataTypeNode, readonly path: string }): fp.IInlineSection {
        switch (pr.type.kind[0]) {
            case "Boolean": {
                //const $ = tn.kind[1]
                return fp.token(`char`)
            }
            case "Number": {
                //const $ = tn.kind[1]
                return fp.token(`int`)
            }
            case "Optional": {
                const $ = pr.type.kind[1]
                return fp.line([
                    `struct {`,
                    () => {
                        return [
                            `const char isSet;`,
                            fp.line([`const `, this.typeNode({ type: $.type, path: `${pr.path}_opt` }), `data;`]),
                        ]
                    },
                    `}`,
                ])
            }
            case "String": {
                //const $ = tn.kind[1]
                return fp.token(`char*`)
            }
            case "TaggedUnion": {
                //const $ = tn.kind[1]
                return fp.token(`${pr.path}`)
            }
            case "Tuple": {
                //const $ = tn.kind[1]
                return fp.token(`${pr.path}`)
            }
            case "TypeLiteral": {
                //const $ = pr.type.kind[1]
                return fp.token(`${pr.path}`)
            }
            case "TypeReference": {
                const $ = pr.type.kind[1]
                return fp.token($.id)
            }
            default: return p.assertUnreachable(pr.type.kind[0])
        }

    }
    private typeNodeDeclaration(pr: { readonly type: PlainOldDataTypeNode, readonly path: string }): fp.IParagraph {
        switch (pr.type.kind[0]) {
            case "Boolean": {
                return []
            }
            case "Number": {
                return []
            }
            case "Optional": {
                const $ = pr.type.kind[1]
                return [
                    this.typeNodeDeclaration({ type: $.type, path: `${pr.path}_opt` }),
                    ``,
                    `typedef struct ${pr.path} {`,
                    () => {
                        return [
                            `const boolean isSet;`,
                            fp.line([`const `, this.typeNode({ type: $.type, path: `${pr.path}_opt` }), `data;`]),
                        ]
                    },
                    `} ${pr.path};`,
                ]
            }
            case "String": {
                //const $ = tn.kind[1]
                return []
            }
            case "TaggedUnion": {
                //const $ = tn.kind[1]
                const $ = pr.type.kind[1]
                return [
                    $.alternatives.map(m => {
                        return [
                            this.typeNodeDeclaration({ type: m.type, path: `${pr.path}_${m.name}` }),
                        ]
                    }),
                    ``,
                    `typedef enum enum_${pr.path} {`,
                    () => {
                        return $.alternatives.map((m, index) => {
                            return `opt_${pr.path}_${m.name} = ${index},`
                        })
                    },
                    `} enum_${pr.path};`,
                    ``,
                    `typedef union union_${pr.path} {`,
                    () => {
                        return $.alternatives.map(m => {
                            return fp.line([this.typeNode({type: m.type, path: `${pr.path}_${m.name}`}) , ` _${m.name};`])
                        })
                    },
                    `} union_${pr.path};`,
                    ``,
                    `typedef struct ${pr.path} {`,
                    () => {
                        return [
                            `enum_${pr.path} state;`,
                            `union_${pr.path} data;`,
                        ]
                    },
                    `} ${pr.path};`,
                ]
            }
            case "Tuple": {
                const $ = pr.type.kind[1]
                return [
                    $.elementTypes.map((m, index) => {
                        return this.typeNodeDeclaration({ type: m, path: `${pr.path}_${index}` })
                    }),
                    ``,
                    `typedef struct ${pr.path} {`,
                    () => {
                        return $.elementTypes.map((m, index) => {
                            return [
                                fp.line([`const `, this.typeNode({ type: m, path: `${pr.path}_${index}` }), `_${index};`]),
                            ]
                        })
                    },
                    `} ${pr.path};`,
                ]
            }
            case "TypeLiteral": {
                const $ = pr.type.kind[1]
                return [
                    $.members.map(m => {
                        return this.typeNodeDeclaration({ type: m.type, path: `${pr.path}_${m.name}` })
                    }),
                    ``,
                    `typedef struct ${pr.path} {`,
                    () => {
                        let count = 0
                        return [
                            $.members.map(m => {
                                count++
                                return [
                                    fp.line([`const `, this.typeNode({ type: m.type, path: `${pr.path}_${m.name}` }), ` ${m.name};`]),
                                ]
                            }),
                            count === 0 ? `char dummyBecauseEmptyStruct;` : [],
                        ]
                    },
                    `} ${pr.path};`,
                ]
            }
            case "TypeReference": {
                return []
            }
            default: return p.assertUnreachable(pr.type.kind[0])
        }

    }
}

