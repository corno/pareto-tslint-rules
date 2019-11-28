import { createFountainPen } from "fountain-pen"
import { syntaxKind } from "./SyntaxKind"

// tslint:disable-next-line: no-console
const pen = createFountainPen("    ", true, str => { console.log(str)})

pen.write(
    `import * as ts from "typescript"`,
    `export type GeneratedTypedNode =`,
    () => {
        syntaxKind.forEach(sk => {
            pen.write(`| ["${sk[0]}", ts.${sk[0]}]`)

        })
    },
    ``,
    `export function castNode(node: ts.Node): GeneratedTypedNode | null {`,
    () => {
        pen.write(
            `switch (node.kind) {`,
            () => {
                syntaxKind.forEach(sk => {
                    pen.write(`case ts.SyntaxKind.${sk[0]}: return ["${sk[0]}", node as ts.${sk[0]}]`)
                })
            },
            `}`
        )
    },
    `}`,
)
