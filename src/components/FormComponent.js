import React from 'react';
import { isDefined, omit } from '../common/util';

export function validateAll(formGroups) {
    let formStates = {},
        formModel = {},
        hasOneOrMoreErrors = false;

    formGroups.forEach((formGroup) => {
        let validation = formGroup.validateOnSubmit();
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

export function isValid(formStates) {
    for (let name in formStates) {
        if (formStates.hasOwnProperty(name)) {
            let formState = formStates[name];
            if (formState.hasError) {
                return false;
            }
        }
    }
    return true;
}

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this._subscribers = [];

        this.formGroups = [];
        this.hasError = false;
        this.formStates = {};
        this.submitted = false;

        this.onSubmit = this.onSubmit.bind(this);
    }

    getChildContext() {
        return { form: this };
    }

    register(formGroup) {
        // subscribe to group validation state change { name, value, hasError, hasSuccess, firstError, errors }
        formGroup.subscribe(({ name, hasError, hasSuccess, firstError, errors }) => {
            this.formStates[name] = { hasError, firstError };
            this.hasError = !isValid(this.formStates);
            // notify all subscribers that validation state changed
            this.raise({ hasError: this.hasError });
        });
        // allow to validate each form group on submit
        this.formGroups.push(formGroup);
    }

    subscribe(subscriber) {
        this._subscribers.push(subscriber);
    }

    raise(event) {
        this._subscribers.forEach((subscriber) => {
            subscriber(event);
        });
    }

    get mode() {
        return this.props.mode;
    }

    onSubmit(event) {
        event.preventDefault();

        const { hasError, formStates, formModel } = validateAll(this.formGroups);

        this.hasError = hasError;
        this.formStates = formStates;
        this.submitted = true;

        this.props.onSubmit({ hasError, formStates, formModel });
        this.raise({ hasError });
    }

    render() {
        const rest = omit(this.props, ['onSubmit', 'mode']);
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
    children: React.PropTypes.node
};
Form.defaultProps = {
    mode: 'submit'
};
Form.childContextTypes = {
    form: React.PropTypes.any
};