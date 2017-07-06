import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';

import { omit } from '../common/Util';

export class TextArea extends FormElement {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'value']);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            this.raiseValueChanged(event.target.value);
        }
    }

    render() {
        return <textarea value={this.props.value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />;
    }
}
TextArea.propTypes = {
    value: PropTypes.string
};
TextArea.defaultProps = {
    value: ''
};
