import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { RadioGroup } from '../../../src/components/RadioGroup';

describe('RadioGroup', () => {

    it('Should render RadioGroup', () => {
        let props = {
            name: 'my-radio',
            className: 'form-control',
            dataSource: ['a', 'b', 'c'],
            current: 'b'
        };
        const wrapper = shallow(<RadioGroup  {...props} />);
        let input0 = wrapper.find('input').at(0);
        let input1 = wrapper.find('input').at(1);
        let input2 = wrapper.find('input').at(2);
        assert.equal(input0.prop('value'), 'a');
        assert.equal(input0.prop('checked'), false);
        assert.equal(input0.prop('type'), 'radio');
        assert.equal(input0.prop('name'), props.name);
        assert.isTrue(input0.hasClass(props.className));
        assert.equal(input1.prop('value'), 'b');
        assert.equal(input1.prop('checked'), true);
        assert.equal(input2.prop('value'), 'c');
        assert.equal(input2.prop('checked'), false);
    });


});
