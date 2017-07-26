'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

/**  Creates a label with asterisk for required field. */
var Label = function (_React$Component) {
    _inherits(Label, _React$Component);

    function Label(props) {
        _classCallCheck(this, Label);

        var _this = _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this, props));

        _this.rest = (0, _util.omit)(props, ['asterisk', 'asteriskColor']);
        return _this;
    }

    _createClass(Label, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'label',
                this.rest,
                this.props.children,
                ' ',
                this.props.asterisk && _react2.default.createElement(
                    'span',
                    { style: { color: this.props.asteriskColor } },
                    ' *'
                )
            );
        }
    }]);

    return Label;
}(_react2.default.Component);

Label.propTypes = {
    /** The children. */
    children: _propTypes2.default.node,

    /** Displays the asterisk if true. */
    asterisk: _propTypes2.default.bool,

    /** The color of asterisk. */
    asteriskColor: _propTypes2.default.string
};
Label.defaultProps = {
    asterisk: false,
    asteriskColor: 'red'
};
exports.default = Label;