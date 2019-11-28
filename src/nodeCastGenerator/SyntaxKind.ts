export const syntaxKind = [
    ["Unknown", 0],
    ["EndOfFileToken", 1],
    ["SingleLineCommentTrivia", 2],
    ["MultiLineCommentTrivia", 3],
    ["NewLineTrivia", 4],
    ["WhitespaceTrivia", 5],
    ["ShebangTrivia", 6],
    ["ConflictMarkerTrivia", 7],
    ["NumericLiteral", 8],
    ["StringLiteral", 9],
    ["JsxText", 10],
    ["JsxTextAllWhiteSpaces", 11],
    ["RegularExpressionLiteral", 12],
    ["NoSubstitutionTemplateLiteral", 13],
    ["TemplateHead", 14],
    ["TemplateMiddle", 15],
    ["TemplateTail", 16],
    ["OpenBraceToken", 17],
    ["CloseBraceToken", 18],
    ["OpenParenToken", 19],
    ["CloseParenToken", 20],
    ["OpenBracketToken", 21],
    ["CloseBracketToken", 22],
    ["DotToken", 23],
    ["DotDotDotToken", 24],
    ["SemicolonToken", 25],
    ["CommaToken", 26],
    ["LessThanToken", 27],
    ["LessThanSlashToken", 28],
    ["GreaterThanToken", 29],
    ["LessThanEqualsToken", 30],
    ["GreaterThanEqualsToken", 31],
    ["EqualsEqualsToken", 32],
    ["ExclamationEqualsToken", 33],
    ["EqualsEqualsEqualsToken", 34],
    ["ExclamationEqualsEqualsToken", 35],
    ["EqualsGreaterThanToken", 36],
    ["PlusToken", 37],
    ["MinusToken", 38],
    ["AsteriskToken", 39],
    ["AsteriskAsteriskToken", 40],
    ["SlashToken", 41],
    ["PercentToken", 42],
    ["PlusPlusToken", 43],
    ["MinusMinusToken", 44],
    ["LessThanLessThanToken", 45],
    ["GreaterThanGreaterThanToken", 46],
    ["GreaterThanGreaterThanGreaterThanToken", 47],
    ["AmpersandToken", 48],
    ["BarToken", 49],
    ["CaretToken", 50],
    ["ExclamationToken", 51],
    ["TildeToken", 52],
    ["AmpersandAmpersandToken", 53],
    ["BarBarToken", 54],
    ["QuestionToken", 55],
    ["ColonToken", 56],
    ["AtToken", 57],
    ["EqualsToken", 58],
    ["PlusEqualsToken", 59],
    ["MinusEqualsToken", 60],
    ["AsteriskEqualsToken", 61],
    ["AsteriskAsteriskEqualsToken", 62],
    ["SlashEqualsToken", 63],
    ["PercentEqualsToken", 64],
    ["LessThanLessThanEqualsToken", 65],
    ["GreaterThanGreaterThanEqualsToken", 66],
    ["GreaterThanGreaterThanGreaterThanEqualsToken", 67],
    ["AmpersandEqualsToken", 68],
    ["BarEqualsToken", 69],
    ["CaretEqualsToken", 70],
    ["Identifier", 71],
    ["BreakKeyword", 72],
    ["CaseKeyword", 73],
    ["CatchKeyword", 74],
    ["ClassKeyword", 75],
    ["ConstKeyword", 76],
    ["ContinueKeyword", 77],
    ["DebuggerKeyword", 78],
    ["DefaultKeyword", 79],
    ["DeleteKeyword", 80],
    ["DoKeyword", 81],
    ["ElseKeyword", 82],
    ["EnumKeyword", 83],
    ["ExportKeyword", 84],
    ["ExtendsKeyword", 85],
    ["FalseKeyword", 86],
    ["FinallyKeyword", 87],
    ["ForKeyword", 88],
    ["FunctionKeyword", 89],
    ["IfKeyword", 90],
    ["ImportKeyword", 91],
    ["InKeyword", 92],
    ["InstanceOfKeyword", 93],
    ["NewKeyword", 94],
    ["NullKeyword", 95],
    ["ReturnKeyword", 96],
    ["SuperKeyword", 97],
    ["SwitchKeyword", 98],
    ["ThisKeyword", 99],
    ["ThrowKeyword", 100],
    ["TrueKeyword", 101],
    ["TryKeyword", 102],
    ["TypeOfKeyword", 103],
    ["VarKeyword", 104],
    ["VoidKeyword", 105],
    ["WhileKeyword", 106],
    ["WithKeyword", 107],
    ["ImplementsKeyword", 108],
    ["InterfaceKeyword", 109],
    ["LetKeyword", 110],
    ["PackageKeyword", 111],
    ["PrivateKeyword", 112],
    ["ProtectedKeyword", 113],
    ["PublicKeyword", 114],
    ["StaticKeyword", 115],
    ["YieldKeyword", 116],
    ["AbstractKeyword", 117],
    ["AsKeyword", 118],
    ["AnyKeyword", 119],
    ["AsyncKeyword", 120],
    ["AwaitKeyword", 121],
    ["BooleanKeyword", 122],
    ["ConstructorKeyword", 123],
    ["DeclareKeyword", 124],
    ["GetKeyword", 125],
    ["InferKeyword", 126],
    ["IsKeyword", 127],
    ["KeyOfKeyword", 128],
    ["ModuleKeyword", 129],
    ["NamespaceKeyword", 130],
    ["NeverKeyword", 131],
    ["ReadonlyKeyword", 132],
    ["RequireKeyword", 133],
    ["NumberKeyword", 134],
    ["ObjectKeyword", 135],
    ["SetKeyword", 136],
    ["StringKeyword", 137],
    ["SymbolKeyword", 138],
    ["TypeKeyword", 139],
    ["UndefinedKeyword", 140],
    ["UniqueKeyword", 141],
    ["UnknownKeyword", 142],
    ["FromKeyword", 143],
    ["GlobalKeyword", 144],
    ["OfKeyword", 145],
    ["QualifiedName", 146],
    ["ComputedPropertyName", 147],
    ["TypeParameter", 148],
    ["Parameter", 149],
    ["Decorator", 150],
    ["PropertySignature", 151],
    ["PropertyDeclaration", 152],
    ["MethodSignature", 153],
    ["MethodDeclaration", 154],
    ["Constructor", 155],
    ["GetAccessor", 156],
    ["SetAccessor", 157],
    ["CallSignature", 158],
    ["ConstructSignature", 159],
    ["IndexSignature", 160],
    ["TypePredicate", 161],
    ["TypeReference", 162],
    ["FunctionType", 163],
    ["ConstructorType", 164],
    ["TypeQuery", 165],
    ["TypeLiteral", 166],
    ["ArrayType", 167],
    ["TupleType", 168],
    ["UnionType", 169],
    ["IntersectionType", 170],
    ["ConditionalType", 171],
    ["InferType", 172],
    ["ParenthesizedType", 173],
    ["ThisType", 174],
    ["TypeOperator", 175],
    ["IndexedAccessType", 176],
    ["MappedType", 177],
    ["LiteralType", 178],
    ["ImportType", 179],
    ["ObjectBindingPattern", 180],
    ["ArrayBindingPattern", 181],
    ["BindingElement", 182],
    ["ArrayLiteralExpression", 183],
    ["ObjectLiteralExpression", 184],
    ["PropertyAccessExpression", 185],
    ["ElementAccessExpression", 186],
    ["CallExpression", 187],
    ["NewExpression", 188],
    ["TaggedTemplateExpression", 189],
    ["TypeAssertionExpression", 190],
    ["ParenthesizedExpression", 191],
    ["FunctionExpression", 192],
    ["ArrowFunction", 193],
    ["DeleteExpression", 194],
    ["TypeOfExpression", 195],
    ["VoidExpression", 196],
    ["AwaitExpression", 197],
    ["PrefixUnaryExpression", 198],
    ["PostfixUnaryExpression", 199],
    ["BinaryExpression", 200],
    ["ConditionalExpression", 201],
    ["TemplateExpression", 202],
    ["YieldExpression", 203],
    ["SpreadElement", 204],
    ["ClassExpression", 205],
    ["OmittedExpression", 206],
    ["ExpressionWithTypeArguments", 207],
    ["AsExpression", 208],
    ["NonNullExpression", 209],
    ["MetaProperty", 210],
    ["TemplateSpan", 211],
    ["SemicolonClassElement", 212],
    ["Block", 213],
    ["VariableStatement", 214],
    ["EmptyStatement", 215],
    ["ExpressionStatement", 216],
    ["IfStatement", 217],
    ["DoStatement", 218],
    ["WhileStatement", 219],
    ["ForStatement", 220],
    ["ForInStatement", 221],
    ["ForOfStatement", 222],
    ["ContinueStatement", 223],
    ["BreakStatement", 224],
    ["ReturnStatement", 225],
    ["WithStatement", 226],
    ["SwitchStatement", 227],
    ["LabeledStatement", 228],
    ["ThrowStatement", 229],
    ["TryStatement", 230],
    ["DebuggerStatement", 231],
    ["VariableDeclaration", 232],
    ["VariableDeclarationList", 233],
    ["FunctionDeclaration", 234],
    ["ClassDeclaration", 235],
    ["InterfaceDeclaration", 236],
    ["TypeAliasDeclaration", 237],
    ["EnumDeclaration", 238],
    ["ModuleDeclaration", 239],
    ["ModuleBlock", 240],
    ["CaseBlock", 241],
    ["NamespaceExportDeclaration", 242],
    ["ImportEqualsDeclaration", 243],
    ["ImportDeclaration", 244],
    ["ImportClause", 245],
    ["NamespaceImport", 246],
    ["NamedImports", 247],
    ["ImportSpecifier", 248],
    ["ExportAssignment", 249],
    ["ExportDeclaration", 250],
    ["NamedExports", 251],
    ["ExportSpecifier", 252],
    ["MissingDeclaration", 253],
    ["ExternalModuleReference", 254],
    ["JsxElement", 255],
    ["JsxSelfClosingElement", 256],
    ["JsxOpeningElement", 257],
    ["JsxClosingElement", 258],
    ["JsxFragment", 259],
    ["JsxOpeningFragment", 260],
    ["JsxClosingFragment", 261],
    ["JsxAttribute", 262],
    ["JsxAttributes", 263],
    ["JsxSpreadAttribute", 264],
    ["JsxExpression", 265],
    ["CaseClause", 266],
    ["DefaultClause", 267],
    ["HeritageClause", 268],
    ["CatchClause", 269],
    ["PropertyAssignment", 270],
    ["ShorthandPropertyAssignment", 271],
    ["SpreadAssignment", 272],
    ["EnumMember", 273],
    ["SourceFile", 274],
    ["Bundle", 275],
    ["UnparsedSource", 276],
    ["InputFiles", 277],
    ["JSDocTypeExpression", 278],
    ["JSDocAllType", 279],
    ["JSDocUnknownType", 280],
    ["JSDocNullableType", 281],
    ["JSDocNonNullableType", 282],
    ["JSDocOptionalType", 283],
    ["JSDocFunctionType", 284],
    ["JSDocVariadicType", 285],
    ["JSDocComment", 286],
    ["JSDocTypeLiteral", 287],
    ["JSDocSignature", 288],
    ["JSDocTag", 289],
    ["JSDocAugmentsTag", 290],
    ["JSDocClassTag", 291],
    ["JSDocCallbackTag", 292],
    ["JSDocParameterTag", 293],
    ["JSDocReturnTag", 294],
    ["JSDocTypeTag", 295],
    ["JSDocTemplateTag", 296],
    ["JSDocTypedefTag", 297],
    ["JSDocPropertyTag", 298],
    ["SyntaxList", 299],
    ["NotEmittedStatement", 300],
    ["PartiallyEmittedExpression", 301],
    ["CommaListExpression", 302],
    ["MergeDeclarationMarker", 303],
    ["EndOfDeclarationMarker", 304],
    ["Count", 305],
    ["FirstAssignment", 58],
    ["LastAssignment", 70],
    ["FirstCompoundAssignment", 59],
    ["LastCompoundAssignment", 70],
    ["FirstReservedWord", 72],
    ["LastReservedWord", 107],
    ["FirstKeyword", 72],
    ["LastKeyword", 145],
    ["FirstFutureReservedWord", 108],
    ["LastFutureReservedWord", 116],
    ["FirstTypeNode", 161],
    ["LastTypeNode", 179],
    ["FirstPunctuation", 17],
    ["LastPunctuation", 70],
    ["FirstToken", 0],
    ["LastToken", 145],
    ["FirstTriviaToken", 2],
    ["LastTriviaToken", 7],
    ["FirstLiteralToken", 8],
    ["LastLiteralToken", 13],
    ["FirstTemplateToken", 13],
    ["LastTemplateToken", 16],
    ["FirstBinaryOperator", 27],
    ["LastBinaryOperator", 70],
    ["FirstNode", 146],
    ["FirstJSDocNode", 278],
    ["LastJSDocNode", 298],
    ["FirstJSDocTagNode", 289],
    ["LastJSDocTagNode", 298],
]
