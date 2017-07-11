# React Form Validation

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

> This Library allows validating React Forms easily with a collection of helpers and components.

Helpers: allow validating simple form (with no component or another component framework )
* **Validations**: 
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
* **FormHelper** allows resolving element value
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
* **Reset** (allows resetting to initial state)
## Installation

```
npm i romagny13-react-form-validation -S
```
Requires [Font Awesome](http://fontawesome.io/). With a **CDN**:
```xml
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
```
... Or with **Webpack** (+ **css-loader**):
```
npm i font-awesome -S
```
```js
import '../node_modules/font-awesome/css/font-awesome.css';
```

## Documentation

* [Site](https://romagny13.github.io/react-form-validation/)

## Lib examples

To run examples `npm i` then `npm run dev`
