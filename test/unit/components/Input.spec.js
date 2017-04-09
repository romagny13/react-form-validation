import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { Input } from '../../../src/components/Input';

describe('Input', () => {

    it('Should render Input', () => {
        let props = {
            id: 'firstnameid',
            name: 'firstname',
            value: 'Marie',
            className: 'form-control',
            placeholder: 'Enter firstname'
        };
        const wrapper = shallow(<Input  {...props} />);
        let input = wrapper.find('input');
        assert.equal(input.prop('value'), props.value);
        assert.equal(input.prop('type'), 'text'); // text by default
        assert.equal(input.prop('name'), props.name);
        assert.equal(input.prop('id'), props.id);
        assert.equal(input.prop('placeholder'), props.placeholder);
        assert.isTrue(input.hasClass(props.className));
    });

    it('Should render Input range', () => {
        let props = {
            type: 'range',
            name: 'r'
        };
        const wrapper = shallow(<Input  {...props} />);
        let input = wrapper.find('input');
        assert.equal(input.prop('value'), '');
        assert.equal(input.prop('type'), 'range');
    });

    it('Should render Input range with initial value', () => {
        let props = {
            type: 'range',
            name: 'r',
            value: 10
        };
        const wrapper = shallow(<Input  {...props} />);
        let input = wrapper.find('input');
        assert.equal(input.prop('value'), 10);
        assert.equal(input.prop('type'), 'range');
    });

});
