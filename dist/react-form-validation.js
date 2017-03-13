/*!
 * romagny13-react-form-validation v0.1.5
 * (c) 2017 romagny13
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.ReactFormValidation = global.ReactFormValidation || {}),global.React));
}(this, (function (exports,React) { 'use strict';

React = 'default' in React ? React['default'] : React;

function isUndefined(value) { return typeof value === 'undefined'; }
function isDefined(value) { return typeof value !== 'undefined'; }
function isString(value) { return typeof value === 'string'; }
function isNumber(value) { return typeof value === 'number'; }
function isBoolean(value) { return typeof value === 'boolean'; }
function isFunction(value) { return typeof value === 'function'; }


function getInitialFormState(formConfig) {
    var formState = {};
    for (var name in formConfig) {
        if (formConfig.hasOwnProperty(name)) {
            formState[name] = { hasError: false, errors: {} };
        }
    }
    return formState;
}

function getElementValue(element) {
    var tagName = element.tagName;
    if (tagName === 'INPUT') {
        if (element.type === 'checkbox') {
            return element.value !== 'on' ? element.value : element.checked;
        }
        else {
            return element.value;
        }
    }
    else if (tagName === 'TEXTAREA') {
        return element.value;
    }
    else if (tagName === 'SELECT') {
        return element.options[element.selectedIndex].value;
    }
}

function validateValue(value, validators) {
    var result = {
        hasError: false,
        errors: {}
    };
    validators.forEach(function (validator) {
        if (!validator.validate(value)) {
            result.hasError = true;
            result.errors[validator.name] = validator.error;
        }
    });
    return result;
}



function firstProp(obj) {
    return obj[Object.keys(obj)[0]];
}

function getInputInitialValue(type, value) {
    if (isDefined(value)) {
        return value;
    }
    else if (type === 'range' || type === 'number') {
        return 0;
    }
    else {
        return '';
    }
}

function isRequired(value) {
    return value === null || isUndefined(value) || value === '' || (isBoolean(value) && value === false);
}

function formatMessage(message, searchValue, replaceValue) {
    return message.replace(searchValue, replaceValue);
}

var RequiredValidator = function RequiredValidator(message) {
    this.name = 'required';
    this.message = isString(message) ? message : 'This field is required.';
};

RequiredValidator.prototype.validate = function validate (value) {
    if (isRequired(value)) {
        this.error = this.message;
        return false;
    }
    else {
        this.error = undefined;
        return true;
    }
};

var MinLengthValidator = function MinLengthValidator(minLength, message) {
    this.name = 'minLength';
    this.minLength = isNumber(minLength) ? minLength : 3;
    this.message = isString(message) ? message : formatMessage('Please enter at least than {0} characters.', '{0}', minLength);
};

MinLengthValidator.prototype.validate = function validate (value) {
    if (!isRequired(value) && value.length < this.minLength) {
        // error
        this.error = this.message;
        return false;
    }
    else {
        this.error = undefined;
        return true;
    }
};

var MaxLengthValidator = function MaxLengthValidator(maxLength, message) {
    this.name = 'maxLength';
    this.maxLength = isNumber(maxLength) ? maxLength : 30;
    this.message = isString(message) ? message : formatMessage('Please enter no more than {0} characters.', '{0}', maxLength);
};

MaxLengthValidator.prototype.validate = function validate (value) {
    if (!isRequired(value) && value.length > this.maxLength) {
        // error
        this.error = this.message;
        return false;
    }
    else {
        this.error = undefined;
        return true;
    }
};

var PatternValidator = function PatternValidator(pattern, message) {
    this.name = isString(name) ? name : 'pattern';
    this.pattern = pattern;
    this.message = isString(message) ? message : 'Please fix this field.';
};
PatternValidator.prototype.validate = function validate (value) {
    if (!isRequired(value) && !this.pattern.test(value)) {
        this.error = this.message;
        return false;
    }
    else {
        this.error = undefined;
        return true;
    }
};

var CustomValidator = function CustomValidator(fn, message, name) {
    this.fn = fn;
    this.name = isString(name) ? name : 'custom';
    this.message = isString(message) ? message : 'Please fix this field.';
};
CustomValidator.prototype.validate = function validate (value) {
    if (!isRequired(value) && !this.fn(value)) {
        this.error = this.message;
        return false;
    }
    else {
        this.error = undefined;
        return true;
    }
};

var Validator = function Validator () {};

Validator.required = function required (message) {
    return new RequiredValidator(message);
};
Validator.minLength = function minLength (minLength$1, message) {
    return new MinLengthValidator(minLength$1, message);
};
Validator.maxLength = function maxLength (maxLength$1, message) {
    return new MaxLengthValidator(maxLength$1, message);
};
Validator.pattern = function pattern (pattern$1, message, name) {
    return new PatternValidator(pattern$1, message, name);
};
Validator.custom = function custom (fn, message, name) {
    return new CustomValidator(fn, message, name);
};

var FormGroup = (function (superclass) {
    function FormGroup(props, context) {
        superclass.call(this, props, context);
        this.state = {
            hasError: false,
            firstError: ''
        };
        this.onChange = this.onChange.bind(this);
       if (isDefined(this.context.form)) { this.context.form.register(this); }
    }

    if ( superclass ) FormGroup.__proto__ = superclass;
    FormGroup.prototype = Object.create( superclass && superclass.prototype );
    FormGroup.prototype.constructor = FormGroup;

    var prototypeAccessors = { canValidate: {} };

    FormGroup.prototype.getChildContext = function getChildContext () {
        return { formGroup: this };
    };

    FormGroup.prototype.register = function register (name, formElement) {
        this.formElement = formElement;
    };

    prototypeAccessors.canValidate.get = function () {
        return this.props.validators.length > 0 && this.context.form.canValidate;
    };

    FormGroup.prototype.validate = function validate () {
        var name = this.formElement.getName();
        var value = this.formElement.getValue();
        var validation = validateValue(value, this.props.validators);
        var hasError = validation.hasError;
        var firstError = hasError ? firstProp(validation.errors) : '';

        // change state
        this.setState({
            hasError: hasError,
            firstError: firstError
        });

        return {
            name: name,
            hasError: hasError,
            firstError: firstError
        };
    };

    FormGroup.prototype.onChange = function onChange (event) {
        if (this.canValidate) {
            var oldHasError = this.state.hasError;
            var oldFirstError = this.state.firstError;

            // validateValue
            var name = event.target.name;
            var value = getElementValue(event.target);
            var validation = validateValue(value, this.props.validators);
            var hasError = validation.hasError;
            var firstError = hasError ? firstProp(validation.errors) : '';

            if (hasError !== oldHasError || firstError !== oldFirstError) {
                // change state
                this.setState({
                    value: value,
                    hasError: hasError,
                    firstError: firstError
                });

                // notify
                if (isFunction(this.props.onChange)) { this.props.onChange(name, value); }
            }
        }
    };

    FormGroup.prototype.render = function render () {
        var groupClassName = this.state.hasError ? this.props.className + ' has-error' : this.props.className;
        return (
            React.createElement( 'div', { className: groupClassName, onChange: this.onChange }, 
                this.props.children, 
                this.state.hasError ?
                    React.createElement( 'span', { className: "help-block" }, this.state.firstError)
                : null
            )
        );
    };

    Object.defineProperties( FormGroup.prototype, prototypeAccessors );

    return FormGroup;
}(React.Component));
FormGroup.propTypes = {
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
    validators: React.PropTypes.array,
    children: React.PropTypes.node
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

var Checkbox = (function (superclass) {
    function Checkbox(props, context) {
        superclass.call(this, props, context);
        this.state = {
            checked: props.checked
        };

        this.onChange = this.onChange.bind(this);
       if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }

    if ( superclass ) Checkbox.__proto__ = superclass;
    Checkbox.prototype = Object.create( superclass && superclass.prototype );
    Checkbox.prototype.constructor = Checkbox;
    Checkbox.prototype.getName = function getName () {
        return this.props.name;
    };
    Checkbox.prototype.getValue = function getValue () {
        return this.state.checked;
    };
    Checkbox.prototype.onChange = function onChange (event) {
        var checked = event.target.checked;
        this.setState({
            checked: checked
        });
        // notify
        this.props.onChange(this.props.name, checked);
    };
    Checkbox.prototype.render = function render () {
        return (
            React.createElement( 'input', { type: "checkbox", id: this.props.id, name: this.props.name, checked: this.state.checked, onChange: this.onChange, className: this.props.className })
        );
    };

    return Checkbox;
}(React.Component));
Checkbox.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    checked: React.PropTypes.bool
};
Checkbox.defaultProps = {
    checked: false
};
Checkbox.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var CheckboxGroup = (function (superclass) {
    function CheckboxGroup(props, context) {
        superclass.call(this, props, context);
        this.state = {
            currents: props.currents
        };

        this.onChange = this.onChange.bind(this);
        this.indexOf = this.indexOf.bind(this);
      if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }

    if ( superclass ) CheckboxGroup.__proto__ = superclass;
    CheckboxGroup.prototype = Object.create( superclass && superclass.prototype );
    CheckboxGroup.prototype.constructor = CheckboxGroup;
    CheckboxGroup.prototype.getName = function getName (){
        return this.props.name;
    };
    CheckboxGroup.prototype.getValue = function getValue (){
        return this.state.currents;
    };
    CheckboxGroup.prototype.indexOf = function indexOf (value) {
        var currents = this.props.currents;
        for (var i = 0; i < currents.length; i++) {
            if (currents[i] === value) {
                return i;
            }
        }
        return -1;
    };
    CheckboxGroup.prototype.onChange = function onChange (event) {
        var value = event.target.value;
        var index = this.indexOf(value);
        var currents = this.state.currents;
        if (index !== -1) {
            currents.splice(index, 1);
        }
        else {
            currents.push(value);
        }

        this.setState({
            currents: currents
        });
        // notify
        this.props.onChange(this.props.name, currents);
    };
    CheckboxGroup.prototype.render = function render () {
        var this$1 = this;

        return (
            React.createElement( 'div', null, 
                this.props.dataSource.map(function (current, i) {
                    return (React.createElement( 'div', { key: i }, 
                        React.createElement( 'input', { type: "checkbox", name: this$1.props.name, checked: this$1.indexOf(current) !== -1, value: current, onChange: this$1.onChange, className: this$1.props.className }), 
                        current
                    ));
                })
            )
        );
    };

    return CheckboxGroup;
}(React.Component));
CheckboxGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    currents: React.PropTypes.array
};
CheckboxGroup.defaultProps = {
    currents:[]
};
CheckboxGroup.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var Form = (function (superclass) {
    function Form(props) {
        superclass.call(this, props);

        this.formGroups = [];
        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    if ( superclass ) Form.__proto__ = superclass;
    Form.prototype = Object.create( superclass && superclass.prototype );
    Form.prototype.constructor = Form;

    var prototypeAccessors = { canValidate: {} };

    Form.prototype.getChildContext = function getChildContext () {
        return { form: this };
    };

    prototypeAccessors.canValidate.get = function () {
        return this.submitted === true;
    };

    Form.prototype.register = function register (formGroup) {
        this.formGroups.push(formGroup);
    };

    Form.prototype.onSubmit = function onSubmit (event) {
        event.preventDefault();

        var formStates = {};
        var hasError = false;

        this.formGroups.forEach(function (formGroup) {
            var validation = formGroup.validate();
            if (validation) {
                var name = validation.name;
                formStates[name] = {};
                formStates[name].hasError = validation.hasError;
                formStates[name].firstError = validation.firstError;
                if (validation.hasError) {
                    hasError = true;
                }
            }
        });

        this.submitted = true;
        this.props.onSubmit(hasError, formStates);
    };

    Form.prototype.render = function render () {
        return (
            React.createElement( 'form', { id: this.props.id, onSubmit: this.onSubmit, autoComplete: this.autoComplete }, 
                this.props.children
            )
        );
    };

    Object.defineProperties( Form.prototype, prototypeAccessors );

    return Form;
}(React.Component));
Form.propTypes = {
    id: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
    autoComplete: React.PropTypes.string
};
Form.childContextTypes = {
    form: React.PropTypes.any
};

var Input = (function (superclass) {
    function Input(props, context) {
        superclass.call(this, props, context);
        var value = getInputInitialValue(props.type, props.value);
        this.state = {
            value: value
        };

        this.onChange = this.onChange.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }

    if ( superclass ) Input.__proto__ = superclass;
    Input.prototype = Object.create( superclass && superclass.prototype );
    Input.prototype.constructor = Input;
    Input.prototype.getName = function getName () {
        return this.props.name;
    };
    Input.prototype.getValue = function getValue () {
        return this.state.value;
    };
    Input.prototype.onChange = function onChange (event) {
        var value = event.target.value;
        this.setState({
            value: value
        });
        this.props.onChange(this.props.name, value);
    };
    Input.prototype.render = function render () {
        return (
            React.createElement( 'input', { type: this.props.type, id: this.props.id, name: this.props.name, value: this.state.value, onChange: this.onChange, className: this.props.className, placeholder: this.props.placeholder })
        );
    };

    return Input;
}(React.Component));
Input.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
    placeholder: React.PropTypes.string
};
Input.defaultProps = {
    type: 'text'
};
Input.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var RadioGroup = (function (superclass) {
    function RadioGroup(props, context) {
        superclass.call(this, props, context);
        this.state = {
            current: props.current
        };

        this.onChange = this.onChange.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }

    if ( superclass ) RadioGroup.__proto__ = superclass;
    RadioGroup.prototype = Object.create( superclass && superclass.prototype );
    RadioGroup.prototype.constructor = RadioGroup;
    RadioGroup.prototype.getName = function getName () {
        return this.props.name;
    };
    RadioGroup.prototype.getValue = function getValue () {
        return this.state.current;
    };
    RadioGroup.prototype.onChange = function onChange (event) {
        var current = event.target.value;
        this.setState({
            current: current
        });
        // notify
        this.props.onChange(this.props.name, current);
    };
    RadioGroup.prototype.render = function render () {
        var this$1 = this;

        return (
            React.createElement( 'div', null, 
                this.props.dataSource.map(function (current, i) {
                    return (React.createElement( 'div', { key: i }, 
                        React.createElement( 'input', { type: "radio", name: this$1.props.name, checked: this$1.state.current === current, value: current, onChange: this$1.onChange, className: this$1.props.className }), 
                        current
                    ));
                })
            )
        );
    };

    return RadioGroup;
}(React.Component));
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

var Select = (function (superclass) {
    function Select(props, context) {
        superclass.call(this, props, context);
        this.state = {
            current: props.current
        };

        this.onChange = this.onChange.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }

    if ( superclass ) Select.__proto__ = superclass;
    Select.prototype = Object.create( superclass && superclass.prototype );
    Select.prototype.constructor = Select;
    Select.prototype.getName = function getName () {
        return this.props.name;
    };
    Select.prototype.getValue = function getValue () {
        return this.state.current;
    };
    Select.prototype.onChange = function onChange (event) {
        var current = event.target.options[event.target.selectedIndex].value;
        this.setState({
            current: current
        });
        // notify
        this.props.onChange(this.props.name, current);
    };
    Select.prototype.render = function render () {
        var this$1 = this;

        return (
            React.createElement( 'select', { id: this.props.id, name: this.props.name, value: this.state.current, onChange: this.onChange, className: this.props.className }, 
                this.props.dataSource.map(function (current, i) {
                    return (
                        React.createElement( 'option', { key: i, value: current, onChange: this$1.onChange }, current)
                    );
                })
            )
        );
    };

    return Select;
}(React.Component));
Select.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dataSource: React.PropTypes.array.isRequired,
    current: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool])
};
Select.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

var TextArea = (function (superclass) {
    function TextArea(props, context) {
        superclass.call(this, props, context);
        this.state = {
            value: props.value
        };

        this.onChange = this.onChange.bind(this);
        if (isDefined(this.context.formGroup)) { this.context.formGroup.register(this.props.name, this); }
    }

    if ( superclass ) TextArea.__proto__ = superclass;
    TextArea.prototype = Object.create( superclass && superclass.prototype );
    TextArea.prototype.constructor = TextArea;
    TextArea.prototype.getName = function getName () {
        return this.props.name;
    };
    TextArea.prototype.getValue = function getValue () {
        return this.state.value;
    };
    TextArea.prototype.onChange = function onChange (event) {
        var value = event.target.value;
        this.setState({
            value: value
        });
        this.props.onChange(this.props.name, value);
    };
    TextArea.prototype.render = function render () {
        return (
            React.createElement( 'textarea', { id: this.props.id, name: this.props.name, rows: this.props.rows, cols: this.props.cols, value: this.state.value, onChange: this.onChange, className: this.props.className, placeholder: this.props.placeholder })
        );
    };

    return TextArea;
}(React.Component));
TextArea.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string
};
TextArea.defaultProps = {
    value: ''
};
TextArea.contextTypes = {
    formGroup: React.PropTypes.instanceOf(FormGroup)
};

exports.getElementValue = getElementValue;
exports.getInitialFormState = getInitialFormState;
exports.validateValue = validateValue;
exports.RequiredValidator = RequiredValidator;
exports.MinLengthValidator = MinLengthValidator;
exports.MaxLengthValidator = MaxLengthValidator;
exports.PatternValidator = PatternValidator;
exports.CustomValidator = CustomValidator;
exports.Validator = Validator;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.Form = Form;
exports.FormGroup = FormGroup;
exports.Input = Input;
exports.RadioGroup = RadioGroup;
exports.Select = Select;
exports.TextArea = TextArea;

Object.defineProperty(exports, '__esModule', { value: true });

})));
