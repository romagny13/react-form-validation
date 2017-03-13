import React from 'react';
import { isDefined } from '../common/util';

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
        let hasError = false;

        this.formGroups.forEach((formGroup) => {
            let validation = formGroup.validate();
            if (validation) {
                let name = validation.name;
                formStates[name] = {};
                formStates[name].hasError = validation.hasError;
                formStates[name].firstError = validation.firstError;
                if (validation.hasError) {
                    hasError = true;
                }
            }
        });

        this.submitted = true;
        this.props.onSubmit(hasError, formStates);
    }

    render() {
        return (
            <form id={this.props.id} onSubmit={this.onSubmit} autoComplete={this.autoComplete}>
                {this.props.children}
            </form>
        );
    }
}
Form.propTypes = {
    id: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
    autoComplete: React.PropTypes.string
};
Form.childContextTypes = {
    form: React.PropTypes.any
};