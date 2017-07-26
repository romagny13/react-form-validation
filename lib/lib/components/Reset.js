'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**  Creates a button that allows resetting to initial state. */
var Reset = function (_Component) {
    _inherits(Reset, _Component);

    function Reset(props) {
        _classCallCheck(this, Reset);

        var _this = _possibleConstructorReturn(this, (Reset.__proto__ || Object.getPrototypeOf(Reset)).call(this, props));

        _this.rest = (0, _util.omit)(props, ['initialState', 'onReset']);

        // begin edit
        _this.initialStateClone = (0, _util.clone)(props.initialState);

        _this.onCancelEdit = _this.onCancelEdit.bind(_this);
        return _this;
    }

    _createClass(Reset, [{
        key: 'onCancelEdit',
        value: function onCancelEdit() {
            var initialState = (0, _util.clone)(this.initialStateClone);
            this.props.onReset(initialState);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('input', _extends({ type: 'button', onClick: this.onCancelEdit }, this.rest));
        }
    }]);

    return Reset;
}(_react.Component);

Reset.propTypes = {
    /** The initial state (form model, errors, etc.). */
    initialState: _propTypes2.default.object.isRequired,

    /** The function called on reset. */
    onReset: _propTypes2.default.func.isRequired
};
exports.default = Reset;