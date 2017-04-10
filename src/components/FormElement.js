import React, { Component, PropTypes } from 'react';
import { Form } from './FormComponent';
import { Validator } from './Validator';
import { omit } from '../common/util';

export function tryUpdateFormModel(form, name, value) {
    if (form) {
        let model = form.model;
        if (model.hasOwnProperty(name)) {
            model[name] = value;
            return true;
        }
    }
    return false;
}

export class FormElement extends Component {
    constructor(props, context) {
        super(props, context);
        // context
        if (typeof context.validator !== 'undefined') {
            context.validator.register(this);
            this.validator = context.validator;
        }
        this.name = this.props.name;
        this.form = context.form;
        // bind
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    tryUpdateFormModel(value) {
        tryUpdateFormModel(this.form, this.name, value);
    }
    notify(type, value) {
        let name = this.props.name;
        if (this.validator) { this.validator[type](name, value); }
        if (this.props[type]) { this.props[type](name, value); }
    }
}
FormElement.contextTypes = {
    validator: PropTypes.instanceOf(Validator),
    form: PropTypes.instanceOf(Form)
};
