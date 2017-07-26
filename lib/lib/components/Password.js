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

var _EyeIcon = require('./EyeIcon');

var _EyeIcon2 = _interopRequireDefault(_EyeIcon);

var _util = require('../common/util');

var _util2 = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**  Creates an input type password with an eye icon that allows showing password. */
var Password = function (_React$Component) {
    _inherits(Password, _React$Component);

    function Password(props) {
        _classCallCheck(this, Password);

        var _this = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this, props));

        _this.state = {
            elementType: 'password',
            eyeClosed: false
        };

        _this.rest = (0, _util2.omit)(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'renderEyeIcon', 'type', 'style']);

        if (props.renderEyeIcon) {

            _this.rest.className = _this.rest.className ? _this.rest.className + ' hide-ms-eye' : 'hide-ms-eye';

            _this.blockStyle = props.width ? { position: 'relative', width: props.width } : { position: 'relative' };

            _this.eyeLinkStyle = {
                display: 'block',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '12px',
                lineHeight: 1,
                zIndex: 1
            };

            _this.onEyeIconClick = _this.onEyeIconClick.bind(_this);
        }

        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(Password, [{
        key: 'hasOnValueChangeSubscriber',
        value: function hasOnValueChangeSubscriber() {
            return (0, _util.isFunction)(this.props.onValueChange);
        }
    }, {
        key: 'hasOnTouchSubscriber',
        value: function hasOnTouchSubscriber() {
            return (0, _util.isFunction)(this.props.onTouch);
        }
    }, {
        key: 'raiseValueChanged',
        value: function raiseValueChanged(value) {
            this.props.onValueChange(this.props.name, value);
        }
    }, {
        key: 'raiseTouched',
        value: function raiseTouched() {
            this.props.onTouch(this.props.name);
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            if (this.hasOnValueChangeSubscriber()) {
                this.raiseValueChanged(event.target.value);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            if (this.hasOnTouchSubscriber()) {
                this.raiseTouched();
            }
        }
    }, {
        key: 'onEyeIconClick',
        value: function onEyeIconClick(event) {
            event.preventDefault();

            var state = this.state.elementType === 'password' ? { elementType: 'text', eyeClosed: true } : { elementType: 'password', eyeClosed: false };
            this.setState(state);
        }
    }, {
        key: 'render',
        value: function render() {
            var value = (0, _util.isUndefined)(this.props.value) ? '' : this.props.value;
            if (this.props.renderEyeIcon) {
                var displayEye = value !== '';
                return _react2.default.createElement(
                    'div',
                    { style: this.blockStyle },
                    _react2.default.createElement('input', _extends({ type: this.state.elementType, value: value, onChange: this.onChange, onBlur: this.onBlur, style: { position: 'relative', width: '100%' } }, this.rest)),
                    displayEye && _react2.default.createElement(
                        'a',
                        { href: true, style: this.eyeLinkStyle, onClick: this.onEyeIconClick, className: 'eye-link', tabIndex: '-1' },
                        _react2.default.createElement(_EyeIcon2.default, { closed: this.state.eyeClosed })
                    )
                );
            } else {
                return _react2.default.createElement('input', _extends({ type: 'password', value: value, onChange: this.onChange, onBlur: this.checkAndRaiseTouched }, this.rest));
            }
        }
    }]);

    return Password;
}(_react2.default.Component);

Password.propTypes = {
    /** Input name.*/
    name: _propTypes2.default.string.isRequired,

    /** The type of the input field. */
    type: _propTypes2.default.string,

    /** The value. */
    value: _propTypes2.default.string,

    /** Allows displaying eye if true. */
    renderEyeIcon: _propTypes2.default.bool,

    /** Allows to set the width of the element. */
    width: _propTypes2.default.string,

    /** The function called on value change. */
    onValueChange: _propTypes2.default.func,

    /** The function called on touch. */
    onTouch: _propTypes2.default.func
};
Password.defaultProps = {
    type: 'password',
    value: '',
    renderEyeIcon: true
};
exports.default = Password;