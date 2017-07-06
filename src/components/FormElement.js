import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isUndefined, isFunction } from '../common/Util';

export class FormElement extends Component {
    constructor(props) {
        super(props);

        if (isUndefined(props.name)) { throw new Error('Name required'); }

        this.raiseValueChanged = this.raiseValueChanged.bind(this);
        this.raiseTouched = this.raiseTouched.bind(this);
        this.checkAndRaiseTouched = this.checkAndRaiseTouched.bind(this);
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

    checkAndRaiseTouched() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }
}
FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    onValueChange: PropTypes.func,
    onTouch: PropTypes.func
};