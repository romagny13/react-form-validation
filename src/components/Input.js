import React from 'react';
import { isDefined, isFunction, doFocus } from '../common/util';

export function getInputInitialValue(value) {
    return isDefined(value) ? value : '';
}

export class Input extends React.Component {
    constructor(props) {
        super(props);
        let value = getInputInitialValue(props.value);
        this.state = {
            value
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
    }

    onChange(event) {
        let value = event.target.value;
        this.setState({
            value
        });
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, value); }
    }

    render() {
        return (
            <input
                ref={this.props.name}
                type={this.props.type}
                id={this.props.id}
                name={this.props.name}
                value={this.state.value}
                onChange={this.onChange}
                className={this.props.className}
                placeholder={this.props.placeholder} />
        );
    }
}
Input.propTypes = {
    focus: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
};
Input.defaultProps = {
    type: 'text'
};
