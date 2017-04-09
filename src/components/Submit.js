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
    }
    render() {
        const rest = omit(this.props, ['shouldDisable', 'disabled', 'type']);
        return (
            <input type="submit" disabled={this.state.disabled} {...rest} />
        );
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