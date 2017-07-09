import React from 'react';
import PropTypes from 'prop-types';

import { omit, isUndefined, isFunction } from '../common/util';

/**  Create an input. */
export class Input extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value']);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    hasOnValueChangeSubscriber() {
        return isFunction(this.props.onValueChange);
    }

    hasOnTouchSubscriber() {
        return isFunction(this.props.onTouch);
    }

    raiseValueChanged(value) {
        this.props.onValueChange(this.props.name, value);
    }

    raiseTouched() {
        this.props.onTouch(this.props.name);
    }

    isNumberElement() {
        return this.props.type === 'number' || this.props.type === 'range';
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            let value = this.isNumberElement() ? Number(event.target.value) : event.target.value;
            this.raiseValueChanged(value);
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        let value = isUndefined(this.props.value) ? '' : this.props.value;
        return <input value={value} onChange={this.onChange} onBlur={this.onBlur} {...this.rest} />;
    }
}
Input.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** The value to display */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** The type of the input field ('text', 'email', 'password', 'search', 'file', 'color', 'date', 'month', 'time', 'week', 'tel', 'url', 'number', 'range') */
    type: PropTypes.oneOf(['text', 'email', 'password', 'search', 'file', 'color', 'date', 'month', 'time', 'week', 'tel', 'url', 'number', 'range']),

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func

};
Input.defaultProps = {
    type: 'text',
    value: ''
};
