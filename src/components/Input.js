import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { getConfig } from '../common/util';
import { renderInput } from './renderFunctions';

export class Input extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        };
        this.config = getConfig(props, ['onChange', 'onBlur', 'value'], this.onChange, this.onBlur);
    }
    getValue() {
        return this.state.value;
    }
    onChange(event) {
        let value = event.target.value;
        this.setState({
            value
        });
        this.tryUpdateFormModel(value);
        this.notify('onChange', value);
    }
    onBlur() {
        this.notify('onBlur', this.state.value);
    }
    render() {
        return renderInput(this.config, this.state.value);
    }
}
Input.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    type: PropTypes.oneOf(['text', 'email', 'password', 'search', 'number', 'range', 'file', 'color', 'date', 'month', 'time', 'week', 'tel', 'url'])
};
Input.defaultProps = {
    type: 'text',
    value: ''
};