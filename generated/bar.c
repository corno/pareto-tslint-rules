typedef int Optional;
typedef int MyArray;
typedef int IInArray;




typedef struct StringLiteral {
    const char* text;
} StringLiteral;

typedef struct ArrowFunctionBodyKind_Block {
    const int/*XX*/ block;
} ArrowFunctionBodyKind_Block;

typedef ArrowFunctionBodyKind_Block UArrowFunctionBodyKind_Block;

typedef enum enum_ArrowFunctionBodyKind {  
    opt_ArrowFunctionBodyKind_Block = 0,   
} enum_ArrowFunctionBodyKind;

typedef union union_ArrowFunctionBodyKind {
    UArrowFunctionBodyKind_Block _Block;   
} union_ArrowFunctionBodyKind;

typedef struct ArrowFunctionBodyKind {
    enum_ArrowFunctionBodyKind state;
    union_ArrowFunctionBodyKind data;
} ArrowFunctionBodyKind;

typedef struct ArrowFunctionBody {
    const ArrowFunctionBodyKind kind;
} ArrowFunctionBody;

typedef struct ObjectLiteralPropertyType_PropertyAssignment {
    const char* name;
    const int/*XX*/ initializer;
} ObjectLiteralPropertyType_PropertyAssignment;

typedef ObjectLiteralPropertyType_PropertyAssignment UObjectLiteralPropertyType_PropertyAssignment;

typedef enum enum_ObjectLiteralPropertyType {
    opt_ObjectLiteralPropertyType_PropertyAssignment = 0,
} enum_ObjectLiteralPropertyType;

typedef union union_ObjectLiteralPropertyType {
    UObjectLiteralPropertyType_PropertyAssignment _PropertyAssignment;
} union_ObjectLiteralPropertyType;

typedef struct ObjectLiteralPropertyType {
    enum_ObjectLiteralPropertyType state;
    union_ObjectLiteralPropertyType data;
} ObjectLiteralPropertyType;

typedef struct CallSignature {
    const int/*XX*/ argument;
} CallSignature;

typedef struct ExpressionKind_ArrayLiteralExpression {
    const IInArray elements;
} ExpressionKind_ArrayLiteralExpression;

typedef ExpressionKind_ArrayLiteralExpression UExpressionKind_ArrayLiteralExpression;

typedef struct ExpressionKind_ArrowFunction {
    const ArrowFunctionBody body;
} ExpressionKind_ArrowFunction;

typedef ExpressionKind_ArrowFunction UExpressionKind_ArrowFunction;

typedef struct ExpressionKind_CallExpression {
    const int/*XX*/ expression;
    const CallSignature callSignature;
} ExpressionKind_CallExpression;

typedef ExpressionKind_CallExpression UExpressionKind_CallExpression;

typedef struct ExpressionKind_Identifier {
    const char* text;
} ExpressionKind_Identifier;

typedef ExpressionKind_Identifier UExpressionKind_Identifier;

typedef struct ExpressionKind_ElementAccessExpression {
    const int/*XX*/ expression;
    const int/*XX*/ argumentExpression;
} ExpressionKind_ElementAccessExpression;

typedef ExpressionKind_ElementAccessExpression UExpressionKind_ElementAccessExpression;

typedef struct ExpressionKind_FalseKeyword {
    char dummyBecauseEmptyStruct;
} ExpressionKind_FalseKeyword;

typedef ExpressionKind_FalseKeyword UExpressionKind_FalseKeyword;

typedef struct ExpressionKind_ObjectLiteralExpression {
    const IInArray properties;
} ExpressionKind_ObjectLiteralExpression;

typedef ExpressionKind_ObjectLiteralExpression UExpressionKind_ObjectLiteralExpression;

typedef struct ExpressionKind_NoSubstitutionTemplateLiteral {
    const char* text;
} ExpressionKind_NoSubstitutionTemplateLiteral;

typedef ExpressionKind_NoSubstitutionTemplateLiteral UExpressionKind_NoSubstitutionTemplateLiteral;

typedef struct ExpressionKind_NullKeyword {
    char dummyBecauseEmptyStruct;
} ExpressionKind_NullKeyword;

typedef ExpressionKind_NullKeyword UExpressionKind_NullKeyword;

typedef struct ExpressionKind_NewExpression {
    const char* className;
    const CallSignature callSignature;
} ExpressionKind_NewExpression;

typedef ExpressionKind_NewExpression UExpressionKind_NewExpression;

typedef struct ExpressionKind_OneKeyword {
    char dummyBecauseEmptyStruct;
} ExpressionKind_OneKeyword;

typedef ExpressionKind_OneKeyword UExpressionKind_OneKeyword;

typedef struct ExpressionKind_PropertyAccessExpression {
    const char* name;
    const int/*XX*/ expression;
} ExpressionKind_PropertyAccessExpression;

typedef ExpressionKind_PropertyAccessExpression UExpressionKind_PropertyAccessExpression;

typedef StringLiteral UExpressionKind_StringLiteral;

typedef struct ExpressionKind_TemplateExpression {
    const char* head;
    const IInArray templateSpans;
} ExpressionKind_TemplateExpression;

typedef ExpressionKind_TemplateExpression UExpressionKind_TemplateExpression;

typedef struct ExpressionKind_This {
    char dummyBecauseEmptyStruct;
} ExpressionKind_This;

typedef ExpressionKind_This UExpressionKind_This;

typedef struct ExpressionKind_TrueKeyword {
    char dummyBecauseEmptyStruct;
} ExpressionKind_TrueKeyword;

typedef ExpressionKind_TrueKeyword UExpressionKind_TrueKeyword;

typedef struct ExpressionKind_ZeroKeyword {
    char dummyBecauseEmptyStruct;
} ExpressionKind_ZeroKeyword;

typedef ExpressionKind_ZeroKeyword UExpressionKind_ZeroKeyword;

typedef enum enum_ExpressionKind {
    opt_ExpressionKind_ArrayLiteralExpression = 0,
    opt_ExpressionKind_ArrowFunction = 1,
    opt_ExpressionKind_CallExpression = 2,
    opt_ExpressionKind_Identifier = 3,
    opt_ExpressionKind_ElementAccessExpression = 4,
    opt_ExpressionKind_FalseKeyword = 5,
    opt_ExpressionKind_ObjectLiteralExpression = 6,
    opt_ExpressionKind_NoSubstitutionTemplateLiteral = 7,
    opt_ExpressionKind_NullKeyword = 8,
    opt_ExpressionKind_NewExpression = 9,
    opt_ExpressionKind_OneKeyword = 10,
    opt_ExpressionKind_PropertyAccessExpression = 11,
    opt_ExpressionKind_StringLiteral = 12,
    opt_ExpressionKind_TemplateExpression = 13,
    opt_ExpressionKind_This = 14,
    opt_ExpressionKind_TrueKeyword = 15,
    opt_ExpressionKind_ZeroKeyword = 16,
} enum_ExpressionKind;

typedef union union_ExpressionKind {
    UExpressionKind_ArrayLiteralExpression _ArrayLiteralExpression;
    UExpressionKind_ArrowFunction _ArrowFunction;
    UExpressionKind_CallExpression _CallExpression;
    UExpressionKind_Identifier _Identifier;
    UExpressionKind_ElementAccessExpression _ElementAccessExpression;
    UExpressionKind_FalseKeyword _FalseKeyword;
    UExpressionKind_ObjectLiteralExpression _ObjectLiteralExpression;
    UExpressionKind_NoSubstitutionTemplateLiteral _NoSubstitutionTemplateLiteral;
    UExpressionKind_NullKeyword _NullKeyword;
    UExpressionKind_NewExpression _NewExpression;
    UExpressionKind_OneKeyword _OneKeyword;
    UExpressionKind_PropertyAccessExpression _PropertyAccessExpression;
    UExpressionKind_StringLiteral _StringLiteral;
    UExpressionKind_TemplateExpression _TemplateExpression;
    UExpressionKind_This _This;
    UExpressionKind_TrueKeyword _TrueKeyword;
    UExpressionKind_ZeroKeyword _ZeroKeyword;
} union_ExpressionKind;

typedef struct ExpressionKind {
    enum_ExpressionKind state;
    union_ExpressionKind data;
} ExpressionKind;

typedef struct Expression {
    const ExpressionKind kind;
} Expression;

typedef struct GenericType_Array {
    char dummyBecauseEmptyStruct;
} GenericType_Array;

typedef GenericType_Array UGenericType_Array;

typedef struct GenericType_Optional {
    char dummyBecauseEmptyStruct;
} GenericType_Optional;

typedef GenericType_Optional UGenericType_Optional;

typedef enum enum_GenericType {
    opt_GenericType_Array = 0,
    opt_GenericType_Optional = 1,
} enum_GenericType;

typedef union union_GenericType {
    UGenericType_Array _Array;
    UGenericType_Optional _Optional;
} union_GenericType;

typedef struct GenericType {
    enum_GenericType state;
    union_GenericType data;
} GenericType;

typedef struct TypeNodeKind_Boolean {
    char dummyBecauseEmptyStruct;
} TypeNodeKind_Boolean;

typedef TypeNodeKind_Boolean UTypeNodeKind_Boolean;

typedef struct TypeNodeKind_Number {
    char dummyBecauseEmptyStruct;
} TypeNodeKind_Number;

typedef TypeNodeKind_Number UTypeNodeKind_Number;

typedef struct TypeNodeKind_String {
    char dummyBecauseEmptyStruct;
} TypeNodeKind_String;

typedef TypeNodeKind_String UTypeNodeKind_String;

typedef struct TypeNodeKind_Tuple {
    const IInArray elementTypes;
} TypeNodeKind_Tuple;

typedef TypeNodeKind_Tuple UTypeNodeKind_Tuple;

typedef struct TypeNodeKind_TypeLiteral {
    const IInArray members;
} TypeNodeKind_TypeLiteral;

typedef TypeNodeKind_TypeLiteral UTypeNodeKind_TypeLiteral;

typedef struct TypeNodeKind_TypeReference_kind_local {
    char dummyBecauseEmptyStruct;
} TypeNodeKind_TypeReference_kind_local;

typedef TypeNodeKind_TypeReference_kind_local UTypeNodeKind_TypeReference_kind_local;

typedef struct TypeNodeKind_TypeReference_kind_remote {
    const char* moduleName;
} TypeNodeKind_TypeReference_kind_remote;

typedef TypeNodeKind_TypeReference_kind_remote UTypeNodeKind_TypeReference_kind_remote;

typedef struct TypeNodeKind_TypeReference_kind_generic {
    const GenericType type;
    const IInArray typeArguments;
} TypeNodeKind_TypeReference_kind_generic;

typedef TypeNodeKind_TypeReference_kind_generic UTypeNodeKind_TypeReference_kind_generic;

typedef enum enum_TypeNodeKind_TypeReference_kind {
    opt_TypeNodeKind_TypeReference_kind_local = 0,
    opt_TypeNodeKind_TypeReference_kind_remote = 1,
    opt_TypeNodeKind_TypeReference_kind_generic = 2,
} enum_TypeNodeKind_TypeReference_kind;

typedef union union_TypeNodeKind_TypeReference_kind {
    UTypeNodeKind_TypeReference_kind_local _local;
    UTypeNodeKind_TypeReference_kind_remote _remote;
    UTypeNodeKind_TypeReference_kind_generic _generic;
} union_TypeNodeKind_TypeReference_kind;

typedef struct TypeNodeKind_TypeReference_kind {
    enum_TypeNodeKind_TypeReference_kind state;
    union_TypeNodeKind_TypeReference_kind data;
} TypeNodeKind_TypeReference_kind;

typedef struct TypeNodeKind_TypeReference {
    const TypeNodeKind_TypeReference_kind kind;
    const char* id;
} TypeNodeKind_TypeReference;

typedef TypeNodeKind_TypeReference UTypeNodeKind_TypeReference;

typedef struct TypeNodeKind_Optional {
    const int/*XX*/ type;
} TypeNodeKind_Optional;

typedef TypeNodeKind_Optional UTypeNodeKind_Optional;

typedef struct TypeNodeKind_TaggedUnion {
    const IInArray alternatives;
} TypeNodeKind_TaggedUnion;

typedef TypeNodeKind_TaggedUnion UTypeNodeKind_TaggedUnion;

typedef enum enum_TypeNodeKind {
    opt_TypeNodeKind_Boolean = 0,
    opt_TypeNodeKind_Number = 1,
    opt_TypeNodeKind_String = 2,
    opt_TypeNodeKind_Tuple = 3,
    opt_TypeNodeKind_TypeLiteral = 4,
    opt_TypeNodeKind_TypeReference = 5,
    opt_TypeNodeKind_Optional = 6,
    opt_TypeNodeKind_TaggedUnion = 7,
} enum_TypeNodeKind;

typedef union union_TypeNodeKind {
    UTypeNodeKind_Boolean _Boolean;
    UTypeNodeKind_Number _Number;
    UTypeNodeKind_String _String;
    UTypeNodeKind_Tuple _Tuple;
    UTypeNodeKind_TypeLiteral _TypeLiteral;
    UTypeNodeKind_TypeReference _TypeReference;
    UTypeNodeKind_Optional _Optional;
    UTypeNodeKind_TaggedUnion _TaggedUnion;
} union_TypeNodeKind;

typedef struct TypeNodeKind {
    enum_TypeNodeKind state;
    union_TypeNodeKind data;
} TypeNodeKind;

typedef struct PlainOldDataTypeNode {
    const TypeNodeKind kind;
} PlainOldDataTypeNode;

typedef struct VariableStatementDeclaration {
    const char* name;
    const Optional type;
    const Expression initializer;
} VariableStatementDeclaration;

typedef struct Clause {
    const char* label;
    const int/*XX*/ block;
} Clause;

typedef struct ConditionKind_NullCheck {
    char dummyBecauseEmptyStruct;
} ConditionKind_NullCheck;

typedef ConditionKind_NullCheck UConditionKind_NullCheck;

typedef struct ConditionKind_StateCheck {
    char dummyBecauseEmptyStruct;
} ConditionKind_StateCheck;

typedef ConditionKind_StateCheck UConditionKind_StateCheck;

typedef enum enum_ConditionKind {
    opt_ConditionKind_NullCheck = 0,
    opt_ConditionKind_StateCheck = 1,
} enum_ConditionKind;

typedef union union_ConditionKind {
    UConditionKind_NullCheck _NullCheck;
    UConditionKind_StateCheck _StateCheck;
} union_ConditionKind;

typedef struct ConditionKind {
    enum_ConditionKind state;
    union_ConditionKind data;
} ConditionKind;

typedef struct Condition {
    const ConditionKind kind;
} Condition;

typedef struct StatementKind_IfStatement {
    const IInArray conditions;
    const int/*XX*/ thenBlock;
    const int/*XX*/ elseBlock;
} StatementKind_IfStatement;

typedef StatementKind_IfStatement UStatementKind_IfStatement;

typedef struct StatementKind_ReturnStatement {
    const Expression expression;
} StatementKind_ReturnStatement;

typedef StatementKind_ReturnStatement UStatementKind_ReturnStatement;

typedef struct StatementKind_SwitchStatement {
    const Expression expression;
    const IInArray clauses;
} StatementKind_SwitchStatement;

typedef StatementKind_SwitchStatement UStatementKind_SwitchStatement;

typedef enum enum_StatementKind {
    opt_StatementKind_IfStatement = 0,
    opt_StatementKind_ReturnStatement = 1,
    opt_StatementKind_SwitchStatement = 2,
} enum_StatementKind;

typedef union union_StatementKind {
    UStatementKind_IfStatement _IfStatement;
    UStatementKind_ReturnStatement _ReturnStatement;
    UStatementKind_SwitchStatement _SwitchStatement;
} union_StatementKind;

typedef struct StatementKind {
    enum_StatementKind state;
    union_StatementKind data;
} StatementKind;

typedef struct Statement {
    const StatementKind kind;
} Statement;

typedef struct Block {
    const IInArray variables;
    const IInArray sideEffects;
    const Statement statement;
} Block;

typedef PlainOldDataTypeNode UParameter_kind_PlainOldData;

typedef struct Parameter_kind_Function {
    const int/*XX*/ parameter;
} Parameter_kind_Function;

typedef Parameter_kind_Function UParameter_kind_Function;

typedef enum enum_Parameter_kind {
    opt_Parameter_kind_PlainOldData = 0,
    opt_Parameter_kind_Function = 1,
} enum_Parameter_kind;

typedef union union_Parameter_kind {
    UParameter_kind_PlainOldData _PlainOldData;
    UParameter_kind_Function _Function;
} union_Parameter_kind;

typedef struct Parameter_kind {
    enum_Parameter_kind state;
    union_Parameter_kind data;
} Parameter_kind;

typedef struct Parameter {
    const Parameter_kind kind;
} Parameter;

typedef struct FunctionSignature {
    const char* name;
    const Parameter parameter;
} FunctionSignature;

typedef struct FunctionDeclaration {
    const FunctionSignature signature;
    const Block body;
} FunctionDeclaration;

typedef struct MethodDeclaration {
    const FunctionSignature signature;
    const Block body;
} MethodDeclaration;

typedef struct ConstructorDeclaration {
    char dummyBecauseEmptyStruct;
} ConstructorDeclaration;

typedef MethodDeclaration UClassMemberKind_MethodDeclaration;

typedef struct ClassMemberKind_PropertyDeclaration {
    const char* name;
    const PlainOldDataTypeNode type;
    const Optional initializer;
} ClassMemberKind_PropertyDeclaration;

typedef ClassMemberKind_PropertyDeclaration UClassMemberKind_PropertyDeclaration;

typedef enum enum_ClassMemberKind {
    opt_ClassMemberKind_MethodDeclaration = 0,
    opt_ClassMemberKind_PropertyDeclaration = 1,
} enum_ClassMemberKind;

typedef union union_ClassMemberKind {
    UClassMemberKind_MethodDeclaration _MethodDeclaration;
    UClassMemberKind_PropertyDeclaration _PropertyDeclaration;
} union_ClassMemberKind;

typedef struct ClassMemberKind {
    enum_ClassMemberKind state;
    union_ClassMemberKind data;
} ClassMemberKind;

typedef struct ClassMember {
    const ClassMemberKind kind;
} ClassMember;

typedef struct InterfaceDeclarationMember {
    const FunctionSignature signature;
} InterfaceDeclarationMember;

typedef struct InterfaceDeclaration {
    const IInArray members;
} InterfaceDeclaration;

typedef struct ImportDeclaration_importClause {
    const Optional name;
    const Optional namedBindings;
} ImportDeclaration_importClause;

typedef struct ImportDeclaration {
    const ImportDeclaration_importClause importClause;
    const char* moduleSpecifier;
} ImportDeclaration;

typedef struct ClassDeclaration {
    const char* name;
    const IInArray members;
} ClassDeclaration;

typedef struct TypeAliasDeclaration {
    const char* name;
    const PlainOldDataTypeNode type;
} TypeAliasDeclaration;

typedef struct SourceFile {
    const IInArray importDeclarations;
    const IInArray typeAliasDeclarations;
    const IInArray classDeclarations;
    const IInArray functionDeclarations;
    const IInArray interfaceDeclarations;
} SourceFile;








void main() {
    //enum_ConditionExpression cd = PropertyAccessExpression;
}