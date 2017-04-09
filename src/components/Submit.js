import React, { Component, PropTypes } from 'react';
import { Form } from './FormComponent';
import { omit } from '../common/util';

export class Submit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled: props.disabled
        };

        if (this.props.shouldDisable && typeof this.context.form !== 'undefined') {
            this.context.form.onFormStateChange(({ hasError }) => {
                this.setState({
                    disabled: hasError
                });
            });
        }
        let rest = omit(this.props, ['shouldDisable', 'disabled', 'type']);
        this.config = Object.assign({}, rest, { type: 'submit' });
    }
    render() {
        let config = Object.assign({}, this.config, { disabled: this.state.disabled });
        return React.createElement('input', config);
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