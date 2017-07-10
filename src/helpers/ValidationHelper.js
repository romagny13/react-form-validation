import { isObject } from '../common/util';

/**
 * Allows to validate a value, a property or a form model with validations (required, minlength, maxlength, pattern, email, custom).
 * 
 * @example
 * let model = {
 *   firstname: '',
 *   lastname: ''
* };
*
* let validations = {
 *  firstname: [required('Firstname required')],
 *  lastname: [required('Lastname required')]
* };
*
* let value = model['lastname'];
*
* let error = ValidationHelper.validateValue(model,value,validations);
* // error => 'Lastname required'
 * 
 */
export class ValidationHelper {

    /**
     * Checks the value with the validations (pass the model to the custom validations) and returns the first error message.
     * @param {Object} model 
     * @param {string|number|boolean} value 
     * @param {Array} validations 
     * @return {string|undefined} The first error message or undefined.
     */
    static validateValue(model, value, validations) {
        for (let i = 0; i < validations.length; i++) {
            let validator = validations[i];
            let error = validator(value, model);
            if (error) {
                return error;
            }
        }
    }

    /**
     * Checks the property name with the validations (pass the model to the custom validations) and returns the first error message.
     * 
     * @example
     * let error = ValidationHelper.validateProperty(model, 'lastname', validations);
     * // error => 'Lastname required'
     * 
     * @param {Object} model 
     * @param {string|number|boolean} name 
     * @param {Array} validations 
     * @return {string|undefined} The first error message or undefined.
     */
    static validateProperty(model, name, validations) {
        let value = model[name];
        return ValidationHelper.validateValue(model, value, validations);
    }

    /**
     * Checks if the validations object has validations for the name
     * 
     * @example
     * let errors = ValidationHelper.validateAll(model,validations);
     * // errors => {firstname: 'Firstname required', lastname: 'Lastname required'}
     * @param {string} name 
     * @param {Object} validations 
     * @return {boolean}
     */
    static hasValidations(name, validations) {
        return validations.hasOwnProperty(name);
    }

    /**
     * Returns the length of the errors object.
     * @param {Object} errors 
     * @return {number}
     */
    static countErrors(errors) {
        return Object.keys(errors).length;
    }

    /**
     * Checks if the object is empty.
     * @param {Object} errors 
     * @return {boolean}
     */
    static hasErrors(errors) {
        return isObject(errors) && ValidationHelper.countErrors(errors) > 0;
    }

    /**
     * Validates the form model and returns an object with the errors messages.
     * @param {Object} model 
     * @param {Object} validations 
     * @return {Object}
     */
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