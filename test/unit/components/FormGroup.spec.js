import { assert } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { required } from '../../../src/common/validators';
import { Input } from '../../../src/components/Input';
import {
    FormGroup,
    canValidateOnChange,
    canValidateOnBlur,
    validationStateHasChanged,
    getFirstError,
    getElementValue
} from '../../../src/components/FormGroup';


const renderField = ({ hasError, firstError }) => {
    let groupClassName = hasError ? 'form-group has-error' : 'form-group';
    return (
        <div id="group" className={groupClassName}>
            <Input id="firstname" name="firstname" value="" />
            {hasError && <span className="help-block">{firstError}</span>}
        </div>
    );
};

describe('FormGroup', () => {

    let validators = [required()];

    it('Should validate', () => {

        const formGroup = mount(<FormGroup validators={validators} render={renderField} />);

        formGroup.instance().validateOnSubmit();

        let div = formGroup.find('#group');
        let span = formGroup.find('span');
        assert.equal(div.hasClass('has-error'), true);
        assert.equal(span.text(), 'This field is required.');
    });

    it('Should cannot validate on change with no validators', () => {
        assert.isFalse(canValidateOnChange([], { mode: 'submit', submitted: false }));
        assert.isFalse(canValidateOnChange([], { mode: 'submit', submitted: true }));
        assert.isFalse(canValidateOnChange([], { mode: 'touched', submitted: true }, true));
    });

    it('Should cannot validate on blur with no validators', () => {
        assert.isFalse(canValidateOnBlur([], { mode: 'touched', submitted: false }, false));
    });

    it('Should cannot validate with mode submit and form not submitted', () => {
        assert.isFalse(canValidateOnChange(validators, { mode: 'submit', submitted: false }));
    });

    it('Should can validate with mode submit and form submitted', () => {
        assert.isTrue(canValidateOnChange(validators, { mode: 'submit', submitted: true }));
    });

    it('Should cannot validate on blur with mode touched if touched', () => {
        assert.isFalse(canValidateOnBlur(validators, { mode: 'touched', submitted: false }, true));
    });

    it('Should can validate on blur with mode touched if not already touched (first time)', () => {
        assert.isTrue(canValidateOnBlur(validators, { mode: 'touched', submitted: false }, false));
    });

    it('Should cannot validate on blur with mode touched if submitted', () => {
        assert.isFalse(canValidateOnBlur(validators, { mode: 'touched', submitted: true }, true));
    });

    it('Should can validate on change with mode touched if touched', () => {
        assert.isTrue(canValidateOnChange(validators, { mode: 'touched', submitted: true }, true));
    });

    it('Should detect if validation state has changed with old no error and new error', () => {
        let result = validationStateHasChanged({
            hasError: false,
            firstError: ''
        }, true, 'new error');
        assert.isTrue(result);
    });

    it('Should detect if validation state has changed with old error and new no error', () => {
        let result = validationStateHasChanged({
            hasError: true,
            firstError: 'first error'
        }, false);
        assert.isTrue(result);
    });

    it('Should not detect if validation state has changed with old no error and new no error', () => {
        let result = validationStateHasChanged({
            hasError: false,
            firstError: ''
        }, false, '');
        assert.isFalse(result);
    });

    it('Should not detect if validation state has changed with old error and new error are same', () => {
        let result = validationStateHasChanged({
            hasError: true,
            firstError: 'first error'
        }, true, 'first error');
        assert.isFalse(result);
    });

    it('Should get first error', () => {
        let result = getFirstError({
            a: 'a',
            b: 'b'
        });
        assert.equal(result, 'a');
    });

    it('Should get value for checkbox', () => {
        let valueTrue = getElementValue({ tagName: 'INPUT', type: 'checkbox', value: 'on', checked: true });
        let valueFalse = getElementValue({ tagName: 'INPUT', type: 'checkbox', value: 'on', checked: false });
        // check box group
        let value = getElementValue({ tagName: 'INPUT', type: 'checkbox', value: 'a' });
        assert.isTrue(valueTrue);
        assert.isFalse(valueFalse);
        assert.equal(value, 'a');
    });

    it('Should get value for input', () => {
        let value = getElementValue({ tagName: 'INPUT', type: 'text', value: 'a' });
        assert.equal(value, 'a');
    });

    it('Should get value for textarea', () => {
        let value = getElementValue({ tagName: 'TEXTAREA', value: 'a' });
        assert.equal(value, 'a');
    });

    it('Should get value for select', () => {
        let value = getElementValue({
            tagName: 'SELECT', selectedIndex: 1, options: [
                { value: 'a' },
                { value: 'b' },
                { value: 'c' }
            ]
        });
        assert.equal(value, 'b');
    });
});

