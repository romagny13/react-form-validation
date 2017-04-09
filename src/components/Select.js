import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';
import { doFocus } from '../common/util';

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
    }
    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
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
        return (
            <select
                ref={this.props.name}
                id={this.props.id}
                name={this.props.name}
                value={this.state.current}
                onChange={this.onChange}
                onBlur={this.onBlur}
                className={this.props.className}>
                {this.props.dataSource.map((current, i) => {
                    return (
                        <option key={i} value={current} onChange={this.onChange}>{current}</option>
                    );
                })}
            </select>
        );
    }
}
Select.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    focus: PropTypes.bool
};
Select.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};