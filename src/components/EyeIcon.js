import React from 'react';
import PropTypes from 'prop-types';

/**  Create an icon (with Font Awesome) with two states (eye opened and eye closed). */
export const EyeIcon = ({ closed }) => {
    if (closed) {
        return <i className="fa fa-eye-slash form-eye" aria-hidden="true" />;
    }
    else {
        return <i className="fa fa-eye form-eye" aria-hidden="true" />;
    }
};
EyeIcon.propTypes = {
    /** Show eye-slash icon if true */
    closed: PropTypes.bool
};
EyeIcon.defaultProps = {
    closed: false
};