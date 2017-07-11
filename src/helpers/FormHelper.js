/**
 * Allows resolving element value.
 */
export class FormHelper {

    /**
     * Checks if the element is an "input".
     * @param {Object} element 
     * @return {boolean} 
     */
    static isInput(element) {
        return element.tagName === 'INPUT';
    }

    /**
     * Checks if the element is a "textarea".
     * @param {Object} element 
     * @return {boolean} 
     */
    static isTextarea(element) {
        return element.tagName === 'TEXTAREA';
    }

    /**
     * Checks if the element is a "select" element.
     * @param {Object} element 
     * @return {boolean} 
     */
    static isSelect(element) {
        return element.tagName === 'SELECT';
    }

    /**
        * Checks if the element is an input with the type "checkbox".
        * @param {Object} element 
        * @return {boolean} 
        */
    static isCheckbox(element) {
        return element.type && element.type === 'checkbox';
    }

    /**
        * Checks if the element is an input with the type "radio".
        * @param {Object} element 
        * @return {boolean} 
        */
    static isRadio(element) {
        return element.type && element.type === 'radio';
    }

    /**
        * Checks if the element is an input with the type "number" or "range".
        * @param {Object} element 
        * @return {boolean} 
        */
    isNumberElement(element) {
        return element.type && (element.type === 'number' || element.type === 'range');
    }

    /**
     * Returns cheched or the checbox value.
     * @param {Object} checkbox
     * @return {string|boolean} 
     */
    static GetCheckboxValue(checkbox) {
        return checkbox.value !== 'on' ? checkbox.value : checkbox.checked;
    }

    /**
     * Returns the input value.
     * @param {Object} element
     * @return {string} 
     */
    static GetInputValue(element) {
        if (FormHelper.isCheckbox(element)) {
            return FormHelper.GetCheckboxValue(element);
        } else {
            return element.value;
        }
    }

    /**
     * Returns the selected value or selected values the select is multiple.
     * @param {Object} select
     * @return {string|Array} 
     */
    static GetSelectValue(select) {
        if (select.multiple) {
            let values = [];
            let options = select.options;
            for (let i = 0; i < options.length; i++) {
                let option = options[i];
                if (option.selected) {
                    values.push(option.value);
                }
            }
            return values;
        }
        else {
            return select.options[select.selectedIndex].value;
        }
    }

    /**
     * Check the element type (input, checbox, select, textarea) and returns the value.
     * @param {Object} element
     * @return {Object|Array|string|boolean} 
     */
    static getElementValue(element) {
        if (FormHelper.isInput(element)) {
            return FormHelper.GetInputValue(element);
        } else if (FormHelper.isTextarea(element)) {
            return element.value;
        } else if (FormHelper.isSelect(element)) {
            return FormHelper.GetSelectValue(element);
        }
    }

    static hasClassName(className, classNameToCheck) {
        return className.indexOf(classNameToCheck) != -1;
    }

    static addClassName(className, classNameToAdd) {
        return className + ' ' + classNameToAdd;
    }

    static removeClassName(className, classNameToRemove) {
        return className.replace(classNameToRemove, '');
    }
}