import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';

import { omit, isUndefined } from '../common/util';

export class Input extends FormElement {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'value']);

        this.onChange = this.onChange.bind(this);
    }

    isNumberElement() {
        return this.props.type === 'number' || this.props.type === 'number';
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            let value = this.isNumberElement() ? Number(event.target.value) : event.target.value;
            this.raiseValueChanged(value);
        }
    }

    render() {
        let value = isUndefined(this.props.value) ? '' : this.props.value;
        return <input value={value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />;
    }
}
Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    type: PropTypes.oneOf(['text', 'email', 'password', 'search', 'file', 'color', 'date', 'month', 'time', 'week', 'tel', 'url', 'number', 'range'])
};
Input.defaultProps = {
    type: 'text',
    value: ''
};
