import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';

import { omit } from '../common/util';

export class CheckboxGroup extends FormElement {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'dataSource', 'values', 'renderFunction']);

        this.onChange = this.onChange.bind(this);
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

    render() {
        const { dataSource, values } = this.props;
        if (this.props.renderFunction) {
            return this.props.renderFunction({ props: this.config, dataSource, values, onValueChange: this.onChange, onTouch: this.checkAndRaiseTouched });
        }
        else {
            return (
                <div>
                    {dataSource.map((dataItem, i) => {
                        return (
                            <div key={i} className="checkbox">
                                <label>
                                    <input type="checkbox" value={dataItem} checked={values.indexOf(dataItem) !== -1} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />
                                    {dataItem}
                                </label>
                            </div>);
                    })}
                </div>);
        }
    }
}
CheckboxGroup.propTypes = {
    dataSource: PropTypes.array.isRequired,
    values: PropTypes.array,
    renderFunction: PropTypes.func
};