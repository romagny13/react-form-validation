import React from 'react';
import PropTypes from 'prop-types';

import { FormElement } from './FormElement';
import { Eye } from './EyeIcon';

import { omit, isUndefined, extend } from '../common/util';

export class Password extends FormElement {
    constructor(props) {
        super(props);

        this.state = {
            elementType: 'password',
            eyeClosed: false
        };

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'value', 'renderEye', 'type']);

        if (props.renderEye) {

            this.rest.className = this.rest.className ? this.rest.className + ' hide-ms-eye' : 'hide-ms-eye';

            this.blockStyle = props.style ? extend(props.style, { position: 'relative' }) : { position: 'relative' };

            this.eyeLinkStyle = {
                display: 'block',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '12px',
                lineHeight: 1,
                zIndex: 1
            };

            this.onEyeClick = this.onEyeClick.bind(this);
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.hasOnValueChangeSubscriber()) {
            this.raiseValueChanged(event.target.value);
        }
    }

    onEyeClick(event) {
        event.preventDefault();

        let state = this.state.elementType === 'password' ? { elementType: 'text', eyeClosed: true } : { elementType: 'password', eyeClosed: false };
        this.setState(state);
    }

    render() {
        let value = isUndefined(this.props.value) ? '' : this.props.value;
        if (this.props.renderEye) {
            let displayEye = value !== '';
            return (
                <div style={this.blockStyle}>
                    <input type={this.state.elementType} value={value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} style={{ position: 'relative', width: '100%' }} {...this.rest} />
                    {displayEye &&
                        <a href style={this.eyeLinkStyle} onClick={this.onEyeClick}>
                            <Eye closed={this.state.eyeClosed} />
                        </a>}
                </div >
            );
        }
        else {
            return <input type="password" value={value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />;
        }
    }
}
Password.PropTypes = {
    value: PropTypes.string,
    renderEye: PropTypes.bool,
    className: PropTypes.string
};
Password.defaultProps = {
    value: '',
    renderEye: true,
    type: 'password'
};
