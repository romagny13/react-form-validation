/*!
 * romagny13-react-form-validation v0.4.2
 * (c) 2017 romagny13
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.ReactFormValidation = global.ReactFormValidation || {}),global.React));
}(this, (function (exports,React) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

function isRequired(value) {
    return value === null || typeof value === 'undefined' || value === '' || typeof value === 'boolean' && value === false;
}

function formatMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

var required = function required(message) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'required';

    var error = typeof message === 'string' ? message : 'This field is required.';
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

    var _minLength = typeof _minLength2 === 'number' ? _minLength2 : 3;
    var error = typeof message === 'string' ? message : formatMessage('Please enter at least than {0} characters.', '{0}', _minLength);
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

    var _maxLength = typeof _maxLength2 === 'number' ? _maxLength2 : 30;
    var error = typeof message === 'string' ? message : formatMessage('Please enter no more than {0} characters.', '{0}', _maxLength);
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

    var error = typeof message === 'string' ? message : 'Please fix this field.';
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

    var error = typeof message === 'string' ? message : 'Please fix this field.';
    return function (value, model) {
        if (!isRequired(value) && !fn(value, model)) {
            return {
                name: name,
                error: error
            };
        }
    };
};

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

function getConfig(props, names, onChange, onBlur) {
    var rest = omit(props, names);
    return Object.assign({}, rest, {
        onChange: onChange,
        onBlur: onBlur
    });
}

function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

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

var renderForm = function renderForm(props, children) {
    return React__default.createElement('form', props, children);
};
var renderValidator = function renderValidator(root, validationStates) {
    if (typeof root.type === 'function') {
        // component
        // validation states + root element props
        var params = Object.assign({}, validationStates, root.props);
        var component = new root.type(params);
        if (typeof component.type === 'string') {
            // stateless component
            return React__default.createElement(component.type, component.props, component.props.children);
        } else if (!component.type) {
            // extends react component
            var resolve = component.render();
            return React__default.createElement(resolve.type, resolve.props, resolve.props.children);
        }
    } else if (typeof root.type === 'string') {
        // render with no validation
        return React__default.createElement(root.type, root.props, root.props.children);
    }
    throw new Error('Cannot resolve the component');
};
var renderInput = function renderInput(props) {
    return React__default.createElement('input', props);
};
var renderCheckbox = function renderCheckbox(props) {
    return React__default.createElement('input', _extends({ type: 'checkbox' }, props));
};
var renderCheckboxGroup = function renderCheckboxGroup(props, dataSource, indexOf, onChange, onBlur) {
    return React__default.createElement(
        'div',
        null,
        dataSource.map(function (current, i) {
            return React__default.createElement(
                'div',
                { key: i },
                React__default.createElement('input', _extends({
                    type: 'checkbox',
                    checked: indexOf(current) !== -1,
                    value: current,
                    onChange: onChange,
                    onBlur: onBlur
                }, props)),
                current
            );
        })
    );
};
var renderRadioGroup = function renderRadioGroup(props, dataSource, current, onChange, onBlur) {
    return React__default.createElement(
        'div',
        null,
        dataSource.map(function (dataItem, i) {
            return React__default.createElement(
                'div',
                { key: i },
                React__default.createElement('input', _extends({
                    type: 'radio',
                    value: dataItem,
                    checked: current === dataItem,
                    onChange: onChange,
                    onBlur: onBlur
                }, props)),
                dataItem
            );
        })
    );
};
var renderSelect = function renderSelect(props, dataSource, onChange) {
    return React__default.createElement(
        'select',
        props,
        dataSource.map(function (current, i) {
            return React__default.createElement(
                'option',
                { key: i, value: current, onChange: onChange },
                current
            );
        })
    );
};
var renderTextArea = function renderTextArea(props) {
    return React__default.createElement('textarea', props);
};
var renderSubmit = function renderSubmit(props, disabled) {
    return React__default.createElement('input', _extends({ type: 'submit', disabled: disabled }, props));
};

function validateAll(validators) {
    var errors = {},
        hasOneOrMoreErrors = false;

    validators.forEach(function (validator) {
        var validation = validator.validateOnSubmit();
        // could be null with no registered form element
        if (validation) {
            var name = validation.name,
                value = validation.value,
                hasError = validation.hasError,
                error = validation.error;

            if (hasError) {
                errors[name] = error;
                hasOneOrMoreErrors = true;
            }
        }
    });
    return {
        hasError: hasOneOrMoreErrors,
        errors: errors
    };
}

function formHasErrors(errors) {
    return Object.keys(errors).length > 0;
}

var Form = function (_Component) {
    inherits(Form, _Component);

    function Form(props) {
        classCallCheck(this, Form);

        var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this._subscribers = [];
        _this._validators = [];

        _this.mode = _this.props.mode;
        _this.model = Object.assign({}, props.model);
        _this.hasError = false;
        _this.errors = {};
        _this.submitted = false;

        _this.onSubmit = _this.onSubmit.bind(_this);
        var rest = omit(props, ['onSubmit', 'mode', 'model']);
        _this.config = Object.assign({}, rest, { onSubmit: _this.onSubmit });
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
            this._validators.push(validator);
        }
    }, {
        key: 'onValidationStateChange',
        value: function onValidationStateChange(_ref) {
            var name = _ref.name,
                hasError = _ref.hasError,
                error = _ref.error;

            if (hasError) {
                this.errors[name] = error;
            } else if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name];
            }

            this.hasError = formHasErrors(this.errors);

            this.raiseFormStateChange({ hasError: this.hasError, errors: this.errors });
        }
    }, {
        key: 'onFormStateChange',
        value: function onFormStateChange(subscriber) {
            this._subscribers.push(subscriber);
        }
    }, {
        key: 'raiseFormStateChange',
        value: function raiseFormStateChange(event) {
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
                errors = _validateAll.errors;

            this.hasError = hasError;
            this.errors = errors;
            this.submitted = true;

            this.props.onSubmit({ hasError: hasError, errors: errors, model: this.model });
            this.raiseFormStateChange({ hasError: hasError, errors: errors });
        }
    }, {
        key: 'render',
        value: function render() {
            return renderForm(this.config, this.props.children);
        }
    }]);
    return Form;
}(React.Component);
Form.propTypes = {
    mode: React.PropTypes.oneOf(['submit', 'touched']),
    model: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
};
Form.defaultProps = {
    mode: 'submit',
    model: {}
};
Form.childContextTypes = {
    form: React.PropTypes.any
};

function canValidateOnChange(validators, submitted, touched) {
    return validators.length > 0 && (touched === true || submitted === true);
}

function canValidateOnBlur(validators, mode, touched) {
    return validators.length > 0 && !touched && mode === 'touched';
}

function validateValue(value, validators, model) {
    for (var i = 0; i < validators.length; i++) {
        var validator = validators[i];
        var result = validator(value, model);
        if (result) {
            return {
                hasError: true,
                error: result.error
            };
        }
    }
    return {
        hasError: false,
        error: ''
    };
}
function validationStateHasChanged(state, newHasError, newError) {
    // current
    var hasError = state.hasError,
        error = state.error;
    // new

    return newHasError !== hasError || newError !== error;
}

function getInitialErrorFormState(error) {
    if (typeof error !== 'undefined') {
        return {
            hasError: true,
            hasSuccess: false,
            error: error
        };
    } else {
        return {
            hasError: false,
            hasSuccess: false,
            error: ''
        };
    }
}

var Validator = function (_Component) {
    inherits(Validator, _Component);

    function Validator(props, context) {
        classCallCheck(this, Validator);

        var _this = possibleConstructorReturn(this, (Validator.__proto__ || Object.getPrototypeOf(Validator)).call(this, props, context));

        _this.state = getInitialErrorFormState(_this.props.errors);
        // register this form group to form for submit event
        if (typeof _this.context.form !== 'undefined') {
            _this.context.form.register(_this);
            _this.form = _this.context.form;
        }
        return _this;
    }

    createClass(Validator, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { validator: this };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.error) {
                var error = nextProps.error,
                    hasError = error && error !== '',
                    hasSuccess = !hasError;

                this.setState({ hasError: hasError, hasSuccess: hasSuccess, error: error });

                if (this.formElement) {
                    // get name and value
                    var name = this.formElement.name;
                    var value = this.formElement.getValue();
                    this.notify({ name: name, value: value, hasError: hasError, hasSuccess: hasSuccess, error: error });
                }
            }
        }
    }, {
        key: 'register',
        value: function register(formElement) {
            if (this.formElement) {
                throw new Error('A form element is already registered');
            }
            this.formElement = formElement;
        }
    }, {
        key: 'onBlur',
        value: function onBlur(name, value) {
            var form = this.form;
            if (this.touched || !form) return;

            var model = form.model;
            if (model.hasOwnProperty(name) && canValidateOnBlur(this.props.validators, form.mode, this.touched)) {
                this.validateOnChange(name, value, model);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(name, value) {
            // validate
            var form = this.form;
            if (!form) return;

            var model = form.model;
            if (model.hasOwnProperty(name) && canValidateOnChange(this.props.validators, form.submitted, this.touched)) {
                this.validateOnChange(name, value, model);
            }
        }
    }, {
        key: 'notify',
        value: function notify(event) {
            if (typeof this.props.onValidationStateChange === 'function') {
                this.props.onValidationStateChange(event);
            }
            if (this.form) {
                this.form.onValidationStateChange(event);
            }
        }
    }, {
        key: 'validateOnChange',
        value: function validateOnChange(name, value, model) {
            // validate value
            var _validateValue = validateValue(value, this.props.validators, model),
                hasError = _validateValue.hasError,
                error = _validateValue.error;

            // check if validation state has changed


            if (validationStateHasChanged(this.state, hasError, error)) {
                // change state
                var hasSuccess = !hasError;
                this.setState({ hasError: hasError, hasSuccess: hasSuccess, error: error });

                if (!this.touched) {
                    this.touched = true;
                }

                // notify validation state change
                this.notify({ name: name, value: value, hasError: hasError, hasSuccess: hasSuccess, error: error });
            }
        }
    }, {
        key: 'validateOnSubmit',
        value: function validateOnSubmit() {
            if (!this.formElement) return;

            // get name and value
            var name = this.formElement.name;
            var value = this.formElement.getValue();

            // validate value
            var model = this.form.model;
            var validators = this.props.validators;

            var _validateValue2 = validateValue(value, validators, model),
                hasError = _validateValue2.hasError,
                error = _validateValue2.error;

            if (!this.touched) {
                this.touched = true;
            }

            // change state
            this.setState({ hasError: hasError, hasSuccess: !hasError, error: error });

            return {
                name: name,
                value: value,
                hasError: hasError,
                error: error
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return renderValidator(this.props.children, this.state);
        }
    }]);
    return Validator;
}(React.Component);
Validator.contextTypes = {
    form: React.PropTypes.instanceOf(Form)
};
Validator.childContextTypes = {
    validator: React.PropTypes.instanceOf(Validator)
};
Validator.propTypes = {
    validators: React.PropTypes.array.isRequired,
    onValidationStateChange: React.PropTypes.func,
    error: React.PropTypes.string
};
Validator.defaultProps = {
    validators: []
};

function _tryUpdateFormModel(form, name, value) {
    if (form) {
        var model = form.model;
        if (model.hasOwnProperty(name)) {
            model[name] = value;
            return true;
        }
    }
    return false;
}

var FormElement = function (_Component) {
    inherits(FormElement, _Component);

    function FormElement(props, context) {
        classCallCheck(this, FormElement);

        // context
        var _this = possibleConstructorReturn(this, (FormElement.__proto__ || Object.getPrototypeOf(FormElement)).call(this, props, context));

        if (typeof context.validator !== 'undefined') {
            context.validator.register(_this);
            _this.validator = context.validator;
        }
        _this.name = _this.props.name;
        _this.form = context.form;
        // bind
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    createClass(FormElement, [{
        key: 'tryUpdateFormModel',
        value: function tryUpdateFormModel(value) {
            _tryUpdateFormModel(this.form, this.name, value);
        }
    }, {
        key: 'notify',
        value: function notify(type, value) {
            var name = this.props.name;
            if (this.validator) {
                this.validator[type](name, value);
            }
            if (this.props[type]) {
                this.props[type](name, value);
            }
        }
    }]);
    return FormElement;
}(React.Component);
FormElement.contextTypes = {
    validator: React.PropTypes.instanceOf(Validator),
    form: React.PropTypes.instanceOf(Form)
};

var Checkbox = function (_FormElement) {
    inherits(Checkbox, _FormElement);

    function Checkbox(props, context) {
        classCallCheck(this, Checkbox);

        var _this = possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props, context));

        _this.state = {
            checked: props.checked
        };
        _this.config = getConfig(props, ['onChange', 'onBlur', 'checked'], _this.onChange, _this.onBlur);
        return _this;
    }

    createClass(Checkbox, [{
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

            this.tryUpdateFormModel(checked);
            this.notify('onChange', checked);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.notify('onBlur', this.state.checked);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = Object.assign({}, this.config, { checked: this.state.checked });
            return renderCheckbox(props);
        }
    }]);
    return Checkbox;
}(FormElement);
Checkbox.propTypes = {
    name: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};

var CheckboxGroup = function (_FormElement) {
    inherits(CheckboxGroup, _FormElement);

    function CheckboxGroup(props, context) {
        classCallCheck(this, CheckboxGroup);

        var _this = possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props, context));

        _this.state = {
            currents: props.currents
        };
        _this.config = getConfig(props, ['onChange', 'onBlur', 'dataSource', 'currents'], _this.onChange, _this.onBlur);
        _this.isInCurrentArray = _this.isInCurrentArray.bind(_this);
        _this.dataSource = _this.props.dataSource;
        return _this;
    }

    createClass(CheckboxGroup, [{
        key: 'getValue',
        value: function getValue() {
            return this.state.currents;
        }
    }, {
        key: 'isInCurrentArray',
        value: function isInCurrentArray(value) {
            return indexOf(this.props.currents, value);
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var value = event.target.value;
            var index = this.isInCurrentArray(value);
            var currents = this.state.currents;
            // update array
            if (index !== -1) {
                currents.splice(index, 1);
            } else {
                currents.push(value);
            }
            this.setState({
                currents: currents
            });
            this.tryUpdateFormModel(currents);
            this.notify('onChange', currents);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.notify('onBlur', this.state.currents);
        }
    }, {
        key: 'render',
        value: function render() {
            return renderCheckboxGroup(this.config, this.dataSource, this.isInCurrentArray, this.onChange, this.onBlur);
        }
    }]);
    return CheckboxGroup;
}(FormElement);
CheckboxGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    dataSource: React.PropTypes.array.isRequired,
    currents: React.PropTypes.array
};
CheckboxGroup.defaultProps = {
    currents: []
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
        error = _ref.error;

    var canShowHasSuccess = hasSuccess && showHasSuccess;
    var groupClassName = getGroupClassName(hasError, canShowHasSuccess, className, hasErrorClassName, hasSuccessClassName, showHasFeedback, hasFeedbackClassName);
    return React__default.createElement(
        'div',
        { className: groupClassName, id: id },
        children,
        showHasFeedback && hasError && React__default.createElement('span', { className: hasErrorFeedbackClassName, 'aria-hidden': 'true' }),
        showHasFeedback && showHasSuccess && hasSuccess && React__default.createElement('span', { className: hasSuccessFeedbackClassName, 'aria-hidden': 'true' }),
        hasError ? React__default.createElement(
            'span',
            { className: 'help-block' },
            error
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

var Input = function (_FormElement) {
    inherits(Input, _FormElement);

    function Input(props, context) {
        classCallCheck(this, Input);

        var _this = possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

        _this.state = {
            value: props.value
        };
        _this.config = getConfig(props, ['onChange', 'onBlur', 'value'], _this.onChange, _this.onBlur);
        return _this;
    }

    createClass(Input, [{
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
            this.tryUpdateFormModel(value);
            this.notify('onChange', value);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.notify('onBlur', this.state.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = Object.assign({}, this.config, { value: this.state.value });
            return renderInput(props);
        }
    }]);
    return Input;
}(FormElement);
Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    type: React.PropTypes.oneOf(['text', 'email', 'password', 'search', 'number', 'range', 'file', 'tel', 'url'])
};
Input.defaultProps = {
    type: 'text',
    value: ''
};

var RadioGroup = function (_FormElement) {
    inherits(RadioGroup, _FormElement);

    function RadioGroup(props, context) {
        classCallCheck(this, RadioGroup);

        var _this = possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props, context));

        _this.state = {
            current: props.current
        };
        _this.config = getConfig(props, ['onChange', 'onBlur', 'dataSource', 'current', 'checked'], _this.onChange, _this.onBlur);
        return _this;
    }

    createClass(RadioGroup, [{
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
            this.tryUpdateFormModel(current);
            this.notify('onChange', current);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.notify('onBlur', this.state.current);
        }
    }, {
        key: 'render',
        value: function render() {
            return renderRadioGroup(this.config, this.props.dataSource, this.state.current, this.onChange, this.onBlur);
        }
    }]);
    return RadioGroup;
}(FormElement);
RadioGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool])
};

var Select = function (_FormElement) {
    inherits(Select, _FormElement);

    function Select(props, context) {
        classCallCheck(this, Select);

        var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

        _this.state = {
            current: props.current
        };
        _this.dataSource = _this.props.dataSource;
        _this.config = getConfig(props, ['onChange', 'onBlur', 'current', 'value', 'dataSource'], _this.onChange, _this.onBlur);
        return _this;
    }

    createClass(Select, [{
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
            this.tryUpdateFormModel(current);
            this.notify('onChange', current);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.notify('onBlur', this.state.current);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = Object.assign({}, this.config, { value: this.state.current });
            return renderSelect(props, this.dataSource, this.onChange);
        }
    }]);
    return Select;
}(FormElement);
Select.propTypes = {
    name: React.PropTypes.string.isRequired,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool])
};

var TextArea = function (_FormElement) {
    inherits(TextArea, _FormElement);

    function TextArea(props, context) {
        classCallCheck(this, TextArea);

        var _this = possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props, context));

        _this.state = {
            value: props.value
        };
        _this.config = getConfig(props, ['onChange', 'onBlur', 'value'], _this.onChange, _this.onBlur);
        return _this;
    }

    createClass(TextArea, [{
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
            this.tryUpdateFormModel(value);
            this.notify('onChange', value);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.notify('onBlur', this.state.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = Object.assign({}, this.config, { value: this.state.value });
            return renderTextArea(props);
        }
    }]);
    return TextArea;
}(FormElement);
TextArea.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
};
TextArea.defaultProps = {
    value: ''
};

var Submit = function (_Component) {
    inherits(Submit, _Component);

    function Submit(props, context) {
        classCallCheck(this, Submit);

        var _this = possibleConstructorReturn(this, (Submit.__proto__ || Object.getPrototypeOf(Submit)).call(this, props, context));

        _this.state = {
            disabled: props.disabled
        };

        if (props.shouldDisable && typeof context.form !== 'undefined') {
            context.form.onFormStateChange(function (_ref) {
                var hasError = _ref.hasError;

                _this.setState({
                    disabled: hasError
                });
            });
        }
        _this.config = omit(props, ['shouldDisable', 'disabled', 'type']);
        return _this;
    }

    createClass(Submit, [{
        key: 'render',
        value: function render() {
            return renderSubmit(this.config, this.state.disabled);
        }
    }]);
    return Submit;
}(React.Component);
Submit.propTypes = {
    shouldDisable: React.PropTypes.bool,
    disabled: React.PropTypes.bool
};
Submit.defaultProps = {
    shouldDisable: true,
    disabled: false
};
Submit.contextTypes = {
    form: React.PropTypes.instanceOf(Form)
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
