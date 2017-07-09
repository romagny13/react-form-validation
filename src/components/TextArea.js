import React from 'react';
import PropTypes from 'prop-types';

import { omit, isFunction } from '../common/util';

/** Creates a textarea element. */
export class TextArea extends React.Component {
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

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            this.raiseValueChanged(event.target.value);
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        return <textarea value={this.props.value} onChange={this.onChange} onBlur={this.onBlur} {...this.rest} />;
    }
}
TextArea.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** The value to display. */
    value: PropTypes.string,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};
TextArea.defaultProps = {
    value: ''
};
