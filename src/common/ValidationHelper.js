import { isObject } from './Util';

export class ValidationHelper {

    static validateValue(model, value, validations) {
        for (let i = 0; i < validations.length; i++) {
            let validator = validations[i];
            let error = validator(value, model);
            if (error) {
                return error;
            }
        }
    }

    static validateProperty(model, name, validations) {
        let value = model[name];
        return ValidationHelper.validateValue(model, value, validations);
    }

    static hasValidations(name, validations) {
        return validations.hasOwnProperty(name);
    }

    static countErrors(errors) {
        return Object.keys(errors).length;
    }

    static hasErrors(errors) {
        return isObject(errors) && ValidationHelper.countErrors(errors) > 0;
    }

    static validateAll(model, validations) {
        let errors = {};

        for (let name in validations) {
            if (ValidationHelper.hasValidations(name, validations)) {
                let fieldValidations = validations[name];
                if (!Array.isArray(fieldValidations)) { throw new Error('Validations require an Array'); }

                let error = ValidationHelper.validateProperty(model, name, fieldValidations);
                if (error) {
                    errors[name] = error;
                }
            }
        }

        return errors;
    }
}