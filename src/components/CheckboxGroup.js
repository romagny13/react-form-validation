import React from 'react';
import PropTypes from 'prop-types';

import { omit, isFunction } from '../common/util';

/**  Create a collection of checkbox. */
export class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'dataSource', 'values', 'renderFunction']);

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
        const { dataSource, values } = this.props;
        if (this.props.renderFunction) {
            return this.props.renderFunction({ props: this.config, dataSource, values, onValueChange: this.onChange, onTouch: this.onBlur });
        }
        else {
            return (
                <div>
                    {dataSource.map((dataItem, i) => {
                        return (
                            <div key={i} className="checkbox">
                                <label>
                                    <input type="checkbox" value={dataItem} checked={values.indexOf(dataItem) !== -1} onChange={this.onChange} onBlur={this.onBlur} {...this.rest} />
                                    {dataItem}
                                </label>
                            </div>);
                    })}
                </div>);
        }
    }
}
CheckboxGroup.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** All values (example: ['a','b','c']) */
    dataSource: PropTypes.array.isRequired,

    /** Checked values (example: ['a','c']) */
    values: PropTypes.array,

    /** Allow to customize rendering */
    renderFunction: PropTypes.func,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};