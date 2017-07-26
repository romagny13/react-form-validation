'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidationHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../common/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 *  firstname: [required('Firstname required')],
 *  lastname: [required('Lastname required')]
* };
*
* let value = model['lastname'];
*
* let error = ValidationHelper.validateValue(model,value,validators);
* // error => 'Lastname required'
 * 
 */
var ValidationHelper = exports.ValidationHelper = function () {
    function ValidationHelper() {
        _classCallCheck(this, ValidationHelper);
    }

    _createClass(ValidationHelper, null, [{
        key: 'validateValue',


        /**
         * Checks the value with the validators (pass the model to the custom validators) and returns the first error message.
         * @param {Object} model 
         * @param {string|number|boolean} value 
         * @param {Array} validators 
         * @return {string|undefined} The first error message or undefined.
         */
        value: function validateValue(model, value) {
            var validators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            for (var i = 0; i < validators.length; i++) {
                var validator = validators[i];
                var error = validator(value, model);
                if (error) {
                    return error;
                }
            }
        }

        /**
         * Checks the property name with the validators (pass the model to the custom validators) and returns the first error message.
         * 
         * @example
         * let error = ValidationHelper.validateProperty(model, 'lastname', validators);
         * // error => 'Lastname required'
         * 
         * @param {Object} model 
         * @param {string|number|boolean} name 
         * @param {Array} validators 
         * @return {string|undefined} The first error message or undefined.
         */

    }, {
        key: 'validateProperty',
        value: function validateProperty(model, name) {
            var validators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            var value = model[name];
            return ValidationHelper.validateValue(model, value, validators);
        }

        /**
         * Checks if has validators for the name
         * 
         * @example
         * let errors = ValidationHelper.validateAll(model,validators);
         * // errors => {firstname: 'Firstname required', lastname: 'Lastname required'}
         * @param {string} name 
         * @param {Object} validators 
         * @return {boolean}
         */

    }, {
        key: 'hasValidations',
        value: function hasValidations(name, validators) {
            return validators.hasOwnProperty(name);
        }

        /**
         * Returns the length of the errors object.
         * @param {Object} errors 
         * @return {number}
         */

    }, {
        key: 'countErrors',
        value: function countErrors(errors) {
            return Object.keys(errors).length;
        }

        /**
         * Checks if the object is empty.
         * @param {Object} errors 
         * @return {boolean}
         */

    }, {
        key: 'hasErrors',
        value: function hasErrors(errors) {
            return (0, _util.isObject)(errors) && ValidationHelper.countErrors(errors) > 0;
        }

        /**
         * Validates the form model and returns an object with the errors messages.
         * @param {Object} model 
         * @param {Object} validators 
         * @return {Object}
         */

    }, {
        key: 'validateAll',
        value: function validateAll(model) {
            var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var errors = {};

            for (var name in validators) {
                if (ValidationHelper.hasValidations(name, validators)) {
                    var fieldValidations = validators[name];
                    if (!Array.isArray(fieldValidations)) {
                        throw new Error('Validations require an Array');
                    }

                    var error = ValidationHelper.validateProperty(model, name, fieldValidations);
                    if (error) {
                        errors[name] = error;
                    }
                }
            }

            return errors;
        }
    }]);

    return ValidationHelper;
}();