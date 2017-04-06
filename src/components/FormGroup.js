import React from 'react';
import { isDefined, isFunction } from '../common/util';

export function canValidateOnChange(validators, form, touched) {
    return validators.length > 0 && (touched === true || (form && form.submitted));
}

export function canValidateOnBlur(validators, form, touched) {
    return !touched && validators.length > 0 && form && form.mode === 'touched';
}

export function getGroupClassName(hasError, className) {
    return hasError ? className + ' has-error' : className;
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
    let hasError = false;
    let errors = {};
    let firstError = '';

    validators.forEach((validator) => {
        if (!validator.validate(value)) {
            hasError = true;
            // example:  errors: { required: 'This field is required.' }
            errors[validator.name] = validator.error;
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

export class FormGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasError: false,
            firstError: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

        // register this form group to form for submit event
        if (isDefined(this.context.form)) { this.context.form.register(this); }
    }

    getChildContext() {
        return { formGroup: this };
    }

    register(name, formElement) {
        // register this form element
        this.formElement = formElement;
    }

    validate() {
        if (!this.formElement) { throw new Error('No form element registered for the group.'); }

        let name = this.formElement.getName();
        let value = this.formElement.getValue();

        // validate value
        let { hasError, firstError, errors } = validateValue(value, this.props.validators);

        // change state
        this.setState({
            hasError,
            firstError,
            errors
        });

        return {
            name,
            value,
            hasError,
            firstError,
            errors
        };
    }

    _validateOnChange(event) {
        // get form element value
        let value = getElementValue(event.target);

        // validate value
        let { hasError, firstError, errors } = validateValue(value, this.props.validators);

        // check if validation state has changed
        if (validationStateHasChanged(this.state, hasError, firstError)) {
            // change state
            this.setState({
                hasError,
                firstError,
                errors
            });

            this.touched = true;
            // notify validation state change
            if (isFunction(this.props.onChange)) { this.props.onChange(event.target.name, value); }
        }
    }

    onChange(event) {
        if (canValidateOnChange(this.props.validators, this.context.form, this.touched)) {
            this._validateOnChange(event);
        }
    }

    onBlur(event) {
        if (canValidateOnBlur(this.props.validators, this.context.form, this.touched)) {
            this._validateOnChange(event);
        }
    }

    render() {
        let groupClassName = getGroupClassName(this.state.hasError, this.props.className);
        return (
            <div className={groupClassName} onChange={this.onChange} onBlur={this.onBlur}>
                {this.props.children}
                {this.state.hasError ? <span className="help-block">{this.state.firstError}</span> : null}
            </div>
        );
    }
}
FormGroup.propTypes = {
    validators: React.PropTypes.array,
    children: React.PropTypes.node,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
};
FormGroup.defaultProps = {
    validators: []
};
FormGroup.contextTypes = {
    form: React.PropTypes.any
};
FormGroup.childContextTypes = {
    formGroup: React.PropTypes.any
};