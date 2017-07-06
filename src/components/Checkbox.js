import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';

import { omit, isBoolean } from '../common/util';

export class Checkbox extends FormElement {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'checked']);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            let value = Boolean(event.target.checked);
            this.raiseValueChanged(value);
        }
    }

    render() {
        return <input type="checkbox" checked={this.props.checked} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />;
    }
}
Checkbox.propTypes = {
    checked: PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};