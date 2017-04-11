import React, { Component, PropTypes } from 'react';
import { FormElement } from './FormElement';
import { omit } from '../common/util';
import { renderRadioGroup } from './renderFunctions';

export class RadioGroup extends FormElement {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: props.current
        };
        this.renderFunction = props.renderFunction;
        this.config = omit(props, ['onChange', 'onBlur', 'dataSource', 'current', 'checked', 'renderFunction']);
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
        return this.renderFunction({ props: this.config, dataSource: this.props.dataSource, current: this.state.current, onChange: this.onChange, onBlur: this.onBlur });
    }
}
RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.array.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    renderFunction: PropTypes.func
};
RadioGroup.defaultProps = {
    renderFunction: renderRadioGroup
};