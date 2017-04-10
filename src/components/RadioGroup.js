import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { getConfig } from '../common/util';
import { renderRadioGroup } from './renderFunctions';

export class RadioGroup extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: props.current
        };
        this.config = getConfig(props, ['onChange', 'onBlur', 'dataSource', 'current', 'checked'], this.onChange, this.onBlur);
    }
    getValue() {
        return this.state.current;
    }
    onChange(event) {
        let current = event.target.value;
        this.setState({
            current
        });
        this.tryUpdateFormModel(current);
        this.notify('onChange', current);
    }
    onBlur() {
        this.notify('onBlur', this.state.current);
    }
    render() {
        return renderRadioGroup(this.config, this.props.dataSource, this.state.current, this.onChange, this.onBlur);
    }
}
RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.array.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};