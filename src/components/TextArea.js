import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { getConfig } from '../common/util';
import { renderTextArea } from './renderFunctions';

export class TextArea extends FormElement {
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
        let props = Object.assign({}, this.config, { value: this.state.value });
        return renderTextArea(props);
    }
}
TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string
};
TextArea.defaultProps = {
    value: ''
};






