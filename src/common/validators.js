export function isRequired(value) {
    return value === null || typeof value === 'undefined' || value === '' || (typeof value === 'boolean' && value === false);
}

export function formatMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

export const required = (message, name = 'required') => {
    let error = typeof message === 'string' ? message : 'This field is required.';
    return (value) => {
        if (isRequired(value)) {
            return {
                name,
                error
            };
        }
    };
};

export const minLength = (minLength, message, name = 'minLength') => {
    let _minLength = typeof minLength === 'number' ? minLength : 3;
    let error = typeof message === 'string' ? message : formatMessage('Please enter at least than {0} characters.', '{0}', _minLength);
    return (value) => {
        if (!isRequired(value) && value.length < _minLength) {
            return {
                name,
                error
            };
        }
    };
};

export const maxLength = (maxLength, message, name = 'maxLength') => {
    let _maxLength = typeof maxLength === 'number' ? maxLength : 30;
    let error = typeof message === 'string' ? message : formatMessage('Please enter no more than {0} characters.', '{0}', _maxLength);
    return (value) => {
        if (!isRequired(value) && value.length > _maxLength) {
            return {
                name,
                error
            };
        }
    };
};

export const pattern = (pattern, message, name = 'pattern') => {
    let error = typeof message === 'string' ? message : 'Please fix this field.';
    return (value) => {
        if (!isRequired(value) && !pattern.test(value)) {
            return {
                name,
                error
            };
        }
    };
};

export const custom = (fn, message, name = 'custom') => {
    let error = typeof message === 'string' ? message : 'Please fix this field.';
    return (value, model) => {
        if (!isRequired(value) && !fn(value, model)) {
            return {
                name,
                error
            };
        }
    };
};
