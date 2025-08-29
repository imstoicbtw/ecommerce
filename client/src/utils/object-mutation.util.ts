export function getIn (state: any, path: string) {
    return path
        .split(".")
        .reduce((state, key) => {
            return state == null ? undefined : state[key];
        }, state);
}


export function setIn (object: any, path: string, value: any) {
    const keys = path.split(".");
    for (const [ index, key ] of keys.entries()) {
        if (index === keys.length - 1) break;
        if (object[key] == null || typeof object[key] !== "object") object[key] = {};
        object = object[key];
    }
    object[keys[keys.length - 1]] = value;
}