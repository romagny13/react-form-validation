import { assert } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { required } from '../../../src/common/validators';
import { Input } from '../../../src/components/Input';
import { Form } from '../../../src/components/FormComponent';
import { FormGroup } from '../../../src/components/FormGroup';
import {
    Validator,
    canValidateOnChange,
    canValidateOnBlur,
    validationStateHasChanged
} from '../../../src/components/Validator';

const MyFormGroup = ({ hasError, hasSuccess, firstError, errors }) => {
    let groupClassName = hasError ? 'form-group has-error' : 'form-group';
    return (
        <div id="group" className={groupClassName}>
            <Input id="firstname" name="firstname" value="" />
            {hasError && <span className="help-block">{firstError}</span>}
        </div>
    );
};

describe('Validator', () => {

    let validators = [required()];

    it('Should cannot validate on change with no validators', () => {
        assert.isFalse(canValidateOnChange([], false ));
        assert.isFalse(canValidateOnChange([],  true ));
        assert.isFalse(canValidateOnChange([], true , true));
    });

    it('Should cannot validate on blur with no validators', () => {
        assert.isFalse(canValidateOnBlur([], 'touched', false));
    });

    it('Should cannot validate with mode submit and form not submitted', () => {
        assert.isFalse(canValidateOnChange(validators, false ));
    });

    it('Should can validate with mode submit and form submitted', () => {
        assert.isTrue(canValidateOnChange(validators,  true ));
    });

    it('Should cannot validate on blur with mode touched if touched', () => {
        assert.isFalse(canValidateOnBlur(validators, 'touched', true));
    });

    it('Should can validate on blur with mode touched if not already touched (first time)', () => {
        assert.isTrue(canValidateOnBlur(validators, 'touched',  false));
    });

    it('Should detect if validation state has changed with old no error and new error', () => {
        let result = validationStateHasChanged({
            hasError: false,
            error: ''
        }, true, 'new error');
        assert.isTrue(result);
    });

    it('Should detect if validation state has changed with old error and new no error', () => {
        let result = validationStateHasChanged({
            hasError: true,
            error: 'first error'
        }, false);
        assert.isTrue(result);
    });

    it('Should not detect if validation state has changed with old no error and new no error', () => {
        let result = validationStateHasChanged({
            hasError: false,
            error: ''
        }, false, '');
        assert.isFalse(result);
    });

    it('Should not detect if validation state has changed with old error and new error are same', () => {
        let result = validationStateHasChanged({
            hasError: true,
            error: 'first error'
        }, true, 'first error');
        assert.isFalse(result);
    });

});

