import React from 'react';

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
    firstError
}) => {
    let canShowHasSuccess = hasSuccess && showHasSuccess;
    let groupClassName = getGroupClassName(hasError, canShowHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName);
    return (
        <div className={groupClassName} id={id}>
            {children}
            {showHasFeedback && hasError && <span className={hasErrorFeedbackClassName} aria-hidden="true" />}
            {showHasFeedback && showHasSuccess && hasSuccess && <span className={hasSuccessFeedbackClassName} aria-hidden="true" />}
            {hasError ? <span className="help-block">{firstError}</span> : null}
        </div>
    );
};
FormGroup.propTypes = {
    id: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    hasErrorClassName: React.PropTypes.string,
    hasSuccessClassName: React.PropTypes.string,
    showHasFeedback: React.PropTypes.bool,
    showHasSuccess: React.PropTypes.bool,
    hasFeedbackClassName: React.PropTypes.string,
    hasErrorFeedbackClassName: React.PropTypes.string,
    hasSuccessFeedbackClassName: React.PropTypes.string
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

