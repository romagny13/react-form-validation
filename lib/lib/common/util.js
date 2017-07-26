'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isUndefined = isUndefined;
exports.isDefined = isDefined;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isPromise = isPromise;
exports.hasClassName = hasClassName;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isDefined(value) {
    return typeof value !== 'undefined';
}
function isString(value) {
    return typeof value === 'string';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isObject(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isDate(value) {
    return toString.call(value) === '[object Date]';
}
var isArray = exports.isArray = Array.isArray;
function isPromise(obj) {
    return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function hasClassName(className, classNameToCheck) {
    return className.indexOf(classNameToCheck) != -1;
}

function addClassName(className, classNameToAdd) {
    return className && className !== '' ? className + ' ' + classNameToAdd : classNameToAdd;
}

function removeClassName(className, classNameToRemove) {
    if (className && className !== '') {
        var result = className.split(' ');
        var index = result.indexOf(classNameToRemove);
        if (index !== -1) {
            result = result.slice(0, index);
        }
        return result.length > 0 ? result.join(' ') : '';
    }
    return className;
}