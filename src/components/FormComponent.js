import React from 'react';
import { isDefined, omit } from '../common/util';

export class Form extends React.Component {
    constructor(props) {
        super(props);

        this.formGroups = [];
        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    getChildContext() {
        return { form: this };
    }

    get canValidate() {
        return this.submitted === true;
    }

    register(formGroup) {
        this.formGroups.push(formGroup);
    }

    onSubmit(event) {
        event.preventDefault();

        let formStates = {};
        let formModel = {};
        let hasError = false;

        this.formGroups.forEach((formGroup) => {
            let validation = formGroup.validate();
            let name = validation.name;
            formStates[name] = {
                hasError: validation.hasError,
                firstError: validation.firstError
            };
            formModel[name] = validation.value;
            if (validation.hasError) {
                hasError = true;
            }
        });

        this.submitted = true;
        this.props.onSubmit(hasError, formStates, formModel);
    }

    render() {
        const rest = omit(this.props, ['onSubmit']);
        return (
            <form onSubmit={this.onSubmit} {...rest}>
                {this.props.children}
            </form>
        );
    }
}
Form.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
};
Form.childContextTypes = {
    form: React.PropTypes.any
};