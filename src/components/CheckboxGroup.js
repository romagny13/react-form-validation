import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';

export function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

export class CheckboxGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currents: props.currents
        };
        if (typeof this.context.validator !== 'undefined') {
            this.context.validator.register(this);
            this.validator = this.context.validator;
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.indexOf = this.indexOf.bind(this);
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.currents;
    }
    indexOf(value) {
        return indexOf(this.props.currents, value);
    }
    onChange(event) {
        let value = event.target.value;
        let index = this.indexOf(value);
        let currents = this.state.currents;
        // update array
        if (index !== -1) {
            currents.splice(index, 1);
        }
        else {
            currents.push(value);
        }

        this.setState({
            currents
        });
        this.notify('onChange', currents);
    }
    onBlur() {
        this.notify('onBlur', this.state.currents);
    }
    notify(type, value) {
        let name = this.props.name;
        if (this.validator) { this.validator[type](name, value); }
        if (this.props[type]) { this.props[type](name, value); }
    }
    render() {
        return (
            <div>
                {this.props.dataSource.map((current, i) => {
                    return (<div key={i}>
                        <input
                            type="checkbox"
                            name={this.props.name}
                            checked={this.indexOf(current) !== -1}
                            value={current}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            className={this.props.className} />
                        {current}
                    </div>);
                })}
            </div>
        );
    }
}
CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    currents: PropTypes.array
};
CheckboxGroup.defaultProps = {
    currents: []
};
CheckboxGroup.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};