import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';

import { omit } from '../common/util';

export class Select extends FormElement {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'value', 'dataSource']);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            let value = event.target.options[event.target.selectedIndex].value;
            this.raiseValueChanged(value);
        }
    }

    render() {
        const { dataSource, value } = this.props;
        return (
            <select value={value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest}>
                {dataSource.map((dataItem, i) => {
                    return <option key={i} value={dataItem}>{dataItem}</option>;
                })}
            </select>
        );
    }
}
Select.propTypes = {
    dataSource: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};