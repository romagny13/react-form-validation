import React from 'react';
import { isDefined, isFunction, objLength } from '../common/util';

export function canValidateOnChange(validators, form, touched) {
    return validators.length > 0 && (touched === true || (form && form.submitted));
}

export function canValidateOnBlur(validators, form, touched) {
    return validators.length > 0 && !touched && form && form.mode === 'touched';
}

export function getGroupClassName(hasError, showHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName) {
    if (hasError) {
        let result = className && className !== '' ? className + ' ' + hasErrorClassName : hasErrorClassName;
        if (showHasFeedback) {
            result += ' ' + hasFeedbackClassName;
        }
        return result;
    }
    else if (showHasSuccess) {
        let result = className && className !== '' ? className + ' ' + hasSuccessClassName : hasSuccessClassName;
        if (showHasFeedback) {
            result += ' ' + hasFeedbackClassName;
        }
        return result;
    }
    return className;
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
            // example:  errors: { required: 'This field is required.' }
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

export function hasSuccess(form, touched) {
    if (form && form.showHasSuccess) {
        return form.submitted || touched;
    }
    return false;
}

export function getInitialErrorFormState(errors) {
    if (errors && objLength(errors) > 0) {
        return {
            hasError: true,
            hasSuccess: false,
            firstError: getFirstError(errors),
            errors
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

        this.state = getInitialErrorFormState(props.errors);

        this.hasErrorClassName = this.context.form && this.context.form.hasErrorClassName || 'has-error';
        this.hasSuccessClassName = this.context.form && this.context.form.hasSuccessClassName || 'has-success';
        this.showHasFeedback = this.context.form && this.context.form.showHasFeedback;
        this.hasFeedbackClassName = this.context.form && this.context.form.hasFeedbackClassName || 'has-feedback';
        this.hasErrorFeedbackClassName = this.context.form && this.context.form.hasErrorFeedbackClassName || 'glyphicon glyphicon-remove form-control-feedback';
        this.hasSuccessFeedbackClassName = this.context.form && this.context.form.hasSuccessFeedbackClassName || 'glyphicon glyphicon-ok form-control-feedback';

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
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
                firstError = hasError ? getFirstError(errors) : '';
            this.setState({
                hasError,
                firstError,
                errors
            });
        }
    }

    register(name, formElement) {
        // register this form element
        this.formElement = formElement;
    }

    validate() {
        // No form element registered for this group
        if (!this.formElement) return;

        let name = this.formElement.getName();
        let value = this.formElement.getValue();

        // validate value
        let { hasError, firstError, errors } = validateValue(value, this.props.validators);

        // change state
        this.setState({
            hasError,
            hasSuccess: !hasError,
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
        const { hasError, firstError, errors } = validateValue(value, this.props.validators);

        // check if validation state has changed
        if (validationStateHasChanged(this.state, hasError, firstError)) {
            // change state
            this.setState({ hasError, hasSuccess: !hasError, firstError, errors });

            if (!this.touched) { this.touched = true; }
            // notify validation state change
            if (isFunction(this.props.onChange)) { this.props.onChange(event.target.name, value, hasError, firstError, errors); }
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
        let showHasSuccess = hasSuccess(this.context.form, this.touched);
        let groupClassName = getGroupClassName(this.state.hasError, showHasSuccess, this.props.className, this.hasErrorClassName, this.hasSuccessClassName, this.showHasFeedback, this.hasFeedbackClassName);
        return (
            <div className={groupClassName} onChange={this.onChange} onBlur={this.onBlur}>
                {this.props.children}
                {this.showHasFeedback && this.state.hasError && <span className={this.hasErrorFeedbackClassName} aria-hidden="true" />}
                {this.showHasFeedback && showHasSuccess && this.state.hasSuccess && <span className={this.hasSuccessFeedbackClassName} aria-hidden="true" />}
                {this.state.hasError ? <span className="help-block">{this.state.firstError}</span> : null}
            </div>
        );
    }
}
FormGroup.propTypes = {
    validators: React.PropTypes.array,
    children: React.PropTypes.node,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    errors: React.PropTypes.object
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

