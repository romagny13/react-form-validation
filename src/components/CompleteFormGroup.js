import React from 'react';
import PropTypes from 'prop-types';

import { FormGroupHelper } from '../common/FormGroupHelper';

export const CompleteFormGroup = ({
    children,
    error,
    canChangeValidationState,
    renderFeedback,
    renderSuccess,
    className,
    feedbackClassName,
    errorFeedbackClassName,
    successFeedbackClassName,
    errorClassName,
    successClassName,
    errorSpanClassName
}) => {
    // 2 states with no renderSuccess: "normal" and "error"
    // 3 states with renderSuccess: "start", "error" and "success"
    if (canChangeValidationState) {
        // * error: if have error + feedback if renderFeedback
        // * success: if renderSuccess && form submitted or field touched (or other condition) + feedback if renderFeedback
        let hasError = typeof error != 'undefined' ? true : false;
        let hasSuccess = renderSuccess && !hasError;
        let groupClassName = FormGroupHelper.getGroupClassName(renderFeedback, hasError, hasSuccess, className, feedbackClassName, errorClassName, successClassName);
        return (
            <div className={groupClassName}>
                {children}
                {renderFeedback && hasError && <span className={errorFeedbackClassName} aria-hidden="true" />}
                {renderFeedback && renderSuccess && <span className={successFeedbackClassName} aria-hidden="true" />}
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
CompleteFormGroup.propTypes = {
    children: PropTypes.node,
    canChangeValidationState: PropTypes.bool,
    renderFeedback: PropTypes.bool,
    renderSuccess: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
    feedbackClassName: PropTypes.string,
    errorFeedbackClassName: PropTypes.string,
    successFeedbackClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    successClassName: PropTypes.string,
    errorSpanClassName: PropTypes.string
};
CompleteFormGroup.defaultProps = {
    canChangeValidationState: false,
    renderFeedback: false,
    renderSuccess: false,
    className: 'form-group',
    errorClassName: 'has-error',
    successClassName: 'has-success',
    feedbackClassName: 'has-feedback',
    errorFeedbackClassName: 'glyphicon glyphicon-remove form-control-feedback',
    successFeedbackClassName: 'glyphicon glyphicon-ok form-control-feedback',
    errorSpanClassName: 'help-block'
};
