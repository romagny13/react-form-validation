import React from 'react';
import { FormGroup } from './FormGroup';
import { isDefined } from '../common/util';

export class Checkbox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked
        };

        this.onChange = this.onChange.bind(this);
       if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.checked;
    }
    onChange(event) {
        let checked = event.target.checked;
        this.setState({
            checked
        });
        // notify
        this.props.onChange(this.props.name, checked);
    }
    render() {
        return (
            <input type="checkbox" id={this.props.id} name={this.props.name} checked={this.state.checked} onChange={this.onChange} className={this.props.className} />
        );
    }
}
Checkbox.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    checked: React.PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};
Checkbox.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};