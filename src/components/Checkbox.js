import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { getConfig } from '../common/util';
import { renderCheckbox } from './renderFunctions';

export class Checkbox extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked
        };
        this.config = getConfig(props, ['onChange', 'onBlur', 'checked'], this.onChange, this.onBlur);
    }
    getValue() {
        return this.state.checked;
    }
    onChange(event) {
        let checked = event.target.checked;
        this.setState({
            checked
        });

        this.tryUpdateFormModel(checked);
        this.notify('onChange', checked);
    }
    onBlur() {
        this.notify('onBlur', this.state.checked);
    }
    render() {
        return renderCheckbox(this.config, this.state.checked);
    }
}
Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};
