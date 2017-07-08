import React from 'react';
import PropTypes from 'prop-types';

export const Eye = ({ closed }) => {
    if (closed) {
        return <i className="fa fa-eye-slash form-eye" aria-hidden="true" />;
    }
    else {
        return <i className="fa fa-eye form-eye" aria-hidden="true" />;
    }
};
Eye.propTypes = {
    closed: PropTypes.bool
};
Eye.defaultProps = {
    closed: false
};