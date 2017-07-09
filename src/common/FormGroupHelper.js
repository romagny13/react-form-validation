export class FormGroupHelper {

    static concatClassName(className, classNameToConcat) {
        return className && className !== '' ? className + ' ' + classNameToConcat : classNameToConcat;
    }

    static getGroupClassName(hasError, hasSuccess, groupClassName, errorClassName, successClassName) {
        if (hasError) {
            return FormGroupHelper.concatClassName(groupClassName, errorClassName);
        }
        else if (hasSuccess) {
            return FormGroupHelper.concatClassName(groupClassName, successClassName);
        }
        return groupClassName;
    }
}
