import { isObject, isArray } from '../common/util';

/**
 * Extends the target object with the source object.
 * @param {Object} source 
 * @param {Object} target 
 * @return {Object} The target object.
 */
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

/**
 * Clones an object.
 * @param {Object} obj 
 */
export function clone(obj) {
    return extend(obj, {});
}

/**
 * Returns the source object without the omitted names.
 * @param {Object} obj 
 * @param {Array} names
 */
export function omit(obj, names = []) {
    let result = {};
    for (let name in obj) {
        if (obj.hasOwnProperty(name) && names.indexOf(name) === -1) {
            result[name] = obj[name];
        }
    }
    return result;
}
