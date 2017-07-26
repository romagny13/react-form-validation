'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFontIconClassName(iconName, className, spin, fixed, larger) {
    var result = 'fa fa-' + iconName;
    if (spin) {
        result += ' fa-spin';
    }
    if (fixed) {
        result += ' fa-fw';
    }
    if (larger) {
        result += ' fa-' + larger;
    }
    if (className) {
        result += ' ' + className;
    }
    return result;
}

/**  Creates an icon (with Font Awesome). */
var FontIcon = function FontIcon(props) {
    // http://fontawesome.io/icons/
    var iconName = props.iconName,
        className = props.className,
        spin = props.spin,
        fixed = props.fixed,
        larger = props.larger;

    var fontIconClassName = getFontIconClassName(iconName, className, spin, fixed, larger);

    var rest = (0, _util.omit)(props, ['iconName', 'className', 'spin', 'fixed', 'larger']);

    return _react2.default.createElement('i', _extends({ className: fontIconClassName, 'aria-hidden': 'true' }, rest));
};
FontIcon.propTypes = {
    /** The name of the font icon (example: check for 'fa fa-check'). */
    iconName: _propTypes2.default.string.isRequired,

    /** Class name to add on icon. */
    className: _propTypes2.default.string,

    /** Animates the icon (add 'fa-spin' to className). */
    spin: _propTypes2.default.bool,

    /** Fixed width (add 'fa-fw' to className). */
    fixed: _propTypes2.default.bool,

    /** Size of the icon (lg,2x,3x,4x,5x). */
    larger: _propTypes2.default.oneOf(['lg', '2x', '3x', '4x', '5x'])
};
FontIcon.defaultProps = {
    spin: false,
    fixed: false
};
exports.default = FontIcon;