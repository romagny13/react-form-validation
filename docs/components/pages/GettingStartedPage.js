import React from 'react';
import PropTypes from 'prop-types';

import { changeMetaDescription } from '../../utils/seo';

import MarkdownElement from '../MarkdownElement';
import CodeExample from '../CodeExample';

let text = `# Getting Started

## Installation

\`\`\`bash
npm i romagny13-react-form-validation -S
\`\`\`

Requires [Font Awesome](http://fontawesome.io/). With a **CDN**:
\`\`\`xml
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
\`\`\`
... Or with **Webpack** (+ **css-loader**):
\`\`\`bash
npm i font-awesome -S
\`\`\`
\`\`\`bash
import '../node_modules/font-awesome/css/font-awesome.css';
\`\`\`

## Create an Application
We could use:
* [create-react-app](https://github.com/facebookincubator/create-react-app) 
* Or a **Starter Kit**
* Or create a project "**from scratch**"

From scratch, **style-loader** and **css-loader** are required (with **Webpack**):

\`\`\`bash
npm i style-loader css-loader -D
\`\`\`
**Webpack** configuration file, add the **rule**:
\`\`\`js
{ test: /\\.css$/, use: ["style-loader", "css-loader"] }
\`\`\`

## ES6

\`\`\`js
import { LightGroup, ValidationHelper } from 'romagny13-react-form-validation';
\`\`\`

Or direct import (to optimize bundle size)

\`\`\`js
import LightGroup from 'romagny13-react-form-validation/lib/components/LightGroup';
import ValidationHelper from 'romagny13-react-form-validation/lib/helpers/ValidationHelper';
\`\`\`

## ES5

\`\`\`xml
 <script src="node_modules/romagny13-react-form-validation/dist/react-form-validation.min.js"></script>
\`\`\`

## Examples

To run examples \`npm i\` then \`npm run dev\`
`;


class GettingStartedPage extends React.Component {

    componentWillMount() {
        this.changeMetaDescription();
    }

    componentWillReceiveProps() {
        this.changeMetaDescription();
    }

    changeMetaDescription(props) {
        let content = 'This Library allows validating React Forms easily with a collection of helpers and components.';
        changeMetaDescription(content);
    }

    render() {
        return (
            <div className="basics">
                <div className="basics__presentation">
                    <MarkdownElement text={text} />
                </div>
            </div>
        );
    }
}
export default GettingStartedPage;

