import React from 'react';
import { isDefined, isFunction } from '../common/util';

export class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current
        };

        this.onChange = this.onChange.bind(this);
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