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

export class FormGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._subscribers = [];
        this.state = getInitialErrorFormState(this.props.errors);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

        if (isFunction(this.props.onValidationStateChange)) { this.subscribe(this.props.onValidationStateChange); }
        // register this form group to form for submit event
        if (isDefined(this.context.form)) { this.context.form.register(this); }
    }

    getChildContext() {
        return { formGroup: this };
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

    register(name, formElement) {
        // register this form element
        this.formElement = formElement;
    }

    subscribe(subscriber) {
        this._subscribers.push(subscriber);
    }

    raise(event) {
        this._subscribers.forEach((subscriber) => {
            subscriber(event);
        });
    }

    validateOnSubmit() {
        // No form element registered for this group
        if (!this.formElement) return;

        // get name and value
        let name = this.formElement.getName(),
            value = this.formElement.getValue();

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

            // notify validation state change
            this.raise({ name, value, hasError, hasSuccess, firstError, errors });
        }
    }

    onChange(event) {
        if (canValidateOnChange(this.props.validators, this.context.form, this.touched)) {
            this.validateOnChange(event);
        }
    }

    onBlur(event) {
        if (canValidateOnBlur(this.props.validators, this.context.form, this.touched)) {
            this.touched = true;
            this.validateOnChange(event);
        }
    }

    render() {
        const rest = omit(this.props, ['validators', 'errors', 'onChange', 'render']),
            props = Object.assign({}, rest, this.state);
        const component = React.createElement(this.props.render, props);
        return (
            <div onChange={this.onChange} onBlur={this.onBlur}>
                {component}
            </div>
        );
    }
}
FormGroup.contextTypes = {
    form: React.PropTypes.any
};
FormGroup.childContextTypes = {
    formGroup: React.PropTypes.any
};
FormGroup.propTypes = {
    validators: React.PropTypes.array,
    render: React.PropTypes.func,
    onValidationStateChange: React.PropTypes.func,
    errors: React.PropTypes.object
};
FormGroup.defaultProps = {
    validators: []
};

