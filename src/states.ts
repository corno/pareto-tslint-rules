
//tslint:disable: pareto

export class Optional<T> {
    public readonly value: null | T
    constructor(value: null | T) {
        this.value = value
    }
    public mapOptional<NewType>(callback: (t: T) => Optional<NewType>): Optional<NewType> {
        if (this.value === null) {
            return new Optional<NewType>(null)
        } else {
            return callback(this.value)
        }
    }
    public rework<NewType>(p: { onNotExist: () => NewType, onExists: (t: T) => NewType }): NewType {
        if (this.value === null) {
            return p.onNotExist()
        } else {
            return p.onExists(this.value)
        }
    }
}

export function notSet<T>(_p: {}): Optional<T> {
    return new Optional<T>(null)
}
export function set<T>(t: T): Optional<T> {
    return new Optional(t)
}

export function wrapPossiblyUndefined<T>(t?: T): Optional<T> {
    if (t === undefined) {
        return new Optional<T>(null)
    } else {
        return new Optional(t)
    }
}

export type Maybe<T> = Optional<T>

export interface IInArray<T> {
    forEach(callback: (element: T) => void): void
    map<NewType>(callback: (element: T, index: number) => NewType): IInArray<NewType>
}

export class MyArray<T> implements IInArray<T> {
    private readonly array: ReadonlyArray<T>
    constructor(array: ReadonlyArray<T>) {
        this.array = array
    }
    public forEach(callback: (element: T) => void) {
        this.array.forEach(callback)
    }
    public map<NewType>(callback: (element: T, index: number) => NewType) {
        return this.array.map(callback)
    }
    public flatten<NewType>(callback: (t: T) => ReadonlyArray<NewType>): MyArray<NewType> {
        let newArray: Array<NewType> = []
        this.array.forEach(element => {
            newArray = newArray.concat(callback(element))
        })
        return new MyArray(newArray)
    }
    public filter<NewType>(callback: (t: T) => null | NewType): MyArray<NewType> {
        const target: Array<NewType> = []
        this.array.forEach(element => {
            const result = callback(element)
            if (result !== null) {
                target.push(result)
            }
        })
        return new MyArray(target)
    }
    public filterDep<NewType>(callback: (t: T) => Maybe<NewType>): MyArray<NewType> {
        const target: Array<NewType> = []
        this.array.forEach(element => {
            const result = callback(element)
            if (result.value !== null) {
                target.push(result.value)
            }
        })
        return new MyArray(target)
    }
    public onElementAmount<ReturnType>(p: {
        onZero: () => ReturnType,
        onOne: (element: T) => ReturnType,
        onMultiple: (array: NonEmptyArray<T>) => ReturnType
    }): ReturnType {
        if (this.array.length === 0) {
            return p.onZero()
        } else if (this.array.length === 1) {
            return p.onOne(this.array[0])
        } else {
            return p.onMultiple(new NonEmptyArray(this.array))
        }
    }
}

export function wrapArray<T>(array: ReadonlyArray<T>) {
    return new MyArray(array)
}

export function assertUnreachable<ReturnType>(_x: never): ReturnType {
    throw new Error("Should not be reached")
}

export class NonEmptyArray<T> {
    private readonly array: ReadonlyArray<T>
    constructor(array: ReadonlyArray<T>) {
        this.array = array
    }
    public allButFirst(_p: {}) {
        const newArray: Array<T> = []
        this.array.forEach((element, index) => {
            if (index !== 0) {
                newArray.push(element)
            }
        })
        return newArray
    }
    public allButLast(_p: {}) {
        const newArray: Array<T> = []
        this.array.forEach((element, index) => {
            if (index !== this.array.length - 1) {
                newArray.push(element)
            }
        })
        return newArray
    }
}

export function sideEffect(callback: () => void): void {
    // tslint:disable-next-line: pareto
    callback()
}

export function assertDefined<T>(p: { value: undefined | T, onError: () => void }) {
    if (p.value === undefined) {
        p.onError()
    }
}

export function undefinedToNull<T>(t: undefined | T): null | T {
    if (t === undefined) {
        return null
    } else {
        return t
    }
}

export function convertPossiblyNull<T, NewValue>(t: null | T, callback: (value: T) => NewValue): null | NewValue {
    if (t === null) {
        return null
    } else {
        return callback(t)
    }
}
