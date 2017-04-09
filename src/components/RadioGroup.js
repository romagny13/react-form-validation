import React, { Component, PropTypes } from 'react';
import { Validator } from './Validator';

export class RadioGroup extends Component {
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
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.current;
    }
    onChange(event) {
        let current = event.target.value;
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
            <div>
                {this.props.dataSource.map((current, i) => {
                    return (<div key={i}>
                        <input
                            type="radio"
                            name={this.props.name}
                            checked={this.state.current === current}
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
RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};
RadioGroup.contextTypes = {
    validator: PropTypes.instanceOf(Validator)
};