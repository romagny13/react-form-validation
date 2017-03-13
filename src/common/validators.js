import { isUndefined, isDefined, isString, isNumber, isBoolean } from './util';

export function isRequired(value) {
    return value === null || isUndefined(value) || value === '' || (isBoolean(value) && value === false);
}

export function formatMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

export class RequiredValidator {
    constructor(message) {
        this.name = 'required';
        this.message = isString(message) ? message : 'This field is required.';
    }

    validate(value) {
        if (isRequired(value)) {
            this.error = this.message;
            return false;
        }
        else {
            this.error = undefined;
            return true;
        }
    }
}

export class MinLengthValidator {
    constructor(minLength, message) {
        this.name = 'minLength';
        this.minLength = isNumber(minLength) ? minLength : 3;
        this.message = isString(message) ? message : formatMessage('Please enter at least than {0} characters.', '{0}', minLength);
    }

    validate(value) {
        if (!isRequired(value) && value.length < this.minLength) {
            // error
            this.error = this.message;
            return false;
        }
        else {
            this.error = undefined;
            return true;
        }
    }
}

export class MaxLengthValidator {
    constructor(maxLength, message) {
        this.name = 'maxLength';
        this.maxLength = isNumber(maxLength) ? maxLength : 30;
        this.message = isString(message) ? message : formatMessage('Please enter no more than {0} characters.', '{0}', maxLength);
    }

    validate(value) {
        if (!isRequired(value) && value.length > this.maxLength) {
            // error
            this.error = this.message;
            return false;
        }
        else {
            this.error = undefined;
            return true;
        }
    }
}

export class PatternValidator {
    constructor(pattern, message) {
        this.name = isString(name) ? name : 'pattern';
        this.pattern = pattern;
        this.message = isString(message) ? message : 'Please fix this field.';
    }
    validate(value) {
        if (!isRequired(value) && !this.pattern.test(value)) {
            this.error = this.message;
            return false;
        }
        else {
            this.error = undefined;
            return true;
        }
    }
}

export class CustomValidator {
    constructor(fn, message, name) {
        this.fn = fn;
        this.name = isString(name) ? name : 'custom';
        this.message = isString(message) ? message : 'Please fix this field.';
    }
    validate(value) {
        if (!isRequired(value) && !this.fn(value)) {
            this.error = this.message;
            return false;
        }
        else {
            this.error = undefined;
            return true;
        }
    }
}

export class Validator {
    static required(message) {
        return new RequiredValidator(message);
    }
    static minLength(minLength, message) {
        return new MinLengthValidator(minLength, message);
    }
    static maxLength(maxLength, message) {
        return new MaxLengthValidator(maxLength, message);
    }
    static pattern(pattern, message, name) {
        return new PatternValidator(pattern, message, name);
    }
    static custom(fn, message, name) {
        return new CustomValidator(fn, message, name);
    }
}
