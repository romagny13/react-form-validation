export function clone(obj) {
    return Object.assign({}, obj);
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

export function getConfig(props, names, onChange, onBlur) {
    let rest = omit(props, names);
    return Object.assign({}, rest, {
        onChange,
        onBlur
    });
}

export function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}
