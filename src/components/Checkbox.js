import React from 'react';
import { isDefined, isFunction, doFocus } from '../common/util';

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
    }
    onChange(event) {
        let checked = event.target.checked;
        this.setState({
            checked
        });
        // notify
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, checked); }
    }
    render() {
        return (
            <input
                ref={this.props.name}
                type="checkbox"
                id={this.props.id}
                name={this.props.name}
                checked={this.state.checked}
                onChange={this.onChange}
                className={this.props.className} />
        );
    }
}
Checkbox.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    checked: React.PropTypes.bool,
    focus: React.PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};