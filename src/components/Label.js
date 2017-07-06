import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from '../common/util';

export class Label extends Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['asterisk', 'asteriskColor']);
    }

    render() {
        return <label {...this.rest}>{this.props.children} {this.props.asterisk && <span style={{ color: this.props.asteriskColor }}> *</span>}</label>;
    }
}
Label.propTypes = {
    children: PropTypes.node,
    asterisk: PropTypes.bool,
    asteriskColor: PropTypes.string
};
Label.defaultProps = {
    asterisk: false,
    asteriskColor: 'red'
};
