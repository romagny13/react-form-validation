import React, { Component, PropTypes } from 'react';
import { Form } from './FormComponent';
import { omit } from '../common/util';
import { renderSubmit } from './renderFunctions';

export class Submit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled: props.disabled
        };

        if (props.shouldDisable && typeof context.form !== 'undefined') {
            context.form.onFormStateChange(({ hasError }) => {
                this.setState({
                    disabled: hasError
                });
            });
        }
        this.config = omit(props, ['shouldDisable', 'disabled', 'type']);
    }
    render() {
        return renderSubmit(this.config, this.state.disabled);
    }
}
Submit.propTypes = {
    shouldDisable: PropTypes.bool,
    disabled: PropTypes.bool
};
Submit.defaultProps = {
    shouldDisable: true,
    disabled: false
};
Submit.contextTypes = {
    form: PropTypes.instanceOf(Form)
};