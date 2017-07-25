import React from 'react';
import PropTypes from 'prop-types';

import { omit } from '../helpers/util';

function getFontIconClassName(iconName, className, spin, fixed, larger) {
    let result = 'fa fa-' + iconName;
    if (spin) {
        result += ' fa-spin';
    }
    if (fixed) {
        result += ' fa-fw';
    }
    if (larger) {
        result += ' fa-' + larger;
    }
    if (className) {
        result += ' ' + className;
    }
    return result;
}

/**  Creates an icon (with Font Awesome). */
const FontIcon = (props) => {
    // http://fontawesome.io/icons/
    const { iconName, className, spin, fixed, larger } = props;
    let fontIconClassName = getFontIconClassName(iconName, className, spin, fixed, larger);

    let rest = omit(props, ['iconName', 'className', 'spin', 'fixed', 'larger']);

    return <i className={fontIconClassName} aria-hidden="true" {...rest} />;
};
FontIcon.propTypes = {
    /** The name of the font icon (example: check for 'fa fa-check'). */
    iconName: PropTypes.string.isRequired,

    /** Class name to add on icon. */
    className: PropTypes.string,

    /** Animates the icon (add 'fa-spin' to className). */
    spin: PropTypes.bool,

    /** Fixed width (add 'fa-fw' to className). */
    fixed: PropTypes.bool,

    /** Size of the icon (lg,2x,3x,4x,5x). */
    larger: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
};
FontIcon.defaultProps = {
    spin: false,
    fixed: false
};
export default FontIcon;