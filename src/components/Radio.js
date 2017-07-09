import React from 'react';
import PropTypes from 'prop-types';

import { omit, isBoolean, isFunction } from '../common/util';

/**  Creates an input type radio. */
export class Radio extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'checked']);

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

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            let value = Boolean(event.target.checked);
            this.raiseValueChanged(value);
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        return <input type="radio" checked={this.props.checked} onChange={this.onChange} onBlur={this.onBlur} {...this.rest} />;
    }
}
Radio.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** Allows to check the checkbox */
    checked: PropTypes.bool,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};
Radio.defaultProps = {
    checked: false
};