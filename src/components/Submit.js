import React from 'react';
import { FormGroup } from './FormGroup';
import { isDefined, isFunction, omit } from '../common/util';

export class Submit extends React.Component {
    constructor(props, context) {
        super(props, context); 
        this.state = {
            disabled: false
        };

        if (this.props.shouldDisable && isDefined(this.context.form)) {
            this.context.form.subscribe(({ hasError }) => {
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
    shouldDisable: React.PropTypes.bool
};
Submit.defaultProps = {
    shouldDisable: true
};
Submit.contextTypes = {
    form: React.PropTypes.any
};