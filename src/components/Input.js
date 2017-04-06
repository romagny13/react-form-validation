import React from 'react';
import { FormGroup } from './FormGroup';
import { isDefined, isFunction, getInputInitialValue } from '../common/util';

export class Input extends React.Component {
    constructor(props, context) {
        super(props, context);
        let value = getInputInitialValue(props.type, props.value);
        this.state = {
            value
        };

        this.onChange = this.onChange.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
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
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, value); }
    }
    render() {
        return (
            <input
                type={this.props.type}
                id={this.props.id}
                name={this.props.name}
                value={this.state.value}
                onChange={this.onChange}
                className={this.props.className}
                placeholder={this.props.placeholder} />
        );
    }
}
Input.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    placeholder: React.PropTypes.string
};
Input.defaultProps = {
    type: 'text'
};
Input.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};
