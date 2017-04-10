import React, { Component, PropTypes } from 'react';
import { Form } from './FormComponent';
import { omit } from '../common/util';
import { renderValidator } from './renderFunctions';

export function canValidateOnChange(validators, submitted, touched) {
    return validators.length > 0 && (touched === true || submitted === true);
}

export function canValidateOnBlur(validators, mode, touched) {
    return validators.length > 0 && !touched && mode === 'touched';
}

export function validateValue(value, validators, model) {
    for (let i = 0; i < validators.length; i++) {
        let validator = validators[i];
        let result = validator(value, model);
        if (result) {
            return {
                hasError: true,
                error: result.error
            };
        }
    }
    return {
        hasError: false,
        error: ''
    };
}
export function validationStateHasChanged(state, newHasError, newError) {
    // current
    const { hasError, error } = state;
    // new
    return newHasError !== hasError || newError !== error;
}

export function getInitialErrorFormState(error) {
    if (typeof error !== 'undefined') {
        return {
            hasError: true,
            hasSuccess: false,
            error
        };
    }
    else {
        return {
            hasError: false,
            hasSuccess: false,
            error: ''
        };
    }
}

export class Validator extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = getInitialErrorFormState(this.props.errors);
        // register this form group to form for submit event
        if (typeof this.context.form !== 'undefined') {
            this.context.form.register(this);
            this.form = this.context.form;
        }
    }

    getChildContext() {
        return { validator: this };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            let error = nextProps.error,
                hasError = error && error !== '',
                hasSuccess = !hasError;

            this.setState({ hasError, hasSuccess, error });

            if (this.formElement) {
                // get name and value
                let name = this.formElement.name;
                let value = this.formElement.getValue();
                this.notify({ name, value, hasError, hasSuccess, error });
            }
        }
    }

    register(formElement) {
        if (this.formElement) { throw new Error('A form element is already registered'); }
        this.formElement = formElement;
    }

    onBlur(name, value) {
        let form = this.form;
        if (this.touched || !form) return;

        let model = form.model;
        if (model.hasOwnProperty(name) && canValidateOnBlur(this.props.validators, form.mode, this.touched)) {
            this.validateOnChange(name, value, model);
        }
    }

    onChange(name, value) {
        // validate
        let form = this.form;
        if (!form) return;

        let model = form.model;
        if (model.hasOwnProperty(name) && canValidateOnChange(this.props.validators, form.submitted, this.touched)) {
            this.validateOnChange(name, value, model);
        }
    }

    notify(event) {
        if (typeof this.props.onValidationStateChange === 'function') { this.props.onValidationStateChange(event); }
        if (this.form) { this.form.onValidationStateChange(event); }
    }

    validateOnChange(name, value, model) {
        // validate value
        const { hasError, error } = validateValue(value, this.props.validators, model);

        // check if validation state has changed
        if (validationStateHasChanged(this.state, hasError, error)) {
            // change state
            let hasSuccess = !hasError;
            this.setState({ hasError, hasSuccess, error });

            if (!this.touched) { this.touched = true; }

            // notify validation state change
            this.notify({ name, value, hasError, hasSuccess, error });
        }
    }

    validateOnSubmit() {
        if (!this.formElement) return;

        // get name and value
        let name = this.formElement.name;
        let value = this.formElement.getValue();

        // validate value
        let model = this.form.model;
        let validators = this.props.validators;
        const { hasError, error } = validateValue(value, validators, model);

        if (!this.touched) { this.touched = true; }

        // change state
        this.setState({ hasError, hasSuccess: !hasError, error });

        return {
            name,
            value,
            hasError,
            error
        };
    }

    render() {
        return renderValidator(this.props.children, this.state);
    }
}
Validator.contextTypes = {
    form: PropTypes.instanceOf(Form)
};
Validator.childContextTypes = {
    validator: PropTypes.instanceOf(Validator)
};
Validator.propTypes = {
    validators: PropTypes.array.isRequired,
    onValidationStateChange: PropTypes.func,
    error: PropTypes.string
};
Validator.defaultProps = {
    validators: []
};