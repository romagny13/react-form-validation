import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';

export class CodeExample extends React.Component {
    componentDidMount() {
        CodeMirror(this.refs.refcode, { value: this.props.children, mode: "jsx",  readOnly: true });
    }

    render() {
        return <pre><code ref="refcode" /></pre>;
    }
}
CodeExample.propTypes = {
    children: PropTypes.string.isRequired
};
