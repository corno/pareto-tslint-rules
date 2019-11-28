
export function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here: " + x)
}

export function parseInteger(str: string) {
    const parsed = Number(str)
    if (isNaN(parsed)) {
        return null
    } else {
        if (Number.isInteger(parsed)) {
            return parsed
        }
        return null
    }
}

export function parseJSON(data: string): any | null {
    let json
    try {
        json = JSON.parse(data)
    } catch (e) {
        return null
    }
    return json
}
