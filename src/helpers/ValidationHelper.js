import { isObject } from '../common/util';

/**
 * Allows validating a value, a property or a form model with validators (required, minlength, maxlength, pattern, email, custom).
 * 
 * @example
 * let model = {
 *   firstname: '',
 *   lastname: ''
* };
*
* let validators = {
 *  firstname: [required('First name required')],
 *  lastname: [required('Last name required')]
* };
*
* let value = model['lastname'];
*
* // validate a value
* let error = ValidationHelper.validateValue(model, value, validators); // error => 'Last name required'
* 
* @example
* // validate property
* let error = ValidationHelper.validateProperty(model, 'lastname', validators); // error => 'Last name required'
*
* @example
* // validate all
* let errors = ValidationHelper.validateAll(model, validators); // errors => {firstname: 'First name required', lastname: 'Last name required'}
* 
*/
export class ValidationHelper {

    /**
     * Checks the value with validators and returns the first error message.
     * @param {Object} model 
     * @param {string|number|boolean} value 
     * @param {Array} validators 
     * @return {string|undefined} The first error message or undefined.
     */
    static validateValue(model, value, validators = []) {
        for (let i = 0; i < validators.length; i++) {
            let validator = validators[i];
            let error = validator(value, model);
            if (error) {
                return error;
            }
        }
    }

    /**
     * Checks the property with validators and returns the first error message.
     * 
     * @param {Object} model 
     * @param {string|number|boolean} name 
     * @param {Array} validators 
     * @return {string|undefined} The first error message or undefined.
     */
    static validateProperty(model, name, validators = []) {
        let value = model[name];
        return ValidationHelper.validateValue(model, value, validators);
    }

    /**
     * Checks presence of validators for the name
     * 
     * @param {string} name 
     * @param {Object} validators 
     * @return {boolean}
     */
    static hasValidations(name, validators) {
        return validators.hasOwnProperty(name);
    }

    /**
     * Returns the length of the object.
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
     * Validates all values and returns errors messages.
     * @param {Object} model 
     * @param {Object} validators 
     * @return {Object}
     */
    static validateAll(model, validators = {}) {
        let errors = {};

        for (let name in validators) {
            if (ValidationHelper.hasValidations(name, validators)) {
                let fieldValidations = validators[name];
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