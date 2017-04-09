import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { required } from '../../../src/common/validators';
import { Input } from '../../../src/components/Input';
import { FormGroup, getGroupClassName } from '../../../src/components/FormGroup';

describe('FormGroup', () => {

    it('Should get group className', () => {
        let result = getGroupClassName(false, false, 'form-group', 'has-error', 'has-success');
        assert.equal(result, 'form-group');
    });

    it('Should get group className empty', () => {
        let result = getGroupClassName(false, false, undefined, 'has-error', 'has-success');
        assert.equal(result, undefined);
    });

    it('Should get group className + has error', () => {
        let result = getGroupClassName(true, false, 'form-group', 'has-error', 'has-success');
        assert.equal(result, 'form-group has-error');
    });

    it('Should get group className empty + has error', () => {
        let result = getGroupClassName(true, false, undefined, 'has-error', 'has-success');
        assert.equal(result, 'has-error');
    });

    it('Should get group className + has success', () => {
        let result = getGroupClassName(false, true, 'form-group', 'has-error', 'has-success');
        assert.equal(result, 'form-group has-success');
    });

    it('Should get group className empty + has success', () => {
        let result = getGroupClassName(false, true, undefined, 'has-error', 'has-success');
        assert.equal(result, 'has-success');
    });

});

