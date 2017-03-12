import React, { PropTypes } from 'react';
import { Validator } from '../common/validators';
import { getInitialFormState, getElementValue, formHasError, omit, validateValue } from '../common/util';

export class FormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.propsToAdd = omit(this.props, ['formConfig', 'onStateChange', 'onSubmit', 'children']);

        this.state = {
            formConfig: props.formConfig,
            formStates: getInitialFormState(props.formConfig),
            hasError: false,
            submitted: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validate(name, value) {
        let formElementConfig = this.state.formConfig[name];
        if (formElementConfig) {
            return validateValue(value, formElementConfig);
        }
    }

    get canValidate() {
        return this.state.submitted;
    }

    onChange(event) {
        if (this.canValidate) {
            let name = event.target.name;
            let value = getElementValue(event.target);
            let formStates = this.state.formStates;
            if (formStates[name]) {

                let oldHasError = formStates[name].hasError;
                let oldFirstError = formStates[name].errors[Object.keys(formStates[name].errors)[0]];
                let validation = this.validate(name, value);
                if (validation) {
                    formStates[name].hasError = validation.hasError;
                    formStates[name].errors = validation.errors;
                }

                // check form has error
                let hasError = formHasError(formStates);

                // set state
                this.setState({
                    formStates,
                    hasError
                });

                // notify only if state !== previous state
                if (validation.hasError !== oldHasError || validation.errors[0] !== oldFirstError) {
                    this.props.onStateChange(hasError, formStates);
                }
            }
        }
    }

    onSubmit(event) {
        event.preventDefault();
        let form = event.target;
        let hasError = false;
        let formStates = this.state.formStates;
        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];
            if (element.type !== 'submit') {
                let name = element.name;
                let value = getElementValue(element);
                let validation = this.validate(name, value);
                if (validation) {
                    formStates[name].hasError = validation.hasError;
                    formStates[name].errors = validation.errors;
                }

                if (validation && validation.hasError) {
                    hasError = true;
                }
            }
        }
        this.setState({
            formStates,
            hasError,
            submitted: true
        });

        this.props.onSubmit(hasError, formStates);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} onChange={this.onChange} {...this.propsToAdd}>
                {this.props.children}
            </form>
        );
    }
}

FormComponent.propTypes = {
    children: PropTypes.array.isRequired,
    formConfig: PropTypes.object.isRequired,
    onStateChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};




