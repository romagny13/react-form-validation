import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { getConfig } from '../common/util';
import { renderSelect } from './renderFunctions';

export class Select extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: props.current
        };
        this.dataSource = this.props.dataSource;
        this.config = getConfig(props, ['onChange', 'onBlur', 'current', 'value', 'dataSource'], this.onChange, this.onBlur);
    }
    getValue() {
        return this.state.current;
    }
    onChange(event) {
        let current = event.target.options[event.target.selectedIndex].value;
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
        return renderSelect(this.config, this.dataSource, this.state.current, this.onChange, this.onBlur);
    }
}
Select.propTypes = {
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.array.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};