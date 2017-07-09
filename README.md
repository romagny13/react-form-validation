# React Form Validation

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

> This Library allows to validate easily React Forms with a collection of helpers and components.

Helpers: allow to validate simple form (with no component or another component framework )
* **Validations**: 
    * _required_: default or custom message
    * _minlength_: value (by default 3) + default or custom message
    * _maxlength_: value (by default 30) + default or custom message
    * _email_: default or custom message
    * _pattern_: regex pattern (required)  + default or custom message
    * _custom_: function to call (pass value and model)  + default or custom message
    * ( + isNullOrEmpty function )
* **ValidationHelper**: allow to validate value, property and form model
    * _validateValue_: model, value, validations array ( example for firstname: [required()] )
    * _validateProperty_: model, property name, validations array
    * _validateAll_: model, validations object ( example: {firstname:[required()], lastname:[required()]} )
    * ( + hasErrors, countErrors functions )
* **FormHelper**: allow to resolve element value
    * _getElementValue_: return value for form element (input, select, radio, etc.)
    * ( + hasClassName, addClassName, removeClassName functions )
* **Util**: 
    * _omit_: allow to omit props for example
    * _clone_: clone an object
    * _extend_: extend a source object with another object

Components: allow to bind value and notify on value change (onValueChange) and on touch / blur (onTouch)
* **Input** value + type ('text', 'email', 'password', 'search', 'file', 'color', 'date', 'month', 'time', 'week', 'tel', 'url', 'number', 'range') and shortcuts:
* **Password**: input type type password with eye component (allow to show password)
* **Checkbox**: _checked_
* **CheckboxGroup**: _dataSource_ + _values_. Its possible to use a custom **renderFunction**
* **Radio**: _checked_
* **RadioGroup**: _dataSource_ + _value_. Its possible to use a custom **renderFunction**
* **Select**: _dataSource_ + _value_  or _values with multiple_
* **TextArea**: _value_
* **FormGroup**: allow to show error and success (classNames based on Bootstrap: has-error, has-success, etc.) if **canChangeValidationState** is true
* **Form**: Form with noValidate by default
* **Label**: allow to display _asterisk_ for required field
* **FontIcon**: allow to show an icon (Font Awesome) by name (example: for 'fa fa-check', set the iconName to 'check') + **EyeIcon**
* **ErrorBlock** a span with the class name 'error-block'
* **Submit**: can be disabled if has errors (pass _errors_)
* **Reset**: clone _initialState_ (form model, errors, etc.) and pass inital state **onReset**

## Installation

```
npm i romagny13-react-form-validation -S
```
Require **Font Awesome**. With a `cdn`:
```xml
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
```
... Or with `Webpack` (+ `css-loader`):
```
npm i font-awesome -S
```
```js
import '../node_modules/font-awesome/css/font-awesome.css';
```

## Documentation

* [Components](https://romagny13.github.io/react-form-validation/)
* [Wiki](https://github.com/romagny13/react-form-validation/wiki)

## Lib examples

To run examples `npm i` then `npm run dev`
