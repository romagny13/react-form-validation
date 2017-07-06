import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit, isFunction, isUndefined } from '../common/util';
import { FormHelper } from '../common/FormHelper';

export class Submit extends Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['errors', 'disabled']);
    }

    render() {
        let baseClassName = this.rest.className;
        let disabledClassName = 'disabled';

        let disabled = this.props.errors && Object.keys(this.props.errors).length > 0;
        if (disabled) {
            if (!FormHelper.hasClassName(baseClassName, disabledClassName)) {
                baseClassName = FormHelper.addClassName(baseClassName, disabledClassName);
            }
        }
        else {
            if (FormHelper.hasClassName(baseClassName, disabledClassName)) {
                baseClassName = FormHelper.removeClassName(baseClassName, disabledClassName);
            }
        }

        this.rest.className = baseClassName;
        return <input type="submit" disabled={disabled} {...this.rest} />;
    }
}
Submit.propTypes = {
    errors: PropTypes.object,
    className: PropTypes.string
};
Submit.defaultProps = {
    className: 'btn btn-default'
};