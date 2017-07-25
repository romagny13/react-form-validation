import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from './ErrorBlock';

/**  Creates a block that allows displaying error. */
const LightGroup = ({ error, children, className, errorClassName }) => {
    let groupClassName = error ? className + ' ' + errorClassName : className;
    return (
        <div className={groupClassName}>
            <div className="clearfix">
                {children}
            </div>
            {error && <ErrorBlock>{error}</ErrorBlock>}
        </div>
    );
};
LightGroup.propTypes = {
    /** The children. */
    children: PropTypes.node,

    /** The error message. */
    error: PropTypes.string,

    /** The block class name. */
    className: PropTypes.string,

    /** The error class name to add on block. */
    errorClassName: PropTypes.string
};
LightGroup.defaultProps = {
    className: 'form-group',
    errorClassName: 'has-error'
};
export default LightGroup;