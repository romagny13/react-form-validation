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

/**  Creates a block that allows displaying error and success. Its possible to customize font and border colors with CSS (class names: "form-group", "has-error", "has-success", "error-block").*/
var FormGroup = function FormGroup(_ref) {
    var children = _ref.children,
        error = _ref.error,
        canChangeValidationState = _ref.canChangeValidationState,
        renderSuccess = _ref.renderSuccess,
        className = _ref.className,
        errorClassName = _ref.errorClassName,
        successClassName = _ref.successClassName;

    if (canChangeValidationState) {
        var groupClassName = className;
        if (error) {
            groupClassName += ' ' + errorClassName;
        } else if (renderSuccess) {
            groupClassName += ' ' + successClassName;
        }
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
    } else {
        return _react2.default.createElement(
            'div',
            { className: className },
            children
        );
    }
};
FormGroup.propTypes = {
    /** The children. */
    children: _propTypes2.default.node,

    /** Allows displaying error / success. */
    canChangeValidationState: _propTypes2.default.bool,

    /** The error message. */
    error: _propTypes2.default.string,

    /** add success class name on success if true. */
    renderSuccess: _propTypes2.default.bool,

    /** The block class name. */
    className: _propTypes2.default.string,

    /** The error class name to add on block. */
    errorClassName: _propTypes2.default.string,

    /** The success class name to add on block. */
    successClassName: _propTypes2.default.string
};
FormGroup.defaultProps = {
    canChangeValidationState: false,
    renderSuccess: false,
    className: 'form-group',
    errorClassName: 'has-error',
    successClassName: 'has-success'
};
exports.default = FormGroup;