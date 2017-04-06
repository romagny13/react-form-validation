import React from 'react';
import { FormGroup } from './FormGroup';
import { isDefined, isFunction } from '../common/util';

export class RadioGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: props.current
        };

        this.onChange = this.onChange.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }
    getName() {
        return this.props.name;
    }
    getValue() {
        return this.state.current;
    }
    onChange(event) {
        let current = event.target.value;
        this.setState({
            current
        });
        // notify
        if (isFunction(this.props.onChange)) { this.props.onChange(this.props.name, current); }
    }
    render() {
        return (
            <div>
                {this.props.dataSource.map((current, i) => {
                    return (<div key={i}>
                        <input
                            type="radio"
                            name={this.props.name}
                            checked={this.state.current === current}
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
RadioGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool])
};
RadioGroup.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};