'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Creates a form with no-validate. Its possible to customize the appearence with CSS or a Framework (Bootstrap for example). */
var Form = function Form(props) {
    var rest = (0, _util.omit)(props, ['noValidate']);
    return _react2.default.createElement('form', _extends({}, rest, { noValidate: true }));
};
exports.default = Form;