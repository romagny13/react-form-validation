import React from 'react';
import { isDefined, isFunction, objLength, omit } from '../common/util';

export function canValidateOnChange(validators, form, touched) {
    return validators.length > 0 && (touched === true || (form && form.submitted));
}

export function canValidateOnBlur(validators, form, touched) {
    return validators.length > 0 && !touched && form && form.mode === 'touched';
}

export function getElementValue(element) {
    let tagName = element.tagName;
    if (tagName === 'INPUT') {
        if (element.type === 'checkbox') {
            return element.value !== 'on' ? element.value : element.checked;
        }
        else {
            return element.value;
        }
    }
    else if (tagName === 'TEXTAREA') {
        return element.value;
    }
    else if (tagName === 'SELECT') {
        return element.options[element.selectedIndex].value;
    }
}

export function validateValue(value, validators) {
    let hasError = false,
        errors = {},
        firstError = '';

    validators.forEach((validator) => {
        let result = validator(value);
        if (result) {
            hasError = true;
            // example:  errors: { required: 'This FormGroup is required.' }
            errors[result.name] = result.error;
        }
    });

    if (hasError) {
        firstError = getFirstError(errors);
    }
    return {
        hasError,
        firstError,
        errors
    };
}

export function getFirstError(obj) {
    return obj[Object.keys(obj)[0]];
}

export function validationStateHasChanged(state, newHasError, newFirstError) {
    // current
    const { hasError, firstError } = state;
    // new
    return newHasError !== hasError || newFirstError !== firstError;
}

export function getInitialErrorFormState(errors) {
    if (errors && objLength(errors) > 0) {
        return {
            hasError: true,
            hasSuccess: false,
            firstError: getFirstError(errors),
            errors,
        };
    }
    else {
        return {
            hasError: false,
            hasSuccess: false,
            firstError: '',
            errors: {}
        };
    }
}

export function findElementByName(element, name) {
    if (element && name) {
        return element.querySelector('[name=\'' + name + '\']');
    }
}

export class Validator extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._subscribers = [];

        this.state = getInitialErrorFormState(this.props.errors);

        // name of form element(s) to validate
        this.name = props.name;

        if (isFunction(this.props.onValidationStateChange)) { this.onValidationStateChange(this.props.onValidationStateChange); }
        // register this form group to form for submit event
        if (isDefined(this.context.form)) { this.context.form.register(this); }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            let errors = nextProps.errors,
                hasError = objLength(errors) > 0,
                hasSuccess = !hasError,
                firstError = hasError ? getFirstError(errors) : '';

            this.setState({ hasError, hasSuccess, firstError, errors });

            if (this.formElement) {
                let name = this.formElement.getName(),
                    value = this.formElement.getValue();
                this.raise({ name, value, hasError, hasSuccess, firstError, errors });
            }
        }
    }

    onValidationStateChange(subscriber) {
        this._subscribers.push(subscriber);
    }

    raiseValidationStateChange(event) {
        this._subscribers.forEach((subscriber) => {
            subscriber(event);
        });
    }

    validateOnSubmit() {
        // get name and value
        let name = this.name;
        let element = findElementByName(this.refs.root, name);
        if (!element) return;
        let value = getElementValue(element);

        // validate value
        const { hasError, firstError, errors } = validateValue(value, this.props.validators);

        // change state
        this.setState({ hasError, hasSuccess: !hasError, firstError, errors });

        this.submitted = true;

        return {
            name,
            value,
            hasError,
            firstError,
            errors
        };
    }

    validateOnChange(event) {
        if (event.target.name !== this.name) return;

        // get name and value
        let name = event.target.name,
            value = getElementValue(event.target);

        // validate value
        const { hasError, firstError, errors } = validateValue(value, this.props.validators);

        // check if validation state has changed
        if (validationStateHasChanged(this.state, hasError, firstError)) {
            // change state
            let hasSuccess = !hasError;
            this.setState({ hasError, hasSuccess, firstError, errors });

            if (!this.touched) { this.touched = true; }

            // notify validation state change
            this.raiseValidationStateChange({ name, value, hasError, hasSuccess, firstError, errors });
        }
    }

    render() {
        const handles = {
            onBlur: (event) => {
                if (canValidateOnBlur(this.props.validators, this.context.form, this.touched)) {
                    this.validateOnChange(event);
                }
            },
            onChange: (event) => {
                if (canValidateOnChange(this.props.validators, this.context.form, this.touched)) {
                    this.validateOnChange(event);
                }
            }
        };
        let type = this.props.children.type;
        if (typeof type === 'function') {
            // component
            const args = Object.assign({}, this.state, this.props.children.props);
            const root = new this.props.children.type(args);
            const props = Object.assign({}, root.props, handles);
            return <root.type ref="root" {...props}>{root.props.children}</root.type>;
        }
        else {
            let root = this.props.children;
            return <root ref="root" {...handles}>{root.props.children}</root>;
        }
    }
}
Validator.contextTypes = {
    form: React.PropTypes.any
};
Validator.propTypes = {
    name: React.PropTypes.string.isRequired,
    validators: React.PropTypes.array.isRequired,
    onValidationStateChange: React.PropTypes.func,
    errors: React.PropTypes.object
};
Validator.defaultProps = {
    validators: []
};