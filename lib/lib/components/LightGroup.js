'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ErrorBlock = require('./ErrorBlock');

var _ErrorBlock2 = _interopRequireDefault(_ErrorBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**  Creates a block that allows displaying error. */
var LightGroup = function LightGroup(_ref) {
    var error = _ref.error,
        children = _ref.children,
        className = _ref.className,
        errorClassName = _ref.errorClassName;

    var groupClassName = error ? className + ' ' + errorClassName : className;
    return _react2.default.createElement(
        'div',
        { className: groupClassName },
        _react2.default.createElement(
            'div',
            { className: 'clearfix' },
            children
        ),
        error && _react2.default.createElement(
            _ErrorBlock2.default,
            null,
            error
        )
    );
};
LightGroup.propTypes = {
    /** The children. */
    children: _propTypes2.default.node,

    /** The error message. */
    error: _propTypes2.default.string,

    /** The block class name. */
    className: _propTypes2.default.string,

    /** The error class name to add on block. */
    errorClassName: _propTypes2.default.string
};
LightGroup.defaultProps = {
    className: 'form-group',
    errorClassName: 'has-error'
};
exports.default = LightGroup;