export class FormHelper {
    static getElementValue(element) {
        let tagName = element.tagName;
        if (tagName === 'INPUT') {
            if (element.type === 'checkbox') {
                // checkbox group => value, single checkbox => checked
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