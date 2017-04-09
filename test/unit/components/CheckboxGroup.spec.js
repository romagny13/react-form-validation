import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { CheckboxGroup } from '../../../src/components/CheckboxGroup';

describe('CheckboxGroup', () => {

    it('Should render CheckboxGroup', () => {
        let props = {
            name: 'my-checkbox',
            className: 'form-control',
            dataSource: ['a', 'b', 'c'],
            currents: ['a', 'b']
        };
        const wrapper = shallow(<CheckboxGroup  {...props} />);
        let input0 = wrapper.find('input').at(0);
        let input1 = wrapper.find('input').at(1);
        let input2 = wrapper.find('input').at(2);
        assert.equal(input0.prop('value'), 'a');
        assert.equal(input0.prop('checked'), true);
        assert.equal(input0.prop('type'), 'checkbox');
        assert.equal(input0.prop('name'), props.name);
        assert.isTrue(input0.hasClass(props.className));
        assert.equal(input1.prop('value'), 'b');
        assert.equal(input1.prop('checked'), true);
        assert.equal(input2.prop('value'), 'c');
        assert.equal(input2.prop('checked'), false);
    });


});
