import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isFunction, isUndefined, hasClassName, addClassName, removeClassName } from '../common/util';
import { omit } from '../helpers/util';

/**  Creates an input type submit disabled if the form has errors. */
class Submit extends Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['errors', 'disabled']);
    }

    render() {
        let baseClassName = this.rest.className ? this.rest.className : '';
        let disabledClassName = 'disabled';

        let disabled = this.props.disabled === true || (this.props.errors && Object.keys(this.props.errors).length > 0);
        if (disabled) {
            if (!hasClassName(baseClassName, disabledClassName)) {
                baseClassName = addClassName(baseClassName, disabledClassName);
            }
        }
        else {
            if (hasClassName(baseClassName, disabledClassName)) {
                baseClassName = removeClassName(baseClassName, disabledClassName);
            }
        }

        this.rest.className = baseClassName;
        return <input type="submit" disabled={disabled} {...this.rest} />;
    }
}
Submit.propTypes = {
    /** Allows to disable the button. */
    disabled: PropTypes.bool,

    /** Disables the button with errors. */
    errors: PropTypes.object
};
export default Submit;