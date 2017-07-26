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

var _util = require('../common/util');

var _util2 = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**  Creates a collection of input type radio with a dataSource. */
var RadioGroup = function (_React$Component) {
    _inherits(RadioGroup, _React$Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.rest = (0, _util2.omit)(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'dataSource', 'blockClassName']);

        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(RadioGroup, [{
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                dataSource = _props.dataSource,
                value = _props.value,
                blockClassName = _props.blockClassName;

            return _react2.default.createElement(
                'div',
                null,
                dataSource.map(function (dataItem, i) {
                    return _react2.default.createElement(
                        'label',
                        { key: i, className: blockClassName },
                        _react2.default.createElement('input', _extends({ type: 'radio', name: 'title', value: dataItem, checked: dataItem === value, onChange: _this2.onChange, onBlur: _this2.onBlur }, _this2.rest)),
                        dataItem
                    );
                })
            );
        }
    }]);

    return RadioGroup;
}(_react2.default.Component);

RadioGroup.propTypes = {
    /** Input name.*/
    name: _propTypes2.default.string.isRequired,

    /** All values (example: ['a','b','c']). */
    dataSource: _propTypes2.default.array.isRequired,

    /** Checked value (example: 'a'). */
    value: _propTypes2.default.string,

    /** The class name to add on block (example: "radio-inline"). */
    blockClassName: _propTypes2.default.string,

    /** The function called on value change. */
    onValueChange: _propTypes2.default.func,

    /** The function called on touch. */
    onTouch: _propTypes2.default.func
};
exports.default = RadioGroup;