import React from 'react';
import PropTypes from 'prop-types';

/**  Creates an icon (with Font Awesome) with two states (eye opened and eye closed). */
export const EyeIcon = ({ closed }) => {
    if (closed) {
        return <i className="fa fa-eye-slash eye-icon" aria-hidden="true" />;
    }
    else {
        return <i className="fa fa-eye eye-icon" aria-hidden="true" />;
    }
};
EyeIcon.propTypes = {
    /** Displays the "eye-slash" icon if true. */
    closed: PropTypes.bool
};
EyeIcon.defaultProps = {
    closed: false
};