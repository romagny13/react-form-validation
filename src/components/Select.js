import React from 'react';
import PropTypes from 'prop-types';

import { omit, isFunction } from '../common/util';

/**  Create a select element. */
export class Select extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'dataSource']);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    hasOnValueChangeSubscriber() {
        return isFunction(this.props.onValueChange);
    }

    hasOnTouchSubscriber() {
        return isFunction(this.props.onTouch);
    }

    raiseValueChanged(value) {
        this.props.onValueChange(this.props.name, value);
    }

    raiseTouched() {
        this.props.onTouch(this.props.name);
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            let value = event.target.options[event.target.selectedIndex].value;
            this.raiseValueChanged(value);
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        const { dataSource, value } = this.props;
        return (
            <select value={value} onChange={this.onChange} onBlur={this.onBlur} {...this.rest}>
                {dataSource.map((dataItem, i) => {
                    return <option key={i} value={dataItem}>{dataItem}</option>;
                })}
            </select>
        );
    }
}
Select.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** all values (example: ['a','b','c']) */
    dataSource: PropTypes.array.isRequired,

    /** selected value (example: 'a') */
    value: PropTypes.string,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};