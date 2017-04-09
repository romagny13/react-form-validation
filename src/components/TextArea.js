import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { omit, doFocus } from '../common/util';

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
        const rest = omit(this.props, ['value', 'onChange', 'onBlur', 'focus']);
        return (
            <textarea
                ref={this.props.name}
                value={this.state.value}
                onChange={this.onChange}
                onBlur={this.onBlur}
                {...rest} />
        );
    }
}
TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    focus: PropTypes.bool
};
TextArea.defaultProps = {
    value: ''
};
TextArea.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};

