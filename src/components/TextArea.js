import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { omit } from '../common/util';

export class TextArea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        };
        if (typeof this.context.validator !== 'undefined') {
            this.context.validator.register(this);
            this.validator = this.context.validator;
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        let rest = omit(props, ['value', 'onChange', 'onBlur']);
        this.config = Object.assign({}, rest, {
            onChange: this.onChange,
            onBlur: this.onBlur
        });
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.value;
    }
    onChange(event) {
        let value = event.target.value;
        this.setState({
            value
        });
        this.notify('onChange', value);
    }
    onBlur() {
        this.notify('onBlur', this.state.value);
    }
    notify(type, value) {
        let name = this.props.name;
        if (this.validator) { this.validator[type](name, value); }
        if (this.props[type]) { this.props[type](name, value); }
    }
    render() {
        let config = Object.assign({}, this.config, { value: this.state.value });
        return React.createElement('textarea', config);
    }
}
TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string
};
TextArea.defaultProps = {
    value: ''
};
TextArea.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};

