'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatErrorMessage = formatErrorMessage;
exports.isNullOrEmpty = isNullOrEmpty;
var defaultErrorMessages = {
    required: 'This field is required.',
    minlength: 'Please enter at least than {0} characters.',
    maxlength: 'Please enter no more than {0} characters.',
    pattern: 'Please fix this field.',
    email: 'Please enter a valid email address.',
    custom: 'Please fix this field.'
};

function formatErrorMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

/**
 * Checks if value is null or undefined or an empty string
 * @param {string} value 
 * @return {boolean}
 */
function isNullOrEmpty(value) {
    return value === null || typeof value === 'undefined' || value === '';
}

/**
 * Checks if a value is undefined or null or an empty string or is false (for a boolean)
 * @param {string} message The error message displaying
 * @return {string|undefined} The error message or undefined
 */
var required = exports.required = function required(message) {
    var error = typeof message === 'string' ? message : defaultErrorMessages.required;
    return function (value) {
        if (isNullOrEmpty(value) || typeof value === 'boolean' && value === false) {
            return error;
        }
    };
};

/**
 * Checks if a value has the min. length.
 * @param {number} minLength By default 3.
 * @param {string} message The error message displaying.
 * @return {string|undefined} The error message or undefined.
 */
var minlength = exports.minlength = function minlength(minLength, message) {
    var _minLength = typeof minLength === 'number' ? minLength : 3;
    var error = typeof message === 'string' ? message : formatErrorMessage(defaultErrorMessages.minlength, '{0}', _minLength);
    return function (value) {
        if (!isNullOrEmpty(value) && value.length < _minLength) {
            return error;
        }
    };
};

/**
 * Checks if a value has the max. length.
 * @param {number} maxLength By default 30.
 * @param {string} message The error message displaying.
 * @return {string|undefined} The error message or undefined.
 */
var maxlength = exports.maxlength = function maxlength(maxLength, message) {
    var _maxLength = typeof maxLength === 'number' ? maxLength : 30;
    var error = typeof message === 'string' ? message : formatErrorMessage(defaultErrorMessages.maxlength, '{0}', _maxLength);
    return function (value) {
        if (!isNullOrEmpty(value) && value.length > _maxLength) {
            return error;
        }
    };
};

/**
 * Checks if a value match to the regex pattern.
 * @param {Object} pattern
 * @param {string} message The error message displaying.
 * @return {string|undefined} The error message or undefined.
 */
var pattern = exports.pattern = function pattern(_pattern, message) {
    var error = typeof message === 'string' ? message : defaultErrorMessages.pattern;
    return function (value) {
        if (!isNullOrEmpty(value) && !_pattern.test(value)) {
            return error;
        }
    };
};

/**
 * Checks if a value is a valid email.
 * @param {string} message The error message displaying.
 * @return {string|undefined} The error message or undefined.
 */
var email = exports.email = function email(message) {
    var error = typeof message === 'string' ? message : defaultErrorMessages.email;
    return pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, error);
};

/**
 * Calls a function checking if value is valid.
 * @param {function} fn  The function that receives the value, the model and returns a boolean.
 * @param {string} message The error message displaying.
 * @return {string|undefined} The error message or undefined.
 */
var custom = exports.custom = function custom(fn, message) {
    var error = typeof message === 'string' ? message : defaultErrorMessages.custom;
    return function (value, model) {
        if (!isNullOrEmpty(value) && !fn(value, model)) {
            return error;
        }
    };
};