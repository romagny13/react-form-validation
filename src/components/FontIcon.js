import React from 'react';
import PropTypes from 'prop-types';

export const FontIcon = ({ iconName, className }) => {
    // http://fontawesome.io/icons/
    let iconClassName = 'fa fa-' + iconName;
    let classNameWithGlyph = className && className !== '' ? className + ' ' + iconClassName : iconClassName;
    return <i className={classNameWithGlyph} aria-hidden="true" />;
};
FontIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
    className: PropTypes.string
};
