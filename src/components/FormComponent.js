import React from 'react';
import { isDefined, omit } from '../common/util';

export function validateAll(formGroups) {
    let formStates = {},
        formModel = {},
        hasOneOrMoreErrors = false;

    formGroups.forEach((formGroup) => {
        let validation = formGroup.validate();
        // could be null if FormGroup has no registered form component
        if (validation) {
            const { name, hasError, firstError, value } = validation;
            formStates[name] = { hasError, firstError };
            formModel[name] = value;
            if (hasError) {
                hasOneOrMoreErrors = true;
            }
        }
    });

    return {
        hasError: hasOneOrMoreErrors,
        formStates,
        formModel
    };
}

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

    register(formGroup) {
        // register form groups
        this.formGroups.push(formGroup);
    }

    get mode() {
        return this.props.mode;
    }

    get showHasSuccess() {
        return this.props.showHasSuccess;
    }

    get hasErrorClassName() {
        return this.props.hasErrorClassName;
    }

    get hasSuccessClassName() {
        return this.props.hasSuccessClassName;
    }

    onSubmit(event) {
        event.preventDefault();

        const { hasError, formStates, formModel } = validateAll(this.formGroups);

        this.submitted = true;
        this.props.onSubmit(hasError, formStates, formModel);
    }

    render() {
        const rest = omit(this.props, ['onSubmit', 'mode', 'showHasSuccess', 'hasErrorClassName', 'hasSuccessClassName']);
        return (
            <form onSubmit={this.onSubmit} {...rest}>
                {this.props.children}
            </form>
        );
    }
}
Form.propTypes = {
    mode: React.PropTypes.oneOf(['submit', 'touched']),
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
    showHasSuccess: React.PropTypes.bool,
    hasErrorClassName: React.PropTypes.string,
    hasSuccessClassName: React.PropTypes.string
};
Form.defaultProps = {
    mode: 'submit',
    showHasSuccess: false,
    hasErrorClassName: 'has-error',
    hasSuccessClassName: 'has-success'
};
Form.childContextTypes = {
    form: React.PropTypes.any
};