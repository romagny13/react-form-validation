import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { doFocus } from '../common/util';

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
    }
    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
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
        return (
            <input
                ref={this.props.name}
                type="checkbox"
                id={this.props.id}
                name={this.props.name}
                checked={this.state.checked}
                onChange={this.onChange}
                onBlur={this.onBlur}
                className={this.props.className} />
        );
    }
}
Checkbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    checked: PropTypes.bool,
    focus: PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};
Checkbox.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};