import React from 'react';
import PropTypes from 'prop-types';

import EyeIcon from './EyeIcon';

import { isUndefined, isFunction } from '../common/util';
import { omit, extend } from '../helpers/util';

/**  Creates an input type password with an eye icon that allows showing password. */
class Password extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elementType: 'password',
            eyeClosed: false
        };

        this.rest = omit(props, ['onChange', 'onBlur', 'onValueChange', 'onTouch', 'value', 'renderEyeIcon', 'type', 'style']);

        if (props.renderEyeIcon) {

            this.rest.className = this.rest.className ? this.rest.className + ' hide-ms-eye' : 'hide-ms-eye';

            this.blockStyle = props.width ? { position: 'relative', width: props.width } : { position: 'relative' };

            this.eyeLinkStyle = {
                display: 'block',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '12px',
                lineHeight: 1,
                zIndex: 1
            };

            this.onEyeIconClick = this.onEyeIconClick.bind(this);
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value || nextState.eyeClosed !== this.state.eyeClosed;
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

    onEyeIconClick(event) {
        event.preventDefault();

        let state = this.state.elementType === 'password' ? { elementType: 'text', eyeClosed: true } : { elementType: 'password', eyeClosed: false };
        this.setState(state);
    }

    render() {
        let value = isUndefined(this.props.value) ? '' : this.props.value;
        if (this.props.renderEyeIcon) {
            let displayEye = value !== '';
            return (
                <div style={this.blockStyle}>
                    <input type={this.state.elementType} value={value} onChange={this.onChange} onBlur={this.onBlur} style={{ position: 'relative', width: '100%' }} {...this.rest} />
                    {displayEye &&
                        <a href style={this.eyeLinkStyle} onClick={this.onEyeIconClick} className="eye-link" tabIndex="-1">
                            <EyeIcon closed={this.state.eyeClosed} />
                        </a>}
                </div >
            );
        }
        else {
            return <input type="password" value={value} onChange={this.onChange} onBlur={this.checkAndRaiseTouched} {...this.rest} />;
        }
    }

}
Password.propTypes = {
    /** Input name.*/
    name: PropTypes.string.isRequired,

    /** The type of the input field. */
    type: PropTypes.string,

    /** The value. */
    value: PropTypes.string,

    /** Allows displaying eye if true. */
    renderEyeIcon: PropTypes.bool,

    /** Allows to set the width of the element. */
    width: PropTypes.string,

    /** The function called on value change. */
    onValueChange: PropTypes.func,

    /** The function called on touch. */
    onTouch: PropTypes.func
};
Password.defaultProps = {
    type: 'password',
    value: '',
    renderEyeIcon: true
};
export default Password;
