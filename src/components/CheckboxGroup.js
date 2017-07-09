import React from 'react';
import PropTypes from 'prop-types';

import { omit, isFunction } from '../common/util';

/**  Creates a collection of checkbox with a dataSource. */
export class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'dataSource', 'values', 'blockClassName']);

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

            let value = event.target.value;
            let values = this.props.values;
            let index = values.indexOf(value);

            if (index !== -1) { values.splice(index, 1); }
            else { values.push(value); }

            this.raiseValueChanged(values);
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        const { dataSource, values, blockClassName } = this.props;
        return (
            <div>
                {dataSource.map((dataItem, i) => {
                    return (
                        <div key={i} className={blockClassName}>
                            <label>
                                <input type="checkbox" value={dataItem} checked={values.indexOf(dataItem) !== -1} onChange={this.onChange} onBlur={this.onBlur} {...this.rest} />
                                {dataItem}
                            </label>
                        </div>);
                })}
            </div>);
    }
}
CheckboxGroup.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** All values (example: ['a','b','c']). */
    dataSource: PropTypes.array.isRequired,

    /** Checked values (example: ['a','c']). */
    values: PropTypes.array,

    /** The class name to add on block (example: "checkbox-inline").*/
    blockClassName: PropTypes.string,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};