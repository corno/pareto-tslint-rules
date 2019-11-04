import * as Writer from "steroid-writer"
import * as generator from "./generator"

const data: generator.Data = {
    SourceFile: [
        ["req",
            "SyntaxList",
        ],
    ],
    SyntaxList: [
        ["any", [
            "ImportDeclaration",
            "TypeAliasDeclaration",
        ]],
    ],
    ImportDeclaration: [
        ["req", "ImportClause"],
    ],
    ImportClause: [
    ],
    TypeAliasDeclaration: [
        ["opt", "ExportKeyword"],
    ],
    ExportKeyword: [
    ],
}


import * as fs from "fs"

const out: string[] = []
generator.generate(data, Writer.createWriter("    ", true, string => out.push(string)))

fs.writeFileSync("./generated/systemRule.ts", out.join("\n"))
