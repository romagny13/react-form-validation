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

	Object.defineProperty(exports, 'formHasError', {
	  enumerable: true,
	  get: function get() {
	    return _util.formHasError;
	  }
	});
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

	var _form = __webpack_require__(3);

	Object.defineProperty(exports, 'FormComponent', {
	  enumerable: true,
	  get: function get() {
	    return _form.FormComponent;
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
	exports.getInitialFormState = getInitialFormState;
	exports.getElementValue = getElementValue;
	exports.formHasError = formHasError;
	exports.omit = omit;
	exports.validateValue = validateValue;
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

	function formHasError(controls) {
	    for (var name in controls) {
	        if (controls.hasOwnProperty(name)) {
	            var control = controls[name];
	            if (control.hasError) {
	                return true;
	            }
	        }
	    }
	    return false;
	}

	function omit(obj, omitKeys) {
	    var result = {};
	    for (var name in obj) {
	        if (omitKeys.indexOf(name) == -1) {
	            result[name] = obj[name];
	        }
	    }
	    return result;
	}

	function validateValue(value, validators) {
	    var result = {
	        hasError: false,
	        errors: {}
	    };
	    validators.forEach(function (validator) {
	        if (!validator.validate(value)) {
	            result.hasError = true;
	            result.errors[validator.name] = validator.name;
	        }
	    });
	    return result;
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

	var _util = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RequiredValidator = exports.RequiredValidator = function () {
	    function RequiredValidator() {
	        _classCallCheck(this, RequiredValidator);

	        this.name = 'required';
	    }

	    _createClass(RequiredValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (value === null || (0, _util.isUndefined)(value) || value === '' || (0, _util.isBoolean)(value) && value === false) {
	                return false;
	            } else {
	                return true;
	            }
	        }
	    }]);

	    return RequiredValidator;
	}();

	var MinLengthValidator = exports.MinLengthValidator = function () {
	    function MinLengthValidator(minLength) {
	        _classCallCheck(this, MinLengthValidator);

	        this.name = 'minLength';
	        this.minLength = (0, _util.isNumber)(minLength) ? minLength : 3;
	    }

	    _createClass(MinLengthValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (value && value.length < this.minLength) {
	                return false;
	            } else {
	                return true;
	            }
	        }
	    }]);

	    return MinLengthValidator;
	}();

	var MaxLengthValidator = exports.MaxLengthValidator = function () {
	    function MaxLengthValidator(maxLength) {
	        _classCallCheck(this, MaxLengthValidator);

	        this.name = 'maxLength';
	        this.maxLength = (0, _util.isNumber)(maxLength) ? maxLength : 30;
	    }

	    _createClass(MaxLengthValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (value && value.length > this.maxLength) {
	                return false;
	            } else {
	                return true;
	            }
	        }
	    }]);

	    return MaxLengthValidator;
	}();

	var PatternValidator = exports.PatternValidator = function () {
	    function PatternValidator(pattern) {
	        _classCallCheck(this, PatternValidator);

	        this.name = 'pattern';
	        this.pattern = pattern;
	    }

	    _createClass(PatternValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if ((0, _util.isDefined)(value) && !this.pattern.test(value)) {
	                return false;
	            } else {
	                return true;
	            }
	        }
	    }]);

	    return PatternValidator;
	}();

	var CustomValidator = exports.CustomValidator = function () {
	    function CustomValidator(fn, name) {
	        _classCallCheck(this, CustomValidator);

	        this.name = name ? name : 'custom';
	        this.fn = fn;
	    }

	    _createClass(CustomValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!this.fn(value)) {
	                return false;
	            } else {
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
	        value: function required() {
	            return new RequiredValidator();
	        }
	    }, {
	        key: 'minLength',
	        value: function minLength(_minLength) {
	            return new MinLengthValidator(_minLength);
	        }
	    }, {
	        key: 'maxLength',
	        value: function maxLength(_maxLength) {
	            return new MaxLengthValidator(_maxLength);
	        }
	    }, {
	        key: 'pattern',
	        value: function pattern(_pattern) {
	            return new PatternValidator(_pattern);
	        }
	    }, {
	        key: 'custom',
	        value: function custom(fn, name) {
	            return new CustomValidator(fn, name);
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
	exports.FormComponent = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _validators = __webpack_require__(2);

	var _util = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FormComponent = exports.FormComponent = function (_React$Component) {
	    _inherits(FormComponent, _React$Component);

	    function FormComponent(props) {
	        _classCallCheck(this, FormComponent);

	        var _this = _possibleConstructorReturn(this, (FormComponent.__proto__ || Object.getPrototypeOf(FormComponent)).call(this, props));

	        _this.propsToAdd = (0, _util.omit)(_this.props, ['formConfig', 'onStateChange', 'onSubmit', 'children']);

	        _this.state = {
	            formConfig: props.formConfig,
	            formStates: (0, _util.getInitialFormState)(props.formConfig),
	            hasError: false,
	            submitted: false
	        };

	        _this.onSubmit = _this.onSubmit.bind(_this);
	        _this.onChange = _this.onChange.bind(_this);
	        return _this;
	    }

	    _createClass(FormComponent, [{
	        key: 'validate',
	        value: function validate(name, value) {
	            var formElementConfig = this.state.formConfig[name];
	            if (formElementConfig) {
	                return (0, _util.validateValue)(value, formElementConfig);
	            }
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(event) {
	            if (this.canValidate) {
	                var name = event.target.name;
	                var value = (0, _util.getElementValue)(event.target);
	                var formStates = this.state.formStates;
	                if (formStates[name]) {

	                    var oldHasError = formStates[name].hasError;
	                    var oldFirstError = formStates[name].errors[Object.keys(formStates[name].errors)[0]];
	                    var validation = this.validate(name, value);
	                    if (validation) {
	                        formStates[name].hasError = validation.hasError;
	                        formStates[name].errors = validation.errors;
	                    }

	                    // check form has error
	                    var hasError = (0, _util.formHasError)(formStates);

	                    // set state
	                    this.setState({
	                        formStates: formStates,
	                        hasError: hasError
	                    });

	                    // notify only if state !== previous state
	                    if (validation.hasError !== oldHasError || validation.errors[0] !== oldFirstError) {
	                        this.props.onStateChange(hasError, formStates);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'onSubmit',
	        value: function onSubmit(event) {
	            event.preventDefault();
	            var form = event.target;
	            var hasError = false;
	            var formStates = this.state.formStates;
	            for (var i = 0; i < form.elements.length; i++) {
	                var element = form.elements[i];
	                if (element.type !== 'submit') {
	                    var name = element.name;
	                    var value = (0, _util.getElementValue)(element);
	                    var validation = this.validate(name, value);
	                    if (validation) {
	                        formStates[name].hasError = validation.hasError;
	                        formStates[name].errors = validation.errors;
	                    }

	                    if (validation && validation.hasError) {
	                        hasError = true;
	                    }
	                }
	            }
	            this.setState({
	                formStates: formStates,
	                hasError: hasError,
	                submitted: true
	            });

	            this.props.onSubmit(hasError, formStates);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'form',
	                _extends({ onSubmit: this.onSubmit, onChange: this.onChange }, this.propsToAdd),
	                this.props.children
	            );
	        }
	    }, {
	        key: 'canValidate',
	        get: function get() {
	            return this.state.submitted;
	        }
	    }]);

	    return FormComponent;
	}(_react2.default.Component);

	FormComponent.propTypes = {
	    children: _react.PropTypes.array.isRequired,
	    formConfig: _react.PropTypes.object.isRequired,
	    onStateChange: _react.PropTypes.func.isRequired,
	    onSubmit: _react.PropTypes.func.isRequired
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;