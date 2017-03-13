import React from 'react';
import { FormGroup } from './FormGroup';

export class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: props.current
        };

        this.onChange = this.onChange.bind(this);
        this.context.formGroup.register(this.props.name, this);
    }
    getName(){
        return this.props.name;
    }
    getValue(){
        return this.state.current;
    }
    onChange(event) {
        let current = event.target.options[event.target.selectedIndex].value;
        this.setState({
            current
        });
        // notify
        this.props.onChange(this.props.name, current);
    }
    render() {
        return (
            <select name={this.props.name} value={this.state.current} onChange={this.onChange} className={this.props.className}>
                {this.props.dataSource.map((current, i) => {
                    return (
                        <option key={i} value={current} onChange={this.onChange}>{current}</option>
                    );
                })}
            </select>
        );
    }
}
/*Select.propTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool)
};*/
Select.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};