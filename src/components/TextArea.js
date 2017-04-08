import React from 'react';
import { isDefined, isFunction, omit, doFocus } from '../common/util';

export class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };

        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
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
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, value); }
    }
    render() {
        const rest = omit(this.props, ['value', 'onChange', 'focus']);
        return (
            <textarea
                ref={this.props.name}
                value={this.state.value}
                onChange={this.onChange}
                {...rest} />
        );
    }
}
TextArea.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    focus: React.PropTypes.bool
};
TextArea.defaultProps = {
    value: ''
};

