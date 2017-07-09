export class FormHelper {

    static isInput(element) {
        return element.tagName === 'INPUT';
    }

    static isTextarea(element) {
        return element.tagName === 'TEXTAREA';
    }

    static isSelect(element) {
        return element.tagName === 'SELECT';
    }

    static isCheckbox(element) {
        return element.type && element.type === 'checkbox';
    }

    static isRadio(element) {
        return element.type && element.type === 'radio';
    }

    isNumberElement(element) {
        return element.type && (element.type === 'number' || element.type === 'range');
    }

    static GetCheckboxValue(checkbox) {
        return checkbox.value !== 'on' ? checkbox.value : checkbox.checked;
    }

    static GetInputValue(element) {
        if (FormHelper.isCheckbox(element)) {
            return FormHelper.GetCheckboxValue(element);
        } else {
            return element.value;
        }
    }

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