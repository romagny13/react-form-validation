'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**  Creates an icon (with Font Awesome) with two states (eye opened and eye closed). */
var EyeIcon = function EyeIcon(_ref) {
    var closed = _ref.closed;

    if (closed) {
        return _react2.default.createElement('i', { className: 'fa fa-eye-slash eye-icon', 'aria-hidden': 'true' });
    } else {
        return _react2.default.createElement('i', { className: 'fa fa-eye eye-icon', 'aria-hidden': 'true' });
    }
};
EyeIcon.propTypes = {
    /** Displays the "eye-slash" icon if true. */
    closed: _propTypes2.default.bool
};
EyeIcon.defaultProps = {
    closed: false
};
exports.default = EyeIcon;