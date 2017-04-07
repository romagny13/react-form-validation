/*!
 * romagny13-react-form-validation v0.1.10
 * (c) 2017 romagny13
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.ReactFormValidation = global.ReactFormValidation || {}),global.React));
}(this, (function (exports,React) { 'use strict';

React = 'default' in React ? React['default'] : React;

function isUndefined(value) {
    return typeof value === 'undefined';
}
function isDefined(value) {
    return typeof value !== 'undefined';
}
function isString(value) {
    return typeof value === 'string';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isFunction(value) {
    return typeof value === 'function';
}


function doFocus(focused, element) {
    if (focused && element) {
        element.focus();
    }
}

function objLength(obj) {
    return Object.keys(obj).length;
}

function omit(obj) {
    var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var result = {};
    for (var name in obj) {
        if (obj.hasOwnProperty(name) && names.indexOf(name) === -1) {
            result[name] = obj[name];
        }
    }
    return result;
}

function isRequired(value) {
    return value === null || isUndefined(value) || value === '' || isBoolean(value) && value === false;
}

function formatMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

var required = function required(message) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'required';

    var error = isString(message) ? message : 'This field is required.';
    return function (value) {
        if (isRequired(value)) {
            return {
                name: name,
                error: error
            };
        }
    };
};

var minLength = function minLength(_minLength2, message) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'minLength';

    var _minLength = isNumber(_minLength2) ? _minLength2 : 3;
    var error = isString(message) ? message : formatMessage('Please enter at least than {0} characters.', '{0}', _minLength);
    return function (value) {
        if (!isRequired(value) && value.length < _minLength) {
            return {
                name: name,
                error: error
            };
        }
    };
};

var maxLength = function maxLength(_maxLength2, message) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'maxLength';

    var _maxLength = isNumber(_maxLength2) ? _maxLength2 : 30;
    var error = isString(message) ? message : formatMessage('Please enter no more than {0} characters.', '{0}', _maxLength);
    return function (value) {
        if (!isRequired(value) && value.length > _maxLength) {
            return {
                name: name,
                error: error
            };
        }
    };
};

var pattern = function pattern(_pattern, message) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'pattern';

    var error = isString(message) ? message : 'Please fix this field.';
    return function (value) {
        if (!isRequired(value) && !_pattern.test(value)) {
            return {
                name: name,
                error: error
            };
        }
    };
};

var custom = function custom(fn, message) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'custom';

    var error = isString(message) ? message : 'Please fix this field.';
    return function (value) {
        if (!isRequired(value) && !fn(value)) {
            return {
                name: name,
                error: error
            };
        }
    };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function canValidateOnChange(validators, form, touched) {
    return validators.length > 0 && (touched === true || form && form.submitted);
}

function canValidateOnBlur(validators, form, touched) {
    return validators.length > 0 && !touched && form && form.mode === 'touched';
}

function getGroupClassName(hasError, showHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName) {
    if (hasError) {
        var result = className && className !== '' ? className + ' ' + hasErrorClassName : hasErrorClassName;
        if (showHasFeedback) {
            result += ' ' + hasFeedbackClassName;
        }
        return result;
    } else if (showHasSuccess) {
        var _result = className && className !== '' ? className + ' ' + hasSuccessClassName : hasSuccessClassName;
        if (showHasFeedback) {
            _result += ' ' + hasFeedbackClassName;
        }
        return _result;
    }
    return className;
}

function getElementValue(element) {
    var tagName = element.tagName;
    if (tagName === 'INPUT') {
        if (element.type === 'checkbox') {
            return element.value !== 'on' ? element.value : element.checked;
        } else {
            return element.value;
        }
    } else if (tagName === 'TEXTAREA') {
        return element.value;
    } else if (tagName === 'SELECT') {
        return element.options[element.selectedIndex].value;
    }
}

function validateValue(value, validators) {
    var hasError = false,
        errors = {},
        firstError = '';

    validators.forEach(function (validator) {
        var result = validator(value);
        if (result) {
            hasError = true;
            // example:  errors: { required: 'This field is required.' }
            errors[result.name] = result.error;
        }
    });

    if (hasError) {
        firstError = getFirstError(errors);
    }
    return {
        hasError: hasError,
        firstError: firstError,
        errors: errors
    };
}

function getFirstError(obj) {
    return obj[Object.keys(obj)[0]];
}

function validationStateHasChanged(state, newHasError, newFirstError) {
    // current
    var hasError = state.hasError,
        firstError = state.firstError;
    // new

    return newHasError !== hasError || newFirstError !== firstError;
}

function hasSuccess(form, touched) {
    if (form && form.showHasSuccess) {
        return form.submitted || touched;
    }
    return false;
}

function getInitialErrorFormState(errors) {
    if (errors && objLength(errors) > 0) {
        return {
            hasError: true,
            hasSuccess: false,
            firstError: getFirstError(errors),
            errors: errors
        };
    } else {
        return {
            hasError: false,
            hasSuccess: false,
            firstError: '',
            errors: {}
        };
    }
}

var FormGroup = function (_React$Component) {
    inherits(FormGroup, _React$Component);

    function FormGroup(props, context) {
        classCallCheck(this, FormGroup);

        var _this = possibleConstructorReturn(this, (FormGroup.__proto__ || Object.getPrototypeOf(FormGroup)).call(this, props, context));

        _this.state = getInitialErrorFormState(props.errors);

        _this.hasErrorClassName = _this.context.form && _this.context.form.hasErrorClassName || 'has-error';
        _this.hasSuccessClassName = _this.context.form && _this.context.form.hasSuccessClassName || 'has-success';
        _this.showHasFeedback = _this.context.form && _this.context.form.showHasFeedback;
        _this.hasFeedbackClassName = _this.context.form && _this.context.form.hasFeedbackClassName || 'has-feedback';
        _this.hasErrorFeedbackClassName = _this.context.form && _this.context.form.hasErrorFeedbackClassName || 'glyphicon glyphicon-remove form-control-feedback';
        _this.hasSuccessFeedbackClassName = _this.context.form && _this.context.form.hasSuccessFeedbackClassName || 'glyphicon glyphicon-ok form-control-feedback';

        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        // register this form group to form for submit event
        if (isDefined(_this.context.form)) {
            _this.context.form.register(_this);
        }
        return _this;
    }

    createClass(FormGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { formGroup: this };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.errors) {
                var errors = nextProps.errors,
                    hasError = objLength(errors) > 0,
                    firstError = hasError ? getFirstError(errors) : '';
                this.setState({
                    hasError: hasError,
                    firstError: firstError,
                    errors: errors
                });
            }
        }
    }, {
        key: 'register',
        value: function register(name, formElement) {
            // register this form element
            this.formElement = formElement;
        }
    }, {
        key: 'validate',
        value: function validate() {
            // No form element registered for this group
            if (!this.formElement) return;

            var name = this.formElement.getName();
            var value = this.formElement.getValue();

            // validate value

            var _validateValue = validateValue(value, this.props.validators),
                hasError = _validateValue.hasError,
                firstError = _validateValue.firstError,
                errors = _validateValue.errors;

            // change state


            this.setState({
                hasError: hasError,
                hasSuccess: !hasError,
                firstError: firstError,
                errors: errors
            });

            return {
                name: name,
                value: value,
                hasError: hasError,
                firstError: firstError,
                errors: errors
            };
        }
    }, {
        key: '_validateOnChange',
        value: function _validateOnChange(event) {
            // get form element value
            var value = getElementValue(event.target);

            // validate value

            var _validateValue2 = validateValue(value, this.props.validators),
                hasError = _validateValue2.hasError,
                firstError = _validateValue2.firstError,
                errors = _validateValue2.errors;

            // check if validation state has changed


            if (validationStateHasChanged(this.state, hasError, firstError)) {
                // change state
                this.setState({ hasError: hasError, hasSuccess: !hasError, firstError: firstError, errors: errors });

                if (!this.touched) {
                    this.touched = true;
                }
                // notify validation state change
                if (isFunction(this.props.onChange)) {
                    this.props.onChange(event.target.name, value, hasError, firstError, errors);
                }
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            if (canValidateOnChange(this.props.validators, this.context.form, this.touched)) {
                this._validateOnChange(event);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            if (canValidateOnBlur(this.props.validators, this.context.form, this.touched)) {
                this._validateOnChange(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var showHasSuccess = hasSuccess(this.context.form, this.touched);
            var groupClassName = getGroupClassName(this.state.hasError, showHasSuccess, this.props.className, this.hasErrorClassName, this.hasSuccessClassName, this.showHasFeedback, this.hasFeedbackClassName);
            return React.createElement(
                'div',
                { className: groupClassName, onChange: this.onChange, onBlur: this.onBlur },
                this.props.children,
                this.showHasFeedback && this.state.hasError && React.createElement('span', { className: this.hasErrorFeedbackClassName, 'aria-hidden': 'true' }),
                this.showHasFeedback && showHasSuccess && this.state.hasSuccess && React.createElement('span', { className: this.hasSuccessFeedbackClassName, 'aria-hidden': 'true' }),
                this.state.hasError ? React.createElement(
                    'span',
                    { className: 'help-block' },
                    this.state.firstError
                ) : null
            );
        }
    }]);
    return FormGroup;
}(React.Component);
FormGroup.propTypes = {
    validators: React.PropTypes.array,
    children: React.PropTypes.node,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    errors: React.PropTypes.object
};
FormGroup.defaultProps = {
    validators: []
};
FormGroup.contextTypes = {
    form: React.PropTypes.any
};
FormGroup.childContextTypes = {
    formGroup: React.PropTypes.any
};

var Checkbox = function (_React$Component) {
    inherits(Checkbox, _React$Component);

    function Checkbox(props, context) {
        classCallCheck(this, Checkbox);

        var _this = possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props, context));

        _this.state = {
            checked: props.checked
        };

        _this.onChange = _this.onChange.bind(_this);
        if (isDefined(_this.context.formGroup)) {
            _this.context.formGroup.register(_this.props.name, _this);
        }
        return _this;
    }

    createClass(Checkbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.props.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.checked;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var checked = event.target.checked;
            this.setState({
                checked: checked
            });
            // notify
            if (isFunction(this.props.onChange)) {
                this.props.onChange(this.props.name, checked);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('input', {
                ref: this.props.name,
                type: 'checkbox',
                id: this.props.id,
                name: this.props.name,
                checked: this.state.checked,
                onChange: this.onChange,
                className: this.props.className });
        }
    }]);
    return Checkbox;
}(React.Component);
Checkbox.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    checked: React.PropTypes.bool,
    focus: React.PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};
Checkbox.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var CheckboxGroup = function (_React$Component) {
    inherits(CheckboxGroup, _React$Component);

    function CheckboxGroup(props, context) {
        classCallCheck(this, CheckboxGroup);

        var _this = possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props, context));

        _this.state = {
            currents: props.currents
        };

        _this.onChange = _this.onChange.bind(_this);
        _this.indexOf = _this.indexOf.bind(_this);
        if (isDefined(_this.context.formGroup)) {
            _this.context.formGroup.register(_this.props.name, _this);
        }
        return _this;
    }

    createClass(CheckboxGroup, [{
        key: 'getName',
        value: function getName() {
            return this.props.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.currents;
        }
    }, {
        key: 'indexOf',
        value: function indexOf(value) {
            var currents = this.props.currents;
            for (var i = 0; i < currents.length; i++) {
                if (currents[i] === value) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var value = event.target.value;
            var index = this.indexOf(value);
            var currents = this.state.currents;
            if (index !== -1) {
                currents.splice(index, 1);
            } else {
                currents.push(value);
            }

            this.setState({
                currents: currents
            });
            // notify
            if (isFunction(this.props.onChange)) {
                this.props.onChange(this.props.name, currents);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                this.props.dataSource.map(function (current, i) {
                    return React.createElement(
                        'div',
                        { key: i },
                        React.createElement('input', {
                            type: 'checkbox',
                            name: _this2.props.name,
                            checked: _this2.indexOf(current) !== -1,
                            value: current,
                            onChange: _this2.onChange,
                            className: _this2.props.className }),
                        current
                    );
                })
            );
        }
    }]);
    return CheckboxGroup;
}(React.Component);
CheckboxGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    currents: React.PropTypes.array
};
CheckboxGroup.defaultProps = {
    currents: []
};
CheckboxGroup.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

function validateAll(formGroups) {
    var formStates = {},
        formModel = {},
        hasOneOrMoreErrors = false;

    formGroups.forEach(function (formGroup) {
        var validation = formGroup.validate();
        // could be null if FormGroup has no registered form component
        if (validation) {
            var name = validation.name,
                hasError = validation.hasError,
                firstError = validation.firstError,
                value = validation.value;

            formStates[name] = { hasError: hasError, firstError: firstError };
            formModel[name] = value;
            if (hasError) {
                hasOneOrMoreErrors = true;
            }
        }
    });

    return {
        hasError: hasOneOrMoreErrors,
        formStates: formStates,
        formModel: formModel
    };
}

var Form = function (_React$Component) {
    inherits(Form, _React$Component);

    function Form(props) {
        classCallCheck(this, Form);

        var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.formGroups = [];
        _this.submitted = false;
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }

    createClass(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { form: this };
        }
    }, {
        key: 'register',
        value: function register(formGroup) {
            // register form groups
            this.formGroups.push(formGroup);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            event.preventDefault();

            var _validateAll = validateAll(this.formGroups),
                hasError = _validateAll.hasError,
                formStates = _validateAll.formStates,
                formModel = _validateAll.formModel;

            this.submitted = true;
            this.props.onSubmit(hasError, formStates, formModel);
        }
    }, {
        key: 'render',
        value: function render() {
            var rest = omit(this.props, ['onSubmit', 'mode', 'showHasSuccess', 'hasErrorClassName', 'hasSuccessClassName', 'showHasFeedback', 'hasFeedbackClassName', 'hasErrorFeedbackClassName', 'hasSuccessFeedbackClassName']);
            return React.createElement(
                'form',
                _extends({ onSubmit: this.onSubmit }, rest),
                this.props.children
            );
        }
    }, {
        key: 'mode',
        get: function get$$1() {
            return this.props.mode;
        }
    }, {
        key: 'showHasSuccess',
        get: function get$$1() {
            return this.props.showHasSuccess;
        }
    }, {
        key: 'showHasFeedback',
        get: function get$$1() {
            return this.props.showHasFeedback;
        }
    }, {
        key: 'hasFeedbackClassName',
        get: function get$$1() {
            return this.props.hasFeedbackClassName;
        }
    }, {
        key: 'hasErrorClassName',
        get: function get$$1() {
            return this.props.hasErrorClassName;
        }
    }, {
        key: 'hasSuccessClassName',
        get: function get$$1() {
            return this.props.hasSuccessClassName;
        }
    }, {
        key: 'hasErrorFeedbackClassName',
        get: function get$$1() {
            return this.props.hasErrorFeedbackClassName;
        }
    }, {
        key: 'hasSuccessFeedbackClassName',
        get: function get$$1() {
            return this.props.hasSuccessFeedbackClassName;
        }
    }]);
    return Form;
}(React.Component);
Form.propTypes = {
    mode: React.PropTypes.oneOf(['submit', 'touched']),
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
    showHasSuccess: React.PropTypes.bool,
    showHasFeedback: React.PropTypes.bool,
    hasErrorClassName: React.PropTypes.string,
    hasSuccessClassName: React.PropTypes.string,
    hasFeedbackClassName: React.PropTypes.string,
    hasErrorFeedbackClassName: React.PropTypes.string,
    hasSuccessFeedbackClassName: React.PropTypes.string
};
Form.defaultProps = {
    mode: 'submit',
    showHasSuccess: false,
    showHasFeedback: false,
    hasErrorClassName: 'has-error',
    hasSuccessClassName: 'has-success',
    hasFeedbackClassName: 'has-feedback',
    hasErrorFeedbackClassName: 'glyphicon glyphicon-remove form-control-feedback',
    hasSuccessFeedbackClassName: 'glyphicon glyphicon-ok form-control-feedback'
};
Form.childContextTypes = {
    form: React.PropTypes.any
};

function getInputInitialValue(value) {
    return isDefined(value) ? value : '';
}

var Input = function (_React$Component) {
    inherits(Input, _React$Component);

    function Input(props, context) {
        classCallCheck(this, Input);

        var _this = possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

        var value = getInputInitialValue(props.value);
        _this.state = {
            value: value
        };

        _this.onChange = _this.onChange.bind(_this);
        if (isDefined(_this.context.formGroup)) {
            _this.context.formGroup.register(_this.props.name, _this);
        }
        return _this;
    }

    createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.props.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var value = event.target.value;
            this.setState({
                value: value
            });
            if (isFunction(this.props.onChange)) {
                this.props.onChange(this.props.name, value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('input', {
                ref: this.props.name,
                type: this.props.type,
                id: this.props.id,
                name: this.props.name,
                value: this.state.value,
                onChange: this.onChange,
                className: this.props.className,
                placeholder: this.props.placeholder });
        }
    }]);
    return Input;
}(React.Component);
Input.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    placeholder: React.PropTypes.string,
    focus: React.PropTypes.bool
};
Input.defaultProps = {
    type: 'text'
};
Input.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var RadioGroup = function (_React$Component) {
    inherits(RadioGroup, _React$Component);

    function RadioGroup(props, context) {
        classCallCheck(this, RadioGroup);

        var _this = possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props, context));

        _this.state = {
            current: props.current
        };

        _this.onChange = _this.onChange.bind(_this);
        if (isDefined(_this.context.formGroup)) {
            _this.context.formGroup.register(_this.props.name, _this);
        }
        return _this;
    }

    createClass(RadioGroup, [{
        key: 'getName',
        value: function getName() {
            return this.props.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.current;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var current = event.target.value;
            this.setState({
                current: current
            });
            // notify
            if (isFunction(this.props.onChange)) {
                this.props.onChange(this.props.name, current);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                this.props.dataSource.map(function (current, i) {
                    return React.createElement(
                        'div',
                        { key: i },
                        React.createElement('input', {
                            type: 'radio',
                            name: _this2.props.name,
                            checked: _this2.state.current === current,
                            value: current,
                            onChange: _this2.onChange,
                            className: _this2.props.className }),
                        current
                    );
                })
            );
        }
    }]);
    return RadioGroup;
}(React.Component);
RadioGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool])
};
RadioGroup.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var Select = function (_React$Component) {
    inherits(Select, _React$Component);

    function Select(props, context) {
        classCallCheck(this, Select);

        var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

        _this.state = {
            current: props.current
        };

        _this.onChange = _this.onChange.bind(_this);
        if (isDefined(_this.context.formGroup)) {
            _this.context.formGroup.register(_this.props.name, _this);
        }
        return _this;
    }

    createClass(Select, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.props.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.current;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var current = event.target.options[event.target.selectedIndex].value;
            this.setState({
                current: current
            });
            // notify
            if (isFunction(this.props.onChange)) {
                this.props.onChange(this.props.name, current);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'select',
                {
                    ref: this.props.name,
                    id: this.props.id,
                    name: this.props.name,
                    value: this.state.current,
                    onChange: this.onChange,
                    className: this.props.className },
                this.props.dataSource.map(function (current, i) {
                    return React.createElement(
                        'option',
                        { key: i, value: current, onChange: _this2.onChange },
                        current
                    );
                })
            );
        }
    }]);
    return Select;
}(React.Component);
Select.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    focus: React.PropTypes.bool
};
Select.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var TextArea = function (_React$Component) {
    inherits(TextArea, _React$Component);

    function TextArea(props, context) {
        classCallCheck(this, TextArea);

        var _this = possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props, context));

        _this.state = {
            value: props.value
        };

        _this.onChange = _this.onChange.bind(_this);
        if (isDefined(_this.context.formGroup)) {
            _this.context.formGroup.register(_this.props.name, _this);
        }
        return _this;
    }

    createClass(TextArea, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.props.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var value = event.target.value;
            this.setState({
                value: value
            });
            if (isFunction(this.props.onChange)) {
                this.props.onChange(this.props.name, value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var rest = omit(this.props, ['value', 'onChange', 'focus']);
            return React.createElement('textarea', _extends({
                ref: this.props.name,
                value: this.state.value,
                onChange: this.onChange
            }, rest));
        }
    }]);
    return TextArea;
}(React.Component);
TextArea.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    focus: React.PropTypes.bool
};
TextArea.defaultProps = {
    value: ''
};
TextArea.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

exports.required = required;
exports.minLength = minLength;
exports.maxLength = maxLength;
exports.pattern = pattern;
exports.custom = custom;
exports.isRequired = isRequired;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.Form = Form;
exports.FormGroup = FormGroup;
exports.validateValue = validateValue;
exports.Input = Input;
exports.RadioGroup = RadioGroup;
exports.Select = Select;
exports.TextArea = TextArea;

Object.defineProperty(exports, '__esModule', { value: true });

})));
