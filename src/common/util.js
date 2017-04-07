export function isUndefined(value) { return typeof value === 'undefined'; }
export function isDefined(value) { return typeof value !== 'undefined'; }
export function isString(value) { return typeof value === 'string'; }
export function isNumber(value) { return typeof value === 'number'; }
export function isBoolean(value) { return typeof value === 'boolean'; }
export function isFunction(value) { return typeof value === 'function'; }
export let isArray = Array.isArray;

export function omit(obj, names = []) {
    let result = {};
    for (let name in obj) {
        if (obj.hasOwnProperty(name) && names.indexOf(name) === -1){
            result[name] = obj[name];
        }
    }
    return result;
}