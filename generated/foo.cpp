
#include <Vector>

typedef struct {
    void (*forEach)(void*);
    const void * data;
} Optional;

typedef int IInArray;
typedef int MyArray;

typedef /*Maybe*/ Optional Maybe;

typedef /*StringLiteral*/ struct {
    const char* text;
} StringLiteral;

typedef /*ArrowFunctionBodyKind*/ int/*tu*/ ArrowFunctionBodyKind;

typedef /*ArrowFunctionBody*/ struct {
    const ArrowFunctionBodyKind kind;
} ArrowFunctionBody;

typedef /*ObjectLiteralPropertyType*/ void/*tu*/ ObjectLiteralPropertyType;

typedef /*CallSignature*/ struct {
    const int argument;
} CallSignature;

typedef /*ExpressionKind*/ int/*tu*/ ExpressionKind;

typedef /*Expression*/ struct {
    const int kind;
} Expression;

typedef /*TypeNodeKind*/ int/*tu*/ TypeNodeKind;

typedef /*PlainOldDataTypeNode*/ struct {
    const TypeNodeKind kind;
} PlainOldDataTypeNode;

typedef /*VariableStatementDeclaration*/ struct {
    const char* name;
    const Optional type;
    const Expression initializer;
} VariableStatementDeclaration;

typedef /*Clause*/ struct {
    const char* label;
    const int block;
} Clause;

typedef /*Condition*/ struct {
    const int x;
} Condition;

typedef /*StatementKind*/ int/*tu*/ StatementKind;

typedef /*Statement*/ struct {
    const StatementKind kind;
} Statement;

typedef /*Block*/ struct {
    const IInArray variables;
    const IInArray sideEffects;
    const Statement statement;
} Block;

typedef /*Parameter*/ struct {
    const int/*tu*/ kind;
} Parameter;

typedef /*FunctionSignature*/ struct {
    const char* name;
    const Parameter parameter;
} FunctionSignature;

typedef /*FunctionDeclaration*/ struct {
    const FunctionSignature signature;
    const Block body;
} FunctionDeclaration;

typedef /*MethodDeclaration*/ struct {
    const FunctionSignature signature;
    const Block body;
} MethodDeclaration;

typedef /*ConstructorDeclaration*/ struct {
    const int foo;
} ConstructorDeclaration;

typedef /*ClassMemberKind*/ int/*tu*/ ClassMemberKind;

typedef /*ClassMember*/ struct {
    const ClassMemberKind kind;
} ClassMember;

typedef /*InterfaceDeclarationMember*/ struct {
    const FunctionSignature signature;
} InterfaceDeclarationMember;

typedef /*InterfaceDeclaration*/ struct {
    const IInArray members;
} InterfaceDeclaration;

typedef /*ImportDeclaration*/ struct {
    const struct {
        const Optional name;
        const Optional namedBindings;
    } importClause;
    const char* moduleSpecifier;
} ImportDeclaration;

typedef /*ClassDeclaration*/ struct {
    const char* name;
    const IInArray members;
} ClassDeclaration;

typedef /*TypeAliasDeclaration*/ struct {
    const char* name;
    const PlainOldDataTypeNode type;
} TypeAliasDeclaration;

typedef /*SourceFile*/ struct {
    const IInArray importDeclarations;
    const IInArray typeAliasDeclarations;
    const IInArray classDeclarations;
    const IInArray functionDeclarations;
    const IInArray interfaceDeclarations;
} SourceFile;

void Foo(int * element) {

}

int main() {
    const int y = 3;
    Optional x;
    x.data = &y;
    x.forEach = Foo;
}
