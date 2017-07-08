import React from 'react';
import PropTypes from 'prop-types';

export const HelpBlock = ({ children }) => {
    return <span className="help-block">{children}</span>;
};
HelpBlock.propTypes = {
    children: PropTypes.node
};
