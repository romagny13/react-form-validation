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
    static isNumberElement(element) {
        return element.type && (element.type === 'number' || element.type === 'range');
    }

    /**
     * Returns cheched or the checbox value.
     * @param {Object} checkbox
     * @return {string|boolean} 
     */
    static getCheckboxValue(checkbox) {
        return checkbox.value && checkbox.value !== 'on' ? checkbox.value : checkbox.checked;
    }

    /**
     * Returns the input value.
     * @param {Object} element
     * @return {string} 
     */
    static getInputValue(element) {
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
    static getSelectValue(select) {
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
            return FormHelper.getInputValue(element);
        } else if (FormHelper.isTextarea(element)) {
            return element.value;
        } else if (FormHelper.isSelect(element)) {
            return FormHelper.getSelectValue(element);
        }
    }
}