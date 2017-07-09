import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

export class CodeExample extends React.Component {
    componentDidMount() {
        hljs.registerLanguage('javascript', javascript);
        hljs.highlightBlock(this.refs.refcode);
    }

    render() {
         return (
             <pre>
                 <code ref="refcode">
                    {this.props.children}
                 </code>
             </pre>
         );
     }
}
CodeExample.propTypes = {
    children: PropTypes.string.isRequired
};
