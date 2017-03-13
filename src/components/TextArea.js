import React from 'react';
import { FormGroup } from './FormGroup';
import { isDefined } from '../common/util';

export class TextArea extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        };

        this.onChange = this.onChange.bind(this);
       if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.value;
    }
    onChange(event) {
        let value = event.target.value;
        this.setState({
            value
        });
        this.props.onChange(this.props.name, value);
    }
    render() {
        return (
            <textarea id={this.props.id} name={this.props.name} rows={this.props.rows} cols={this.props.cols} value={this.state.value} onChange={this.onChange} className={this.props.className} />
        );
    }
}
TextArea.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.string
};
TextArea.defaultProps = {
    value: ''
};
TextArea.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};
