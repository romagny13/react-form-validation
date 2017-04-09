import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { omit } from '../common/util';

export class Select extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: props.current
        };
        if (typeof this.context.validator !== 'undefined') {
            this.context.validator.register(this);
            this.validator = this.context.validator;
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        let rest = omit(this.props, ['onChange', 'onBlur', 'current', 'value', 'dataSource']);
        this.config = Object.assign({}, rest, {
            onChange: this.onChange,
            onBlur: this.onBlur
        });
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.current;
    }
    onChange(event) {
        let current = event.target.options[event.target.selectedIndex].value;
        this.setState({
            current
        });
        this.notify('onChange', current);
    }
    onBlur() {
        this.notify('onBlur', this.state.current);
    }
    notify(type, value) {
        let name = this.props.name;
        if (this.validator) { this.validator[type](name, value); }
        if (this.props[type]) { this.props[type](name, value); }
    }
    render() {
        let config = Object.assign({}, this.config, { value: this.state.current });
        return React.createElement(
            "select", config,
            this.props.dataSource.map((current, i) => {
                return React.createElement(
                    "option",
                    { key: i, value: current, onChange: this.onChange },
                    current
                );
            })
        );
    }
}
Select.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};
Select.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};