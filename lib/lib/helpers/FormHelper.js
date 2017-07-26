'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Allows resolving element value.
 */
var FormHelper = exports.FormHelper = function () {
    function FormHelper() {
        _classCallCheck(this, FormHelper);
    }

    _createClass(FormHelper, null, [{
        key: 'isInput',


        /**
         * Checks if the element is an "input".
         * @param {Object} element 
         * @return {boolean} 
         */
        value: function isInput(element) {
            return element.tagName === 'INPUT';
        }

        /**
         * Checks if the element is a "textarea".
         * @param {Object} element 
         * @return {boolean} 
         */

    }, {
        key: 'isTextarea',
        value: function isTextarea(element) {
            return element.tagName === 'TEXTAREA';
        }

        /**
         * Checks if the element is a "select" element.
         * @param {Object} element 
         * @return {boolean} 
         */

    }, {
        key: 'isSelect',
        value: function isSelect(element) {
            return element.tagName === 'SELECT';
        }

        /**
            * Checks if the element is an input with the type "checkbox".
            * @param {Object} element 
            * @return {boolean} 
            */

    }, {
        key: 'isCheckbox',
        value: function isCheckbox(element) {
            return element.type && element.type === 'checkbox';
        }

        /**
            * Checks if the element is an input with the type "radio".
            * @param {Object} element 
            * @return {boolean} 
            */

    }, {
        key: 'isRadio',
        value: function isRadio(element) {
            return element.type && element.type === 'radio';
        }

        /**
            * Checks if the element is an input with the type "number" or "range".
            * @param {Object} element 
            * @return {boolean} 
            */

    }, {
        key: 'isNumberElement',
        value: function isNumberElement(element) {
            return element.type && (element.type === 'number' || element.type === 'range');
        }

        /**
         * Returns cheched or the checbox value.
         * @param {Object} checkbox
         * @return {string|boolean} 
         */

    }, {
        key: 'getCheckboxValue',
        value: function getCheckboxValue(checkbox) {
            return checkbox.value && checkbox.value !== 'on' ? checkbox.value : checkbox.checked;
        }

        /**
         * Returns the input value.
         * @param {Object} element
         * @return {string} 
         */

    }, {
        key: 'getInputValue',
        value: function getInputValue(element) {
            if (FormHelper.isCheckbox(element)) {
                return FormHelper.getCheckboxValue(element);
            } else {
                return element.value;
            }
        }

        /**
         * Returns the selected value or selected values (multiple).
         * @param {Object} select
         * @return {string|Array} 
         */

    }, {
        key: 'getSelectValue',
        value: function getSelectValue(select) {
            if (select.multiple) {
                var values = [];
                var options = select.options;
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    if (option.selected) {
                        values.push(option.value);
                    }
                }
                return values;
            } else {
                return select.options[select.selectedIndex].value;
            }
        }

        /**
         * Check the element type (input, checbox, select, textarea) and returns the value.
         * @param {Object} element
         * @return {Object|Array|string|boolean} 
         */

    }, {
        key: 'getElementValue',
        value: function getElementValue(element) {
            if (FormHelper.isInput(element)) {
                return FormHelper.getInputValue(element);
            } else if (FormHelper.isTextarea(element)) {
                return element.value;
            } else if (FormHelper.isSelect(element)) {
                return FormHelper.getSelectValue(element);
            }
        }
    }]);

    return FormHelper;
}();