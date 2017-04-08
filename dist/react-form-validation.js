/*!
 * romagny13-react-form-validation v0.3.1
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

var Checkbox = function (_React$Component) {
    inherits(Checkbox, _React$Component);

    function Checkbox(props) {
        classCallCheck(this, Checkbox);

        var _this = possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

        _this.state = {
            checked: props.checked
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    createClass(Checkbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
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

var CheckboxGroup = function (_React$Component) {
    inherits(CheckboxGroup, _React$Component);

    function CheckboxGroup(props) {
        classCallCheck(this, CheckboxGroup);

        var _this = possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

        _this.state = {
            currents: props.currents
        };

        _this.onChange = _this.onChange.bind(_this);
        _this.indexOf = _this.indexOf.bind(_this);
        return _this;
    }

    createClass(CheckboxGroup, [{
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

function validateAll(validators) {
    var formStates = {},
        formModel = {},
        hasOneOrMoreErrors = false;

    validators.forEach(function (validator) {
        var validation = validator.validateOnSubmit();
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

function isFormValid(formStates) {
    for (var name in formStates) {
        if (formStates.hasOwnProperty(name)) {
            var formState = formStates[name];
            if (formState.hasError) {
                return false;
            }
        }
    }
    return true;
}

var Form = function (_React$Component) {
    inherits(Form, _React$Component);

    function Form(props) {
        classCallCheck(this, Form);

        var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this._subscribers = [];
        _this._validators = [];

        _this.hasError = false;
        _this.formStates = {};
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
        value: function register(validator) {
            var _this2 = this;

            // subscribe to validation state change
            validator.onValidationStateChange(function (_ref) {
                var name = _ref.name,
                    hasError = _ref.hasError,
                    firstError = _ref.firstError;

                _this2.formStates[name] = { hasError: hasError, firstError: firstError };
                _this2.hasError = !isFormValid(_this2.formStates);
                // notify all subscribers that validation state changed
                _this2.raiseHasErrorChange(hasError);
            });
            // allow to validate each form group on submit
            this._validators.push(validator);
        }
    }, {
        key: 'onFormErrorStateChange',
        value: function onFormErrorStateChange(subscriber) {
            this._subscribers.push(subscriber);
        }
    }, {
        key: 'raiseHasErrorChange',
        value: function raiseHasErrorChange(event) {
            this._subscribers.forEach(function (subscriber) {
                subscriber(event);
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            event.preventDefault();

            var _validateAll = validateAll(this._validators),
                hasError = _validateAll.hasError,
                formStates = _validateAll.formStates,
                formModel = _validateAll.formModel;

            this.hasError = hasError;
            this.formStates = formStates;
            this.submitted = true;

            this.props.onSubmit({ hasError: hasError, formStates: formStates, formModel: formModel });
            this.raiseHasErrorChange(hasError);
        }
    }, {
        key: 'render',
        value: function render() {
            var rest = omit(this.props, ['onSubmit', 'mode']);
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
    }]);
    return Form;
}(React.Component);
Form.propTypes = {
    mode: React.PropTypes.oneOf(['submit', 'touched']),
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
};
Form.defaultProps = {
    mode: 'submit'
};
Form.childContextTypes = {
    form: React.PropTypes.any
};

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

var FormGroup = function FormGroup(_ref) {
    var id = _ref.id,
        hasErrorClassName = _ref.hasErrorClassName,
        hasSuccessClassName = _ref.hasSuccessClassName,
        showHasFeedback = _ref.showHasFeedback,
        showHasSuccess = _ref.showHasSuccess,
        hasFeedbackClassName = _ref.hasFeedbackClassName,
        hasErrorFeedbackClassName = _ref.hasErrorFeedbackClassName,
        hasSuccessFeedbackClassName = _ref.hasSuccessFeedbackClassName,
        className = _ref.className,
        children = _ref.children,
        hasError = _ref.hasError,
        hasSuccess = _ref.hasSuccess,
        firstError = _ref.firstError;

    var canShowHasSuccess = hasSuccess && showHasSuccess;
    var groupClassName = getGroupClassName(hasError, canShowHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName);
    return React.createElement(
        'div',
        { className: groupClassName, id: id },
        children,
        showHasFeedback && hasError && React.createElement('span', { className: hasErrorFeedbackClassName, 'aria-hidden': 'true' }),
        showHasFeedback && showHasSuccess && hasSuccess && React.createElement('span', { className: hasSuccessFeedbackClassName, 'aria-hidden': 'true' }),
        hasError ? React.createElement(
            'span',
            { className: 'help-block' },
            firstError
        ) : null
    );
};
FormGroup.propTypes = {
    id: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    hasErrorClassName: React.PropTypes.string,
    hasSuccessClassName: React.PropTypes.string,
    showHasFeedback: React.PropTypes.bool,
    showHasSuccess: React.PropTypes.bool,
    hasFeedbackClassName: React.PropTypes.string,
    hasErrorFeedbackClassName: React.PropTypes.string,
    hasSuccessFeedbackClassName: React.PropTypes.string
};
FormGroup.defaultProps = {
    className: 'form-group',
    hasErrorClassName: 'has-error',
    hasSuccessClassName: 'has-success',
    showHasFeedback: true,
    showHasSuccess: true,
    hasFeedbackClassName: 'has-feedback',
    hasErrorFeedbackClassName: 'glyphicon glyphicon-remove form-control-feedback',
    hasSuccessFeedbackClassName: 'glyphicon glyphicon-ok form-control-feedback'
};

function canValidateOnChange(validators, form, touched) {
    return validators.length > 0 && (touched === true || form && form.submitted);
}

function canValidateOnBlur(validators, form, touched) {
    return validators.length > 0 && !touched && form && form.mode === 'touched';
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

function findElementByName(element, name) {
    if (element && name) {
        return element.querySelector('[name=\'' + name + '\']');
    }
}

var Validator = function (_React$Component) {
    inherits(Validator, _React$Component);

    function Validator(props, context) {
        classCallCheck(this, Validator);

        var _this = possibleConstructorReturn(this, (Validator.__proto__ || Object.getPrototypeOf(Validator)).call(this, props, context));

        _this._subscribers = [];

        _this.state = getInitialErrorFormState(_this.props.errors);

        // name of form element(s) to validate
        _this.name = props.name;

        if (isFunction(_this.props.onValidationStateChange)) {
            _this.onValidationStateChange(_this.props.onValidationStateChange);
        }
        // register this form group to form for submit event
        if (isDefined(_this.context.form)) {
            _this.context.form.register(_this);
        }
        return _this;
    }

    createClass(Validator, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.errors) {
                var errors = nextProps.errors,
                    hasError = objLength(errors) > 0,
                    hasSuccess = !hasError,
                    firstError = hasError ? getFirstError(errors) : '';

                this.setState({ hasError: hasError, hasSuccess: hasSuccess, firstError: firstError, errors: errors });

                var name = this.name;
                var element = findElementByName(this.refs.root, name);
                if (element) {
                    var value = getElementValue(element);
                    this.raiseValidationStateChange({ name: name, value: value, hasError: hasError, hasSuccess: hasSuccess, firstError: firstError, errors: errors });
                }
            }
        }
    }, {
        key: 'onValidationStateChange',
        value: function onValidationStateChange(subscriber) {
            this._subscribers.push(subscriber);
        }
    }, {
        key: 'raiseValidationStateChange',
        value: function raiseValidationStateChange(event) {
            this._subscribers.forEach(function (subscriber) {
                subscriber(event);
            });
        }
    }, {
        key: 'validateOnSubmit',
        value: function validateOnSubmit() {
            // get name and value
            var name = this.name;
            var element = findElementByName(this.refs.root, name);
            if (!element) return;
            var value = getElementValue(element);

            // validate value

            var _validateValue = validateValue(value, this.props.validators),
                hasError = _validateValue.hasError,
                firstError = _validateValue.firstError,
                errors = _validateValue.errors;

            // change state


            this.setState({ hasError: hasError, hasSuccess: !hasError, firstError: firstError, errors: errors });

            this.submitted = true;

            return {
                name: name,
                value: value,
                hasError: hasError,
                firstError: firstError,
                errors: errors
            };
        }
    }, {
        key: 'validateOnChange',
        value: function validateOnChange(event) {
            if (event.target.name !== this.name) return;

            // get name and value
            var name = event.target.name,
                value = getElementValue(event.target);

            // validate value

            var _validateValue2 = validateValue(value, this.props.validators),
                hasError = _validateValue2.hasError,
                firstError = _validateValue2.firstError,
                errors = _validateValue2.errors;

            // check if validation state has changed


            if (validationStateHasChanged(this.state, hasError, firstError)) {
                // change state
                var hasSuccess = !hasError;
                this.setState({ hasError: hasError, hasSuccess: hasSuccess, firstError: firstError, errors: errors });

                if (!this.touched) {
                    this.touched = true;
                }

                // notify validation state change
                this.raiseValidationStateChange({ name: name, value: value, hasError: hasError, hasSuccess: hasSuccess, firstError: firstError, errors: errors });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var handles = {
                onBlur: function onBlur(event) {
                    if (canValidateOnBlur(_this2.props.validators, _this2.context.form, _this2.touched)) {
                        _this2.validateOnChange(event);
                    }
                },
                onChange: function onChange(event) {
                    if (canValidateOnChange(_this2.props.validators, _this2.context.form, _this2.touched)) {
                        _this2.validateOnChange(event);
                    }
                }
            };
            var root = this.props.children;
            if (Array.isArray(root)) {
                throw new Error('Validator do not support array of elements.');
            }

            if (typeof root.type === 'function') {
                // component
                // validation states + root element props
                var params = Object.assign({}, this.state, root.props);
                // create component
                var component = new this.props.children.type(params);
                var props = Object.assign({}, component.props, handles);
                return React.createElement(
                    component.type,
                    _extends({ ref: 'root' }, props),
                    component.props.children
                );
            } else {
                // render content with no validation
                return React.createElement(
                    root.type,
                    _extends({ ref: 'root' }, root.props),
                    root.props.children
                );
            }
        }
    }]);
    return Validator;
}(React.Component);
Validator.contextTypes = {
    form: React.PropTypes.any
};
Validator.propTypes = {
    name: React.PropTypes.string.isRequired,
    validators: React.PropTypes.array.isRequired,
    onValidationStateChange: React.PropTypes.func,
    errors: React.PropTypes.object
};
Validator.defaultProps = {
    validators: []
};

function getInputInitialValue(value) {
    return isDefined(value) ? value : '';
}

var Input = function (_React$Component) {
    inherits(Input, _React$Component);

    function Input(props) {
        classCallCheck(this, Input);

        var _this = possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        var value = getInputInitialValue(props.value);
        _this.state = {
            value: value
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
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
    focus: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string
};
Input.defaultProps = {
    type: 'text'
};

var RadioGroup = function (_React$Component) {
    inherits(RadioGroup, _React$Component);

    function RadioGroup(props) {
        classCallCheck(this, RadioGroup);

        var _this = possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.state = {
            current: props.current
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    createClass(RadioGroup, [{
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

var Select = function (_React$Component) {
    inherits(Select, _React$Component);

    function Select(props) {
        classCallCheck(this, Select);

        var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.state = {
            current: props.current
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    createClass(Select, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            doFocus(this.props.focus, this.refs[this.props.name]);
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

var TextArea = function (_React$Component) {
    inherits(TextArea, _React$Component);

    function TextArea(props) {
        classCallCheck(this, TextArea);

        var _this = possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

        _this.state = {
            value: props.value
        };

        _this.onChange = _this.onChange.bind(_this);
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

var Submit = function (_React$Component) {
    inherits(Submit, _React$Component);

    function Submit(props, context) {
        classCallCheck(this, Submit);

        var _this = possibleConstructorReturn(this, (Submit.__proto__ || Object.getPrototypeOf(Submit)).call(this, props, context));

        _this.state = {
            disabled: false
        };

        if (_this.props.shouldDisable && isDefined(_this.context.form)) {
            _this.context.form.onFormErrorStateChange(function (hasError) {
                _this.setState({
                    disabled: hasError
                });
            });
        }
        return _this;
    }

    createClass(Submit, [{
        key: 'render',
        value: function render() {
            var rest = omit(this.props, ['shouldDisable', 'disabled', 'type']);
            return React.createElement('input', _extends({ type: 'submit', disabled: this.state.disabled }, rest));
        }
    }]);
    return Submit;
}(React.Component);
Submit.propTypes = {
    shouldDisable: React.PropTypes.bool
};
Submit.defaultProps = {
    shouldDisable: true
};
Submit.contextTypes = {
    form: React.PropTypes.any
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
exports.Validator = Validator;
exports.validateValue = validateValue;
exports.Input = Input;
exports.RadioGroup = RadioGroup;
exports.Select = Select;
exports.TextArea = TextArea;
exports.Submit = Submit;

Object.defineProperty(exports, '__esModule', { value: true });

})));
