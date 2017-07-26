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

/**  Creates a select element. */
var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.rest = (0, _util2.omit)(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'values', 'dataSource']);

        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(Select, [{
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
                if (this.props.multiple) {
                    var values = [];
                    var options = event.target.options;
                    for (var i = 0; i < options.length; i++) {
                        var option = options[i];
                        if (option.selected) {
                            values.push(option.value);
                        }
                    }

                    this.raiseValueChanged(values);
                } else {
                    var value = event.target.options[event.target.selectedIndex].value;
                    this.raiseValueChanged(value);
                }
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
            var selectedValues = this.props.multiple ? this.props.values : this.props.value;
            return _react2.default.createElement(
                'select',
                _extends({ value: selectedValues, onChange: this.onChange, onBlur: this.onBlur }, this.rest),
                this.props.dataSource.map(function (dataItem, i) {
                    return _react2.default.createElement(
                        'option',
                        { key: i, value: dataItem },
                        dataItem
                    );
                })
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

Select.propTypes = {
    /** Input name.*/
    name: _propTypes2.default.string.isRequired,

    /** all values (example: ['a','b','c']). */
    dataSource: _propTypes2.default.array.isRequired,

    /** selected value (example: 'a'). */
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool]),

    /** Allows to select multiple values. */
    multiple: _propTypes2.default.bool,

    /** selected values when multiple is true */
    values: _propTypes2.default.array,

    /** The function called on value change. */
    onValueChange: _propTypes2.default.func,

    /** The function called on touch. */
    onTouch: _propTypes2.default.func
};
exports.default = Select;