import { isUndefined, isDefined, isNumber, isBoolean } from './util';

export class RequiredValidator {
    constructor() {
        this.name = 'required';
    }
    validate(value) {
        if (value === null || isUndefined(value) || value === '' || (isBoolean(value) && value === false)) {
            return false;
        }
        else {
            return true;
        }
    }
}

export class MinLengthValidator {
    constructor(minLength) {
        this.name = 'minLength';
        this.minLength = isNumber(minLength) ? minLength : 3;
    }

    validate(value) {
        if (value && value.length < this.minLength) {
            return false;
        }
        else {
            return true;
        }
    }
}

export class MaxLengthValidator {
    constructor(maxLength) {
        this.name = 'maxLength';
        this.maxLength = isNumber(maxLength) ? maxLength : 30;
    }

    validate(value) {
        if (value && value.length > this.maxLength) {
            return false;
        }
        else {
            return true;
        }
    }
}

export class PatternValidator {
    constructor(pattern) {
        this.name = 'pattern';
        this.pattern = pattern;
    }
    validate(value) {
        if (isDefined(value) && !this.pattern.test(value)) {
            return false;
        }
        else {
            return true;
        }
    }
}

export class CustomValidator {
    constructor(fn, name) {
        this.name = name ? name : 'custom';
        this.fn = fn;
    }
    validate(value) {
        if (!this.fn(value)) {
            return false;
        }
        else {
            return true;
        }
    }
}

export class Validator {
    static required() {
        return new RequiredValidator();
    }
    static minLength(minLength) {
        return new MinLengthValidator(minLength);
    }
    static maxLength(maxLength) {
        return new MaxLengthValidator(maxLength);
    }
    static pattern(pattern) {
        return new PatternValidator(pattern);
    }
    static custom(fn, name) {
        return new CustomValidator(fn, name);
    }
}