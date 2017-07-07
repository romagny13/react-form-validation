import React from 'react';
import PropTypes from 'prop-types';

export const FormGroup = ({
    children,
    error,
    canChangeValidationState,
    className,
    errorClassName,
    errorSpanClassName
}) => {
    if (canChangeValidationState) {
        let hasError = typeof error != 'undefined' ? true : false;
        let groupClassName = hasError ? className + ' ' + errorClassName : className;
        return (
            <div className={groupClassName}>
                {children}
                {hasError ? <span className={errorSpanClassName}>{error}</span> : null}
            </div>
        );
    }
    else {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }
};
FormGroup.propTypes = {
    children: PropTypes.node,
    canChangeValidationState: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
    errorClassName: PropTypes.string,
    errorSpanClassName: PropTypes.string
};
FormGroup.defaultProps = {
    canChangeValidationState: false,
    className: 'form-group',
    errorClassName: 'has-error',
    errorSpanClassName: 'help-block'
};
