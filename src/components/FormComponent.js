import React, { Component, PropTypes } from 'react';
import { omit } from '../common/util';

export function validateAll(validators) {
    let errors = {},
        hasOneOrMoreErrors = false;

    validators.forEach((validator) => {
        let validation = validator.validateOnSubmit();
        // could be null with no registered form element
        if (validation) {
            const { name, value, hasError, error } = validation;
            if (hasError) {
                errors[name] = error;
                hasOneOrMoreErrors = true;
            }
        }
    });
    return {
        hasError: hasOneOrMoreErrors,
        errors
    };
}

export function formHasErrors(errors) {
    return Object.keys(errors).length > 0;
}

export class Form extends Component {
    constructor(props) {
        super(props);
        this._subscribers = [];
        this._validators = [];

        this.mode = this.props.mode;
        this.model = Object.assign({}, props.model);
        this.hasError = false;
        this.errors = {};
        this.submitted = false;

        this.onSubmit = this.onSubmit.bind(this);
        let rest = omit(props, ['onSubmit', 'mode', 'model']);
        this.config = Object.assign({}, rest, {
            onSubmit: this.onSubmit
        });
    }
    getChildContext() {
        return { form: this };
    }
    register(validator) {
        this._validators.push(validator);
    }
    onValidationStateChange({ name, hasError, error }) {
        if (hasError) { this.errors[name] = error; }
        else if (this.errors.hasOwnProperty(name)) { delete this.errors[name]; }

        this.hasError = formHasErrors(this.errors);

        this.raiseFormStateChange({ hasError: this.hasError, errors: this.errors });
    }
    onFormStateChange(subscriber) {
        this._subscribers.push(subscriber);
    }
    raiseFormStateChange(event) {
        this._subscribers.forEach((subscriber) => {
            subscriber(event);
        });
    }
    onSubmit(event) {
        event.preventDefault();

        const { hasError, errors } = validateAll(this._validators);

        this.hasError = hasError;
        this.errors = errors;
        this.submitted = true;

        this.props.onSubmit({ hasError, errors, model: this.model });
        this.raiseFormStateChange({ hasError, errors });
    }
    render() {
        return React.createElement('form', this.config, this.props.children);
    }
}
Form.propTypes = {
    mode: PropTypes.oneOf(['submit', 'touched']),
    model: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
};
Form.defaultProps = {
    mode: 'submit',
    model: {}
};
Form.childContextTypes = {
    form: PropTypes.any
};