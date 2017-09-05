import React from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '../common/util';
import { omit, deepEqual } from '../helpers/util';

/**  Creates a select element. */
class Select extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'values', 'dataSource']);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.multiple ? deepEqual(nextProps.values, this.props.values) === false : nextProps.value !== this.props.value;
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
            if (this.props.multiple) {
                let values = [];
                let options = event.target.options;
                for (let i = 0; i < options.length; i++) {
                    let option = options[i];
                    if (option.selected) {
                        values.push(option.value);
                    }
                }

                this.raiseValueChanged(values);
            }
            else {
                let value = event.target.options[event.target.selectedIndex].value;
                this.raiseValueChanged(value);
            }
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        let selectedValues = this.props.multiple ? this.props.values : this.props.value;
        return (
            <select value={selectedValues} onChange={this.onChange} onBlur={this.onBlur} {...this.rest}>
                {this.props.dataSource.map((dataItem, i) => {
                    return <option key={i} value={dataItem}>{dataItem}</option>;
                })}
            </select>
        );
    }
}
Select.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** all values (example: ['a','b','c']). */
    dataSource: PropTypes.array.isRequired,

    /** selected value (example: 'a'). */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),

    /** Allows to select multiple values. */
    multiple: PropTypes.bool,

    /** selected values when multiple is true */
    values: PropTypes.array,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};
export default Select;