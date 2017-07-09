import React from 'react';
import PropTypes from 'prop-types';

import { FormGroupHelper } from '../common/FormGroupHelper';

import { ErrorBlock } from './ErrorBlock';

/**  Creates a block that allows to display error and success. */
export const FormGroup = ({
    children,
    error,
    canChangeValidationState,
    renderSuccess,
    className,
    errorClassName,
    successClassName
}) => {
    if (canChangeValidationState) {
        let hasError = typeof error != 'undefined' ? true : false;
        let hasSuccess = renderSuccess && !hasError;
        let groupClassName = FormGroupHelper.getGroupClassName(hasError, hasSuccess, className, errorClassName, successClassName);
        let content = hasError ? <div className="clearfix">{children}</div> : children;
        return (
            <div className={groupClassName}>
                {content}
                {hasError && <ErrorBlock>{error}</ErrorBlock>}
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
    /** The children. */
    children: PropTypes.node,

    /** Allows to display error / success. */
    canChangeValidationState: PropTypes.bool,

    /** The error message. */
    error: PropTypes.string,

    /** add success class name on success if true. */
    renderSuccess: PropTypes.bool,

    /** The block class name. */
    className: PropTypes.string,

    /** The error class name to add on block. */
    errorClassName: PropTypes.string,

    /** The success class name to add on block. */
    successClassName: PropTypes.string
};
FormGroup.defaultProps = {
    canChangeValidationState: false,
    renderSuccess: false,
    className: 'form-group',
    errorClassName: 'has-error',
    successClassName: 'has-success',
};
