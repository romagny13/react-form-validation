const defaultErrorMessages = {
    required: 'This field is required.',
    minlength: 'Please enter at least than {0} characters.',
    maxlength: 'Please enter no more than {0} characters.',
    pattern: 'Please fix this field.',
    email: 'Please enter a valid email address.',
    custom: 'Please fix this field.'
};

export function formatErrorMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

export function isNullOrEmpty(value) {
    return value === null || typeof value === 'undefined' || value === '';
}

export const required = (message) => {
    let error = typeof message === 'string' ? message : defaultErrorMessages.required;
    return (value) => {
        if (isNullOrEmpty(value) || (typeof value === 'boolean' && value === false)) {
            return error;
        }
    };
};

export const minlength = (minLength, message) => {
    let _minLength = typeof minLength === 'number' ? minLength : 3;
    let error = typeof message === 'string' ? message : formatErrorMessage(defaultErrorMessages.minlength, '{0}', _minLength);
    return (value) => {
        if (!isNullOrEmpty(value) && value.length < _minLength) {
            return error;
        }
    };
};

export const maxlength = (maxLength, message) => {
    let _maxLength = typeof maxLength === 'number' ? maxLength : 30;
    let error = typeof message === 'string' ? message : formatErrorMessage(defaultErrorMessages.maxlength, '{0}', _maxLength);
    return (value) => {
        if (!isNullOrEmpty(value) && value.length > _maxLength) {
            return error;
        }
    };
};

export const pattern = (pattern, message) => {
    let error = typeof message === 'string' ? message : defaultErrorMessages.pattern;
    return (value) => {
        if (!isNullOrEmpty(value) && !pattern.test(value)) {
            return error;
        }
    };
};

export const email = (message) => {
    let error = typeof message === 'string' ? message : defaultErrorMessages.email;
    return pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, error);
};

export const custom = (fn, message) => {
    let error = typeof message === 'string' ? message : defaultErrorMessages.custom;
    return (value, model) => {
        if (!isNullOrEmpty(value) && !fn(value, model)) {
            return error;
        }
    };
};
