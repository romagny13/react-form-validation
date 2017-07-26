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

/**  Creates an input type submit disabled if the form has errors. */
var Submit = function (_Component) {
    _inherits(Submit, _Component);

    function Submit(props) {
        _classCallCheck(this, Submit);

        var _this = _possibleConstructorReturn(this, (Submit.__proto__ || Object.getPrototypeOf(Submit)).call(this, props));

        _this.rest = (0, _util2.omit)(props, ['errors', 'disabled']);
        return _this;
    }

    _createClass(Submit, [{
        key: 'render',
        value: function render() {
            var baseClassName = this.rest.className ? this.rest.className : '';
            var disabledClassName = 'disabled';

            var disabled = this.props.disabled === true || this.props.errors && Object.keys(this.props.errors).length > 0;
            if (disabled) {
                if (!(0, _util.hasClassName)(baseClassName, disabledClassName)) {
                    baseClassName = (0, _util.addClassName)(baseClassName, disabledClassName);
                }
            } else {
                if ((0, _util.hasClassName)(baseClassName, disabledClassName)) {
                    baseClassName = (0, _util.removeClassName)(baseClassName, disabledClassName);
                }
            }

            this.rest.className = baseClassName;
            return _react2.default.createElement('input', _extends({ type: 'submit', disabled: disabled }, this.rest));
        }
    }]);

    return Submit;
}(_react.Component);

Submit.propTypes = {
    /** Allows to disable the button. */
    disabled: _propTypes2.default.bool,

    /** Disables the button with errors. */
    errors: _propTypes2.default.object
};
exports.default = Submit;