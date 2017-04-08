import React from 'react';

function getGroupClassName(hasError, hasSuccess, className, hasFeedbackClassName, hasErrorClassName, hasSuccessClassName) {
    if (hasError) {
        return className + ' ' + hasFeedbackClassName + ' ' + hasErrorClassName;
    }
    else if (hasSuccess) {
        return className + ' ' + hasFeedbackClassName + ' ' + hasSuccessClassName;
    }
    return className;
}

export const renderField = ({ component, label, hasError, hasSuccess, firstError }) => {
    let groupClassName = getGroupClassName(hasError, hasSuccess, 'form-group', 'has-feedback', 'has-error', 'has-success');
    return (
        <div className={groupClassName}>
            {label}
            {component}
            {hasError && <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" />}
            {hasSuccess && <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" />}
            {hasError && <span className="help-block">{firstError}</span>}
        </div>
    );
};
