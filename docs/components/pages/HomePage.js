import React from 'react';
import PropTypes from 'prop-types';

import { changeMetaDescription } from '../../utils/seo';

import MarkdownElement from '../MarkdownElement';

let text = `# React Form Validation

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

> This Library allows validating React Forms easily with a collection of helpers and components.

Helpers: allow validating simple form (with no component or another component framework )
* **Validators**: 
    * _required_
    * _minlength_ (by default 3 characters)
    * _maxlength_ (by default 30 characters)
    * _email_
    * _pattern_ (with a regular expression)
    * _custom_ (with a function)
    * ( + isNullOrEmpty )
* **ValidationHelper** allows validating a value, a property or a form model
    * _validateValue_
    * _validateProperty_
    * _validateAll_
    * ( + hasErrors, countErrors )
* **DOMFormHelper** allows resolving element value
    * _getElementValue_: returns the value of a form element (input, select, radio, etc.)
* **Util**: 
    * _omit_
    * _clone_
    * _extend_

Components: allow to bind value and notify on value change (onValueChange) and on touch / blur (onTouch)
* **Input**
* **Password** (allows showing password)
* **Checkbox**
* **CheckboxGroup**
* **Radio**
* **RadioGroup**
* **Select** (_multiple_ supported)
* **TextArea**
* **LightGroup** (allows showing error)
* **FormGroup** (allows showing error and success)
* **Form**
* **Label** (_asterisk_ for required field)
* **FontIcon** (Icon with Font Awesome) + **EyeIcon**
* **ErrorBlock**
* **Submit**  (could be disabled with errors)
* **Reset** (allows resetting to initial state)`;

class HomePage extends React.Component {

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
export default HomePage;
