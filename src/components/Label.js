import React from 'react';
import PropTypes from 'prop-types';

import { omit } from '../helpers/util';

/**  Creates a label with asterisk for required field. */
export class Label extends React.Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['asterisk', 'asteriskColor']);
    }

    render() {
        return <label {...this.rest}>{this.props.children} {this.props.asterisk && <span style={{ color: this.props.asteriskColor }}> *</span>}</label>;
    }
}
Label.propTypes = {
    /** The children. */
    children: PropTypes.node,

    /** Displays the asterisk if true. */
    asterisk: PropTypes.bool,

    /** The color of asterisk. */
    asteriskColor: PropTypes.string
};
Label.defaultProps = {
    asterisk: false,
    asteriskColor: 'red'
};
