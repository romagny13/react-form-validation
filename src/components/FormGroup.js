import React from 'react';
import { validateValue, getElementValue, firstProp, isFunction } from '../common/util';

export class FormGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasError: false,
            firstError: ''
        };
        this.onChange = this.onChange.bind(this);
        this.context.form.register(this);
    }

    getChildContext() {
        return { formGroup: this };
    }

    register(name, formElement) {
        this.formElement = formElement;
    }

    get canValidate() {
        return this.props.validators.length > 0 && this.context.form.canValidate;
    }

    validate() {
        let name = this.formElement.getName();
        let value = this.formElement.getValue();
        let validation = validateValue(value, this.props.validators);
        let hasError = validation.hasError;
        let firstError = hasError ? firstProp(validation.errors) : '';

        // change state
        this.setState({
            hasError,
            firstError
        });

        return {
            name,
            hasError,
            firstError
        };
    }

    onChange(event) {
        if (this.canValidate) {
            let oldHasError = this.state.hasError;
            let oldFirstError = this.state.firstError;

            // validateValue
            let value = getElementValue(event.target);
            let validation = validateValue(value, this.props.validators);
            let hasError = validation.hasError;
            let firstError = hasError ? firstProp(validation.errors) : '';

            if (hasError !== oldHasError || firstError !== oldFirstError) {
                // change state
                this.setState({
                    value,
                    hasError,
                    firstError
                });

                // notify
                if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, value); }
            }
        }
    }

    render() {
        let groupClassName = this.state.hasError ? this.props.className + ' has-error' : this.props.className;
        return (
            <div className={groupClassName} onChange={this.onChange}>
                {this.props.children}
                {this.state.hasError ?
                    <span className="help-block">{this.state.firstError}</span>
                : null}
            </div>
        );
    }
}
/*FormGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    children: React.PropTypes.array,
    validators: React.PropTypes.array
};*/
FormGroup.defaultProps = {
    validators: []
};
FormGroup.contextTypes = {
    form: React.PropTypes.any
};
FormGroup.childContextTypes = {
    formGroup: React.PropTypes.any
};