import React from 'react';
import PropTypes from 'prop-types';

import marked from 'marked';

class MarkdownElement extends React.Component {

    componentWillMount() {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                return require('highlight.js').highlight(lang, code).value;
            },
        });
    }

    render() {
        /* eslint-disable react/no-danger */
        return <div dangerouslySetInnerHTML={{ __html: marked(this.props.text) }} />;
        /* eslint-enable */
    }
}
MarkdownElement.propTypes = {
    text: PropTypes.string.isRequired
};
export default MarkdownElement;
