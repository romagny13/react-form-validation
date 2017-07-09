import React from 'react';
import PropTypes from 'prop-types';

import { omit, isFunction } from '../common/util';

/**  Create a collection of input type radio. */
export class RadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'dataSource', 'renderFunction']);

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
            this.raiseValueChanged(event.target.value);
        }
    }

    onBlur() {
        if (this.hasOnTouchSubscriber()) {
            this.raiseTouched();
        }
    }

    render() {
        const { dataSource, value } = this.props;
        if (this.props.renderFunction) {
            return this.props.renderFunction({ props: this.config, dataSource, value, onValueChange: this.onChange, onTouch: this.onBlur });
        }
        else {
            return (
                <div>
                    {dataSource.map((dataItem, i) => {
                        return (
                            <label key={i} className="radio-inline">
                                <input type="radio" name="title" value={dataItem} checked={dataItem === value} onChange={this.onChange} onBlur={this.onBlur} {...this.rest} />
                                {dataItem}
                            </label>);
                    })}
                </div>);
        }
    }
}
RadioGroup.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** All values (example: ['a','b','c']) */
    dataSource: PropTypes.array.isRequired,

    /** Checked value (example: 'a')*/
    value: PropTypes.string,

    /** Allow to customize rendering */
    renderFunction: PropTypes.func,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};