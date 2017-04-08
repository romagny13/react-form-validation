import React from 'react';
import { FormGroup } from './FormGroup';
import { isDefined, isFunction } from '../common/util';

export class CheckboxGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currents: props.currents
        };

        this.onChange = this.onChange.bind(this);
        this.indexOf = this.indexOf.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.currents;
    }
    indexOf(value) {
        let currents = this.props.currents;
        for (let i = 0; i < currents.length; i++) {
            if (currents[i] === value) {
                return i;
            }
        }
        return -1;
    }
    onChange(event) {
        let value = event.target.value;
        let index = this.indexOf(value);
        let currents = this.state.currents;
        if (index !== -1) {
            currents.splice(index, 1);
        }
        else {
            currents.push(value);
        }

        this.setState({
            currents
        });
        // notify
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, currents); }
    }
    render() {
        return (
            <div>
                {this.props.dataSource.map((current, i) => {
                    return (<div key={i}>
                        <input
                            type="checkbox"
                            name={this.props.name}
                            checked={this.indexOf(current) !== -1}
                            value={current}
                            onChange={this.onChange}
                            className={this.props.className} />
                        {current}
                    </div>);
                })}
            </div>
        );
    }
}
CheckboxGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    currents: React.PropTypes.array
};
CheckboxGroup.defaultProps = {
    currents: []
};
CheckboxGroup.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup) 
};