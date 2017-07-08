import React from 'react';
import PropTypes from 'prop-types';

import { HelpBlock } from './HelpBlock';

export const FormGroup = ({
    children,
    error,
    canChangeValidationState,
    className,
    errorClassName
}) => {
    if (canChangeValidationState) {
        let hasError = typeof error != 'undefined' ? true : false;
        let groupClassName = hasError ? className + ' ' + errorClassName : className;
        return (
            <div className={groupClassName}>
                {children}
                {hasError && <HelpBlock>{error}</HelpBlock>}
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
    errorClassName: PropTypes.string
};
FormGroup.defaultProps = {
    canChangeValidationState: false,
    className: 'form-group',
    errorClassName: 'has-error'
};
