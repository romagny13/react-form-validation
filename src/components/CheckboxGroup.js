import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { omit } from '../common/util';
import { renderCheckboxGroup } from './renderFunctions';

export class CheckboxGroup extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currents: props.currents
        };
        this.renderFunction = props.renderFunction;
        this.config = omit(props, ['onChange', 'onBlur', 'dataSource', 'currents', 'renderFunction']);
    }
    getValue() {
        return this.state.currents;
    }
    onChange(event) {
        let value = event.target.value;
        let currents = this.state.currents;
        let index = currents.indexOf(value);
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
        return this.renderFunction({ props: this.config, dataSource: this.props.dataSource, currents: this.state.currents, onChange: this.onChange, onBlur: this.onBlur });
    }
}
CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.array.isRequired,
    currents: PropTypes.array,
    renderFunction: PropTypes.func
};
CheckboxGroup.defaultProps = {
    currents: [],
    renderFunction: renderCheckboxGroup
};