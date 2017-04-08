import React from 'react';
import { isDefined, isFunction, doFocus } from '../common/util';

export class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current
        };

        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        doFocus(this.props.focus, this.refs[this.props.name]);
    }
    onChange(event) {
        let current = event.target.options[event.target.selectedIndex].value;
        this.setState({
            current
        });
        // notify
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, current); }
    }
    render() {
        return (
            <select
                ref={this.props.name}
                id={this.props.id}
                name={this.props.name}
                value={this.state.current}
                onChange={this.onChange}
                className={this.props.className}>
                {this.props.dataSource.map((current, i) => {
                    return (
                        <option key={i} value={current} onChange={this.onChange}>{current}</option>
                    );
                })}
            </select>
        );
    }
}
Select.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    focus: React.PropTypes.bool
};