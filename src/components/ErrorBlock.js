import React from 'react';
import PropTypes from 'prop-types';

/**  Creates a span with the class name error-block. */
const ErrorBlock = ({ children }) => {
    return <span className="error-block">{children}</span>;
};
ErrorBlock.propTypes = {
    /** The children. */
    children: PropTypes.node
};
export default ErrorBlock;