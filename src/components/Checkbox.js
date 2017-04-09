import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { omit } from '../common/util';

export class Checkbox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked
        };
        if (typeof this.context.validator !== 'undefined') {
            this.context.validator.register(this);
            this.validator = this.context.validator;
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);

        let rest = omit(this.props, ['onChange', 'onBlur', 'checked']);
        this.config = Object.assign({}, rest, {
            type: 'checkbox',
            onChange: this.onChange,
            onBlur: this.onBlur
        });
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.checked;
    }
    onChange(event) {
        let checked = event.target.checked;
        this.setState({
            checked
        });
        this.notify('onChange', checked);
    }
    onBlur() {
        this.notify('onBlur', this.state.checked);
    }
    notify(type, value) {
        let name = this.props.name;
        if (this.validator) { this.validator[type](name, value); }
        if (this.props[type]) { this.props[type](name, value); }
    }

    render() {
        let config = Object.assign({}, this.config, { checked: this.state.checked });
        return React.createElement('input', config);
    }
}
Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    checked: PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};
Checkbox.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};