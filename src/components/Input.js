import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { doFocus } from '../common/util';

export function getInputInitialValue(value) {
    return typeof value !== 'undefined' ? value : '';
}

export class Input extends Component {
    constructor(props, context) {
        super(props, context);
        let value = getInputInitialValue(props.value);
        this.state = {
            value
        };
        if (typeof this.context.validator !== 'undefined') {
            this.context.validator.register(this);
            this.validator = this.context.validator;
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
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
        return (
            <input
                ref={this.props.name}
                type={this.props.type}
                id={this.props.id}
                name={this.props.name}
                value={this.state.value}
                onChange={this.onChange}
                onBlur={this.onBlur}
                className={this.props.className}
                placeholder={this.props.placeholder} />
        );
    }
}
Input.propTypes = {
    focus: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
};
Input.defaultProps = {
    type: 'text'
};
Input.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};
