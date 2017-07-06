export function isUndefined(value) { return typeof value === 'undefined'; }
export function isDefined(value) { return typeof value !== 'undefined'; }
export function isString(value) { return typeof value === 'string'; }
export function isNumber(value) { return typeof value === 'number'; }
export function isObject(value) { return value !== null && typeof value === 'object'; }
export function isFunction(value) { return typeof value === 'function'; }
export function isBoolean(value) { return typeof value === 'boolean'; }
export function isDate(value) { return toString.call(value) === '[object Date]'; }
export let isArray = Array.isArray;
export function isPromise(obj) { return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'; }

export function extend(source, target) {
    if (typeof source === 'object') {
        for (let name in source) {
            if (!target.hasOwnProperty(name)) {
                let sourceValue = source[name];
                if (isArray(sourceValue)) {
                    target[name] = sourceValue.slice(0);
                }
                else if (isObject(sourceValue)) {
                    target[name] = extend(sourceValue, {});
                }
                else {
                    target[name] = sourceValue;
                }
            }
        }
    }
    return target;
}

export function clone(obj) {
    return extend(obj, {});
}

export function omit(obj, names = []) {
    let result = {};
    for (let name in obj) {
        if (obj.hasOwnProperty(name) && names.indexOf(name) === -1) {
            result[name] = obj[name];
        }
    }
    return result;
}
