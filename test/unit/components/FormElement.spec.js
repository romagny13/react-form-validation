import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { tryUpdateFormModel } from '../../../src/components/FormElement';

describe('FormElement', () => {

    it('Should update form model', () => {

        let form = {
            model: {
                firstname: 'a'
            }
        };

        tryUpdateFormModel(form, 'firstname', 'b');

        assert.equal(form.model.firstname,'b');
    });

});
