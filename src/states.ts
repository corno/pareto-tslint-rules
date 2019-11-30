
export class STUB {
    public readonly stub = "stub"
}
export const stub = new STUB()

// class Missing {
//     public readonly missing = "missing"
// }
// const missing = new Missing()

// class Optional {
//     public readonly optional = "optional"
// }
// const optional = new Optional()


export type Optional<T> = ["not set"] | ["set", T]
export function notSet<T>(): Optional<T> {
    return ["not set"]
}
export function set<T>(t: T): Optional<T> {
    return ["set", t]
}

export type PossiblyMissing<T> = ["missing"] | ["present", T]
export function present<T>(t: T): PossiblyMissing<T> {
    return ["present", t]
}

export type PossiblyUnsupported<T> = ["unsupported"] | ["supported", T]
export function supported<T>(t: T): PossiblyUnsupported<T> {
    return ["supported", t]
}
