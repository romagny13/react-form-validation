import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { getConfig, indexOf } from '../common/util';
import { renderCheckboxGroup } from './renderFunctions';

export class CheckboxGroup extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currents: props.currents
        };
        this.config = getConfig(props, ['onChange', 'onBlur', 'dataSource', 'currents'], this.onChange, this.onBlur);
        this.isInCurrentArray = this.isInCurrentArray.bind(this);
        this.dataSource = this.props.dataSource;
    }
    getValue() {
        return this.state.currents;
    }
    isInCurrentArray(value) {
        return indexOf(this.props.currents, value);
    }
    onChange(event) {
        let value = event.target.value;
        let index = this.isInCurrentArray(value);
        let currents = this.state.currents;
        // update array
        if (index !== -1) { currents.splice(index, 1); }
        else { currents.push(value); }
        this.setState({
            currents
        });
        this.tryUpdateFormModel(currents);
        this.notify('onChange', currents);
    }
    onBlur() {
        this.notify('onBlur', this.state.currents);
    }
    render() {
        return renderCheckboxGroup(this.config, this.dataSource, this.isInCurrentArray, this.onChange, this.onBlur);
    }
}
CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.array.isRequired,
    currents: PropTypes.array
};
CheckboxGroup.defaultProps = {
    currents: []
};