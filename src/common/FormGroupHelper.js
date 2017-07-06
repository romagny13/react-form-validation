export class FormGroupHelper {

    static concatClassName(className, classNameToConcat) {
        return className && className !== '' ? className + ' ' + classNameToConcat : classNameToConcat;
    }

    static getGroupClassName(hasFeedback, hasError, hasSuccess, groupClassName, feedbackClassName, errorClassName, successClassName) {
        if (hasError) {
            let result = FormGroupHelper.concatClassName(groupClassName, errorClassName);
            return hasFeedback ? result + ' ' + feedbackClassName : result;
        }
        else if (hasSuccess) {
            let result = FormGroupHelper.concatClassName(groupClassName, successClassName);
            return hasFeedback ? result + ' ' + feedbackClassName : result;
        }
        return groupClassName;
    }
}
