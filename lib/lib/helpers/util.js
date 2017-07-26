'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.extend = extend;
exports.clone = clone;
exports.omit = omit;

var _util = require('../common/util');

/**
 * Extends the target object with the source object.
 * @param {Object} source 
 * @param {Object} target 
 * @return {Object} The target object.
 */
function extend(source, target) {
    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object') {
        for (var name in source) {
            if (!target.hasOwnProperty(name)) {
                var sourceValue = source[name];
                if ((0, _util.isArray)(sourceValue)) {
                    target[name] = sourceValue.slice(0);
                } else if ((0, _util.isObject)(sourceValue)) {
                    target[name] = extend(sourceValue, {});
                } else {
                    target[name] = sourceValue;
                }
            }
        }
    }
    return target;
}

/**
 * copies an object.
 * @param {Object} obj 
 */
function clone(obj) {
    return extend(obj, {});
}

/**
 * Returns the source object without the omitted names.
 * @param {Object} obj 
 * @param {Array} names
 */
function omit(obj) {
    var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var result = {};
    for (var name in obj) {
        if (obj.hasOwnProperty(name) && names.indexOf(name) === -1) {
            result[name] = obj[name];
        }
    }
    return result;
}