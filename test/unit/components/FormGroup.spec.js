import { assert } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Validator } from '../../../src/common/validators';
import { Input } from '../../../src/components/Input';
import { FormGroup } from '../../../src/components/FormGroup';

describe('FormGroup', () => {

    it('Should validate', () => {

        const validators = {
            'firstname': [Validator.required()]
        };

        const formGroup = mount(<FormGroup className="form-group" validators={validators['firstname']}>
            <Input id="firstname" name="firstname" value="" />
        </FormGroup>);

        formGroup.instance().validate();

        let div = formGroup.find('div');
        let span = formGroup.find('span');
        assert.equal(div.hasClass('has-error'), true);
        assert.equal(span.text(), 'This field is required.');
    });

});
