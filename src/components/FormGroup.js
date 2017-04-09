import React, { PropTypes } from 'react';

export function getGroupClassName(hasError, showHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName) {
    if (hasError) {
        let result = className && className !== '' ? className + ' ' + hasErrorClassName : hasErrorClassName;
        if (showHasFeedback) {
            result += ' ' + hasFeedbackClassName;
        }
        return result;
    }
    else if (showHasSuccess) {
        let result = className && className !== '' ? className + ' ' + hasSuccessClassName : hasSuccessClassName;
        if (showHasFeedback) {
            result += ' ' + hasFeedbackClassName;
        }
        return result;
    }
    return className;
}

export const FormGroup = ({
    id,
    hasErrorClassName,
    hasSuccessClassName,
    showHasFeedback,
    showHasSuccess,
    hasFeedbackClassName,
    hasErrorFeedbackClassName,
    hasSuccessFeedbackClassName,
    className,
    children,
    hasError,
    hasSuccess,
    error
}) => {
    let canShowHasSuccess = hasSuccess && showHasSuccess;
    let groupClassName = getGroupClassName(hasError, canShowHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName);
    return (
        <div className={groupClassName} id={id}>
            {children}
            {showHasFeedback && hasError && <span className={hasErrorFeedbackClassName} aria-hidden="true" />}
            {showHasFeedback && showHasSuccess && hasSuccess && <span className={hasSuccessFeedbackClassName} aria-hidden="true" />}
            {hasError ? <span className="help-block">{error}</span> : null}
        </div>
    );
};
FormGroup.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    hasErrorClassName: PropTypes.string,
    hasSuccessClassName: PropTypes.string,
    showHasFeedback: PropTypes.bool,
    showHasSuccess: PropTypes.bool,
    hasFeedbackClassName: PropTypes.string,
    hasErrorFeedbackClassName: PropTypes.string,
    hasSuccessFeedbackClassName: PropTypes.string
};
FormGroup.defaultProps = {
    className: 'form-group',
    hasErrorClassName: 'has-error',
    hasSuccessClassName: 'has-success',
    showHasFeedback: true,
    showHasSuccess: true,
    hasFeedbackClassName: 'has-feedback',
    hasErrorFeedbackClassName: 'glyphicon glyphicon-remove form-control-feedback',
    hasSuccessFeedbackClassName: 'glyphicon glyphicon-ok form-control-feedback'
};

