import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';

import { omit } from '../common/Util';

export class RadioGroup extends FormElement {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'value', 'dataSource', 'renderFunction']);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            this.raiseValueChanged(event.target.value);
        }
    }

    render() {
        const { dataSource, value } = this.props;
        if (this.props.renderFunction) {
            return this.props.renderFunction({ props: this.config, dataSource, value, onValueChange: this.onChange, onTouch: this.checkAndRaiseTouched });
        }
        else {
            return (
                <div>
                    {dataSource.map((dataItem, i) => {
                        return (
                            <label key={i} className="radio-inline">
                                <input type="radio" name="title" value={dataItem} checked={dataItem === value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />
                                {dataItem}
                            </label>);
                    })}
                </div>);
        }
    }
}
RadioGroup.propTypes = {
    dataSource: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    renderFunction: PropTypes.func
};