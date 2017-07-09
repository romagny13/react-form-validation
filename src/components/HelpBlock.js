import React from 'react';
import PropTypes from 'prop-types';

/**  Create a span with the class name help-block. */
export const HelpBlock = ({ children }) => {
    return <span className="help-block">{children}</span>;
};
HelpBlock.propTypes = {
    /** The children */
    children: PropTypes.node
};
