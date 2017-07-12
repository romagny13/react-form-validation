import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

export class CodeExample extends React.Component {
    componentDidMount() {
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('xml', xml);
        hljs.highlightBlock(this.refs.refcode);
    }

    render() {
         return (
             <pre className="code">
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
