import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit, clone } from '../common/util';

export class Reset extends Component {
    constructor(props) {
        super(props);

        this.rest = omit(props, ['initialState', 'onReset']);

        // begin edit
        this.initialStateClone = clone(props.initialState);

        this.onCancelEdit = this.onCancelEdit.bind(this);
    }

    onCancelEdit() {
        let initialState = clone(this.initialStateClone);
        this.props.onReset(initialState);
    }

    render() {
        return <input type="button" onClick={this.onCancelEdit} {...this.rest} />;
    }
}
Reset.propTypes = {
    initialState: PropTypes.object.isRequired,
    onReset: PropTypes.func.isRequired
};