export function isUndefined(value) { return typeof value === 'undefined'; }
export function isDefined(value) { return typeof value !== 'undefined'; }
export function isString(value) { return typeof value === 'string'; }
export function isNumber(value) { return typeof value === 'number'; }
export function isBoolean(value) { return typeof value === 'boolean'; }
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

export function formHasError(controls) {
    for (let name in controls) {
        if (controls.hasOwnProperty(name)) {
            let control = controls[name];
            if (control.hasError) {
                return true;
            }
        }
    }
    return false;
}

export function omit(obj, omitKeys) {
    let result = {};
    for (let name in obj) {
        if (omitKeys.indexOf(name) == -1) {
            result[name] = obj[name];
        }
    }
    return result;
}

export function validateValue(value, validators) {
    const result = {
        hasError: false,
        errors: {}
    };
    validators.forEach((validator) => {
        if (!validator.validate(value)) {
            result.hasError = true;
            result.errors[validator.name] = validator.name;
        }
    });
    return result;
}
