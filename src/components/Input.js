import React from 'react';
import { FormGroup } from './FormGroup';

export class Input extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        };

        this.onChange = this.onChange.bind(this);
        this.context.formGroup.register(this.props.name, this);
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
            <input type={this.props.type} id={this.props.id} name={this.props.name} value={this.state.value} onChange={this.onChange} className={this.props.className} />
        );
    }
}
/*Input.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool)
};*/
Input.defaultProps = {
    type: 'text'
};
Input.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};
