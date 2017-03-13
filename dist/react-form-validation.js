(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormValidation"] = factory(require("react"));
	else
		root["ReactFormValidation"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(1);

	Object.defineProperty(exports, 'getElementValue', {
	  enumerable: true,
	  get: function get() {
	    return _util.getElementValue;
	  }
	});
	Object.defineProperty(exports, 'getInitialFormState', {
	  enumerable: true,
	  get: function get() {
	    return _util.getInitialFormState;
	  }
	});
	Object.defineProperty(exports, 'validateValue', {
	  enumerable: true,
	  get: function get() {
	    return _util.validateValue;
	  }
	});

	var _validators = __webpack_require__(2);

	Object.defineProperty(exports, 'RequiredValidator', {
	  enumerable: true,
	  get: function get() {
	    return _validators.RequiredValidator;
	  }
	});
	Object.defineProperty(exports, 'MinLengthValidator', {
	  enumerable: true,
	  get: function get() {
	    return _validators.MinLengthValidator;
	  }
	});
	Object.defineProperty(exports, 'MaxLengthValidator', {
	  enumerable: true,
	  get: function get() {
	    return _validators.MaxLengthValidator;
	  }
	});
	Object.defineProperty(exports, 'PatternValidator', {
	  enumerable: true,
	  get: function get() {
	    return _validators.PatternValidator;
	  }
	});
	Object.defineProperty(exports, 'CustomValidator', {
	  enumerable: true,
	  get: function get() {
	    return _validators.CustomValidator;
	  }
	});
	Object.defineProperty(exports, 'Validator', {
	  enumerable: true,
	  get: function get() {
	    return _validators.Validator;
	  }
	});

	var _Checkbox = __webpack_require__(3);

	Object.defineProperty(exports, 'Checkbox', {
	  enumerable: true,
	  get: function get() {
	    return _Checkbox.Checkbox;
	  }
	});

	var _CheckboxGroup = __webpack_require__(6);

	Object.defineProperty(exports, 'CheckboxGroup', {
	  enumerable: true,
	  get: function get() {
	    return _CheckboxGroup.CheckboxGroup;
	  }
	});

	var _FormComponent = __webpack_require__(7);

	Object.defineProperty(exports, 'Form', {
	  enumerable: true,
	  get: function get() {
	    return _FormComponent.Form;
	  }
	});

	var _FormGroup = __webpack_require__(5);

	Object.defineProperty(exports, 'FormGroup', {
	  enumerable: true,
	  get: function get() {
	    return _FormGroup.FormGroup;
	  }
	});

	var _Input = __webpack_require__(8);

	Object.defineProperty(exports, 'Input', {
	  enumerable: true,
	  get: function get() {
	    return _Input.Input;
	  }
	});

	var _RadioGroup = __webpack_require__(9);

	Object.defineProperty(exports, 'RadioGroup', {
	  enumerable: true,
	  get: function get() {
	    return _RadioGroup.RadioGroup;
	  }
	});

	var _Select = __webpack_require__(10);

	Object.defineProperty(exports, 'Select', {
	  enumerable: true,
	  get: function get() {
	    return _Select.Select;
	  }
	});

	var _TextArea = __webpack_require__(11);

	Object.defineProperty(exports, 'TextArea', {
	  enumerable: true,
	  get: function get() {
	    return _TextArea.TextArea;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isUndefined = isUndefined;
	exports.isDefined = isDefined;
	exports.isString = isString;
	exports.isNumber = isNumber;
	exports.isBoolean = isBoolean;
	exports.isFunction = isFunction;
	exports.getInitialFormState = getInitialFormState;
	exports.getElementValue = getElementValue;
	exports.validateValue = validateValue;
	exports.objLength = objLength;
	exports.firstProp = firstProp;
	exports.getInputInitialValue = getInputInitialValue;
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
	var isArray = exports.isArray = Array.isArray;

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

	function objLength(obj) {
	    return Object.keys(obj).length;
	}

	function firstProp(obj) {
	    return obj[Object.keys(obj)[0]];
	}

	function getInputInitialValue(type, value) {
	    if (isDefined(value)) {
	        return value;
	    } else if (type === 'range' || type === 'number') {
	        return 0;
	    } else {
	        return '';
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Validator = exports.CustomValidator = exports.PatternValidator = exports.MaxLengthValidator = exports.MinLengthValidator = exports.RequiredValidator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.isRequired = isRequired;
	exports.formatMessage = formatMessage;

	var _util = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function isRequired(value) {
	    return value === null || (0, _util.isUndefined)(value) || value === '' || (0, _util.isBoolean)(value) && value === false;
	}

	function formatMessage(message, searchValue, replaceValue) {
	    return message.replace(searchValue, replaceValue);
	}

	var RequiredValidator = exports.RequiredValidator = function () {
	    function RequiredValidator(message) {
	        _classCallCheck(this, RequiredValidator);

	        this.name = 'required';
	        this.message = (0, _util.isString)(message) ? message : 'This field is required.';
	    }

	    _createClass(RequiredValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (isRequired(value)) {
	                this.error = this.message;
	                return false;
	            } else {
	                this.error = undefined;
	                return true;
	            }
	        }
	    }]);

	    return RequiredValidator;
	}();

	var MinLengthValidator = exports.MinLengthValidator = function () {
	    function MinLengthValidator(minLength, message) {
	        _classCallCheck(this, MinLengthValidator);

	        this.name = 'minLength';
	        this.minLength = (0, _util.isNumber)(minLength) ? minLength : 3;
	        this.message = (0, _util.isString)(message) ? message : formatMessage('Please enter at least than {0} characters.', '{0}', minLength);
	    }

	    _createClass(MinLengthValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!isRequired(value) && value.length < this.minLength) {
	                // error
	                this.error = this.message;
	                return false;
	            } else {
	                this.error = undefined;
	                return true;
	            }
	        }
	    }]);

	    return MinLengthValidator;
	}();

	var MaxLengthValidator = exports.MaxLengthValidator = function () {
	    function MaxLengthValidator(maxLength, message) {
	        _classCallCheck(this, MaxLengthValidator);

	        this.name = 'maxLength';
	        this.maxLength = (0, _util.isNumber)(maxLength) ? maxLength : 30;
	        this.message = (0, _util.isString)(message) ? message : formatMessage('Please enter no more than {0} characters.', '{0}', maxLength);
	    }

	    _createClass(MaxLengthValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!isRequired(value) && value.length > this.maxLength) {
	                // error
	                this.error = this.message;
	                return false;
	            } else {
	                this.error = undefined;
	                return true;
	            }
	        }
	    }]);

	    return MaxLengthValidator;
	}();

	var PatternValidator = exports.PatternValidator = function () {
	    function PatternValidator(pattern, message) {
	        _classCallCheck(this, PatternValidator);

	        this.name = (0, _util.isString)(name) ? name : 'pattern';
	        this.pattern = pattern;
	        this.message = (0, _util.isString)(message) ? message : 'Please fix this field.';
	    }

	    _createClass(PatternValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!isRequired(value) && !this.pattern.test(value)) {
	                this.error = this.message;
	                return false;
	            } else {
	                this.error = undefined;
	                return true;
	            }
	        }
	    }]);

	    return PatternValidator;
	}();

	var CustomValidator = exports.CustomValidator = function () {
	    function CustomValidator(fn, message, name) {
	        _classCallCheck(this, CustomValidator);

	        this.fn = fn;
	        this.name = (0, _util.isString)(name) ? name : 'custom';
	        this.message = (0, _util.isString)(message) ? message : 'Please fix this field.';
	    }

	    _createClass(CustomValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!isRequired(value) && !this.fn(value)) {
	                this.error = this.message;
	                return false;
	            } else {
	                this.error = undefined;
	                return true;
	            }
	        }
	    }]);

	    return CustomValidator;
	}();

	var Validator = function () {
	    function Validator() {
	        _classCallCheck(this, Validator);
	    }

	    _createClass(Validator, null, [{
	        key: 'required',
	        value: function required(message) {
	            return new RequiredValidator(message);
	        }
	    }, {
	        key: 'minLength',
	        value: function minLength(_minLength, message) {
	            return new MinLengthValidator(_minLength, message);
	        }
	    }, {
	        key: 'maxLength',
	        value: function maxLength(_maxLength, message) {
	            return new MaxLengthValidator(_maxLength, message);
	        }
	    }, {
	        key: 'pattern',
	        value: function pattern(_pattern, message, name) {
	            return new PatternValidator(_pattern, message, name);
	        }
	    }, {
	        key: 'custom',
	        value: function custom(fn, message, name) {
	            return new CustomValidator(fn, message, name);
	        }
	    }]);

	    return Validator;
	}();

	exports.Validator = Validator;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Checkbox = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FormGroup = __webpack_require__(5);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox = exports.Checkbox = function (_React$Component) {
	    _inherits(Checkbox, _React$Component);

	    function Checkbox(props, context) {
	        _classCallCheck(this, Checkbox);

	        var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props, context));

	        _this.state = {
	            checked: props.checked
	        };

	        _this.onChange = _this.onChange.bind(_this);
	        if ((0, _util.isDefined)(_this.context.formGroup)) {
	            _this.context.formGroup.register(_this.props.name, _this);
	        }
	        return _this;
	    }

	    _createClass(Checkbox, [{
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
	            this.props.onChange(this.props.name, checked);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('input', { type: 'checkbox', id: this.props.id, name: this.props.name, checked: this.state.checked, onChange: this.onChange, className: this.props.className });
	        }
	    }]);

	    return Checkbox;
	}(_react2.default.Component);

	Checkbox.propTypes = {
	    id: _react2.default.PropTypes.string,
	    name: _react2.default.PropTypes.string.isRequired,
	    className: _react2.default.PropTypes.string,
	    onChange: _react2.default.PropTypes.func,
	    checked: _react2.default.PropTypes.bool
	};
	Checkbox.defaultProps = {
	    checked: false
	};
	Checkbox.contextTypes = {
	    formGroup: _react2.default.PropTypes.instanceOf(_FormGroup.FormGroup)
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FormGroup = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FormGroup = exports.FormGroup = function (_React$Component) {
	    _inherits(FormGroup, _React$Component);

	    function FormGroup(props, context) {
	        _classCallCheck(this, FormGroup);

	        var _this = _possibleConstructorReturn(this, (FormGroup.__proto__ || Object.getPrototypeOf(FormGroup)).call(this, props, context));

	        _this.state = {
	            hasError: false,
	            firstError: ''
	        };
	        _this.onChange = _this.onChange.bind(_this);
	        if ((0, _util.isDefined)(_this.context.form)) {
	            _this.context.form.register(_this);
	        }
	        return _this;
	    }

	    _createClass(FormGroup, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	            return { formGroup: this };
	        }
	    }, {
	        key: 'register',
	        value: function register(name, formElement) {
	            this.formElement = formElement;
	        }
	    }, {
	        key: 'validate',
	        value: function validate() {
	            var name = this.formElement.getName();
	            var value = this.formElement.getValue();
	            var validation = (0, _util.validateValue)(value, this.props.validators);
	            var hasError = validation.hasError;
	            var firstError = hasError ? (0, _util.firstProp)(validation.errors) : '';

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
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(event) {
	            if (this.canValidate) {
	                var oldHasError = this.state.hasError;
	                var oldFirstError = this.state.firstError;

	                // validateValue
	                var name = event.target.name;
	                var value = (0, _util.getElementValue)(event.target);
	                var validation = (0, _util.validateValue)(value, this.props.validators);
	                var hasError = validation.hasError;
	                var firstError = hasError ? (0, _util.firstProp)(validation.errors) : '';

	                if (hasError !== oldHasError || firstError !== oldFirstError) {
	                    // change state
	                    this.setState({
	                        value: value,
	                        hasError: hasError,
	                        firstError: firstError
	                    });

	                    // notify
	                    if ((0, _util.isFunction)(this.props.onChange)) {
	                        this.props.onChange(name, value);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var groupClassName = this.state.hasError ? this.props.className + ' has-error' : this.props.className;
	            return _react2.default.createElement(
	                'div',
	                { className: groupClassName, onChange: this.onChange },
	                this.props.children,
	                this.state.hasError ? _react2.default.createElement(
	                    'span',
	                    { className: 'help-block' },
	                    this.state.firstError
	                ) : null
	            );
	        }
	    }, {
	        key: 'canValidate',
	        get: function get() {
	            return this.props.validators.length > 0 && this.context.form.canValidate;
	        }
	    }]);

	    return FormGroup;
	}(_react2.default.Component);

	FormGroup.propTypes = {
	    onChange: _react2.default.PropTypes.func,
	    className: _react2.default.PropTypes.string,
	    validators: _react2.default.PropTypes.array,
	    children: _react2.default.PropTypes.node
	};
	FormGroup.defaultProps = {
	    validators: []
	};
	FormGroup.contextTypes = {
	    form: _react2.default.PropTypes.any
	};
	FormGroup.childContextTypes = {
	    formGroup: _react2.default.PropTypes.any
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CheckboxGroup = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FormGroup = __webpack_require__(5);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CheckboxGroup = exports.CheckboxGroup = function (_React$Component) {
	    _inherits(CheckboxGroup, _React$Component);

	    function CheckboxGroup(props, context) {
	        _classCallCheck(this, CheckboxGroup);

	        var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props, context));

	        _this.state = {
	            currents: props.currents
	        };

	        _this.onChange = _this.onChange.bind(_this);
	        _this.indexOf = _this.indexOf.bind(_this);
	        if ((0, _util.isDefined)(_this.context.formGroup)) {
	            _this.context.formGroup.register(_this.props.name, _this);
	        }
	        return _this;
	    }

	    _createClass(CheckboxGroup, [{
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
	            this.props.onChange(this.props.name, currents);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                null,
	                this.props.dataSource.map(function (current, i) {
	                    return _react2.default.createElement(
	                        'div',
	                        { key: i },
	                        _react2.default.createElement('input', { type: 'checkbox', name: _this2.props.name, checked: _this2.indexOf(current) !== -1, value: current, onChange: _this2.onChange, className: _this2.props.className }),
	                        current
	                    );
	                })
	            );
	        }
	    }]);

	    return CheckboxGroup;
	}(_react2.default.Component);

	CheckboxGroup.propTypes = {
	    name: _react2.default.PropTypes.string.isRequired,
	    className: _react2.default.PropTypes.string,
	    onChange: _react2.default.PropTypes.func,
	    dataSource: _react2.default.PropTypes.array.isRequired,
	    currents: _react2.default.PropTypes.array
	};
	CheckboxGroup.defaultProps = {
	    currents: []
	};
	CheckboxGroup.contextTypes = {
	    formGroup: _react2.default.PropTypes.instanceOf(_FormGroup.FormGroup)
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Form = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Form = exports.Form = function (_React$Component) {
	    _inherits(Form, _React$Component);

	    function Form(props) {
	        _classCallCheck(this, Form);

	        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

	        _this.formGroups = [];
	        _this.submitted = false;
	        _this.onSubmit = _this.onSubmit.bind(_this);
	        return _this;
	    }

	    _createClass(Form, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	            return { form: this };
	        }
	    }, {
	        key: 'register',
	        value: function register(formGroup) {
	            this.formGroups.push(formGroup);
	        }
	    }, {
	        key: 'onSubmit',
	        value: function onSubmit(event) {
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
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'form',
	                { onSubmit: this.onSubmit },
	                this.props.children
	            );
	        }
	    }, {
	        key: 'canValidate',
	        get: function get() {
	            return this.submitted === true;
	        }
	    }]);

	    return Form;
	}(_react2.default.Component);

	Form.propTypes = {
	    onSubmit: _react2.default.PropTypes.func.isRequired,
	    children: _react2.default.PropTypes.node
	};
	Form.childContextTypes = {
	    form: _react2.default.PropTypes.any
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Input = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FormGroup = __webpack_require__(5);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = exports.Input = function (_React$Component) {
	    _inherits(Input, _React$Component);

	    function Input(props, context) {
	        _classCallCheck(this, Input);

	        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

	        var value = (0, _util.getInputInitialValue)(props.type, props.value);
	        _this.state = {
	            value: value
	        };

	        _this.onChange = _this.onChange.bind(_this);
	        if ((0, _util.isDefined)(_this.context.formGroup)) {
	            _this.context.formGroup.register(_this.props.name, _this);
	        }
	        return _this;
	    }

	    _createClass(Input, [{
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
	            this.props.onChange(this.props.name, value);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('input', { type: this.props.type, id: this.props.id, name: this.props.name, value: this.state.value, onChange: this.onChange, className: this.props.className });
	        }
	    }]);

	    return Input;
	}(_react2.default.Component);

	Input.propTypes = {
	    id: _react2.default.PropTypes.string,
	    name: _react2.default.PropTypes.string.isRequired,
	    className: _react2.default.PropTypes.string,
	    onChange: _react2.default.PropTypes.func,
	    type: _react2.default.PropTypes.string,
	    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool])
	};
	Input.defaultProps = {
	    type: 'text'
	};
	Input.contextTypes = {
	    formGroup: _react2.default.PropTypes.instanceOf(_FormGroup.FormGroup)
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RadioGroup = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FormGroup = __webpack_require__(5);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioGroup = exports.RadioGroup = function (_React$Component) {
	    _inherits(RadioGroup, _React$Component);

	    function RadioGroup(props, context) {
	        _classCallCheck(this, RadioGroup);

	        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props, context));

	        _this.state = {
	            current: props.current
	        };

	        _this.onChange = _this.onChange.bind(_this);
	        if ((0, _util.isDefined)(_this.context.formGroup)) {
	            _this.context.formGroup.register(_this.props.name, _this);
	        }
	        return _this;
	    }

	    _createClass(RadioGroup, [{
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
	            this.props.onChange(this.props.name, current);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                null,
	                this.props.dataSource.map(function (current, i) {
	                    return _react2.default.createElement(
	                        'div',
	                        { key: i },
	                        _react2.default.createElement('input', { type: 'radio', name: _this2.props.name, checked: _this2.state.current === current, value: current, onChange: _this2.onChange, className: _this2.props.className }),
	                        current
	                    );
	                })
	            );
	        }
	    }]);

	    return RadioGroup;
	}(_react2.default.Component);

	RadioGroup.propTypes = {
	    name: _react2.default.PropTypes.string.isRequired,
	    className: _react2.default.PropTypes.string,
	    onChange: _react2.default.PropTypes.func,
	    dataSource: _react2.default.PropTypes.array.isRequired,
	    current: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool])
	};
	RadioGroup.contextTypes = {
	    formGroup: _react2.default.PropTypes.instanceOf(_FormGroup.FormGroup)
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Select = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FormGroup = __webpack_require__(5);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = exports.Select = function (_React$Component) {
	    _inherits(Select, _React$Component);

	    function Select(props, context) {
	        _classCallCheck(this, Select);

	        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

	        _this.state = {
	            current: props.current
	        };

	        _this.onChange = _this.onChange.bind(_this);
	        if ((0, _util.isDefined)(_this.context.formGroup)) {
	            _this.context.formGroup.register(_this.props.name, _this);
	        }
	        return _this;
	    }

	    _createClass(Select, [{
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
	            this.props.onChange(this.props.name, current);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'select',
	                { id: this.props.id, name: this.props.name, value: this.state.current, onChange: this.onChange, className: this.props.className },
	                this.props.dataSource.map(function (current, i) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: i, value: current, onChange: _this2.onChange },
	                        current
	                    );
	                })
	            );
	        }
	    }]);

	    return Select;
	}(_react2.default.Component);

	Select.propTypes = {
	    id: _react2.default.PropTypes.string,
	    name: _react2.default.PropTypes.string.isRequired,
	    className: _react2.default.PropTypes.string,
	    onChange: _react2.default.PropTypes.func,
	    dataSource: _react2.default.PropTypes.array.isRequired,
	    current: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool])
	};
	Select.contextTypes = {
	    formGroup: _react2.default.PropTypes.instanceOf(_FormGroup.FormGroup)
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TextArea = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FormGroup = __webpack_require__(5);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextArea = exports.TextArea = function (_React$Component) {
	    _inherits(TextArea, _React$Component);

	    function TextArea(props, context) {
	        _classCallCheck(this, TextArea);

	        var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props, context));

	        _this.state = {
	            value: props.value
	        };

	        _this.onChange = _this.onChange.bind(_this);
	        if ((0, _util.isDefined)(_this.context.formGroup)) {
	            _this.context.formGroup.register(_this.props.name, _this);
	        }
	        return _this;
	    }

	    _createClass(TextArea, [{
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
	            this.props.onChange(this.props.name, value);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('textarea', { id: this.props.id, name: this.props.name, rows: this.props.rows, cols: this.props.cols, value: this.state.value, onChange: this.onChange, className: this.props.className });
	        }
	    }]);

	    return TextArea;
	}(_react2.default.Component);

	TextArea.propTypes = {
	    id: _react2.default.PropTypes.string,
	    name: _react2.default.PropTypes.string.isRequired,
	    className: _react2.default.PropTypes.string,
	    onChange: _react2.default.PropTypes.func,
	    type: _react2.default.PropTypes.string,
	    value: _react2.default.PropTypes.string
	};
	TextArea.defaultProps = {
	    value: ''
	};
	TextArea.contextTypes = {
	    formGroup: _react2.default.PropTypes.instanceOf(_FormGroup.FormGroup)
	};

/***/ }
/******/ ])
});
;