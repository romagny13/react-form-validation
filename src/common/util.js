export function isUndefined(value) { return typeof value === 'undefined'; }
export function isDefined(value) { return typeof value !== 'undefined'; }
export function isString(value) { return typeof value === 'string'; }
export function isNumber(value) { return typeof value === 'number'; }
export function isBoolean(value) { return typeof value === 'boolean'; }
export function isFunction(value) { return typeof value === 'function'; }
export let isArray = Array.isArray;

export function getInitialFormState(formConfig) {
    let formState = {};
    for (let name in formConfig) {
        if (formConfig.hasOwnProperty(name)) {
            formState[name] = { hasError: false, errors: {} };
        }
    }
    return formState;
}

export function getElementValue(element) {
    let tagName = element.tagName;
    if (tagName === 'INPUT') {
        if (element.type === 'checkbox') {
            return element.value !== 'on' ? element.value : element.checked;
        }
        else {
            return element.value;
        }
    }
    else if (tagName === 'TEXTAREA') {
        return element.value;
    }
    else if (tagName === 'SELECT') {
        return element.options[element.selectedIndex].value;
    }
}

export function validateValue(value, validators) {
    const result = {
        hasError: false,
        errors: {}
    };
    validators.forEach((validator) => {
        if (!validator.validate(value)) {
            result.hasError = true;
            result.errors[validator.name] = validator.error;
        }
    });
    return result;
}

export function objLength(obj) {
    return Object.keys(obj).length;
}

export function firstProp(obj) {
    return obj[Object.keys(obj)[0]];
}

export function getInputInitialValue(type, value) {
    if (isDefined(value)) {
        return value;
    }
    else {
        return '';
    }
}

export function omit(obj, names = []) {
    let result = {};
    for (let name in obj) {
        if (obj.hasOwnProperty(name) && names.indexOf(name) === -1){
            result[name] = obj[name];
        }
    }
    return result;
}