#include <stdio.h>
#include <stdlib.h>

typedef struct Foo
{
    int a;
    int b;
} Foo;

typedef struct FooData
{
    int arrayLength;
    Foo *array;
} FooData;

typedef void (*Foo_callback)(void *data, Foo *element);

typedef struct FooArray
{
    FooData *data;
} FooArray;

void FooArray_forEach(FooData *fooData, void* data, Foo_callback callback)
{
    for (int i = 0; i != fooData->arrayLength; i += 1)
    {
        (*callback)(data, &fooData->array[i]);
    }
}

void justAFunctionCallback(int *data, Foo *element) {
    printf("WOOOOOT x= %d, a = %d, b = %d\n", *data, element->a, element->b);
}

void justAFunction(FooArray fooArray)
{
    int x = 6;
    FooArray_forEach(fooArray.data, &x, &justAFunctionCallback);
}

int main()
{
    FooData fooData;
    fooData.arrayLength = 2;
    fooData.array = malloc(sizeof(Foo) * 2);
    fooData.array[0].a = 2;
    fooData.array[0].b = 43;
    fooData.array[1].a = 2343;
    fooData.array[1].b = 77;

    FooArray fooArray;
    fooArray.data = &fooData;
    justAFunction(fooArray);
    // fooArray.forEach =

    //     for (int i = 0; i != arrayLength; i += 1)
    // {
    //     printf("ASCII value = %d, Character = %d\n", myArray[i].a, myArray[i].b);
    // }
}
