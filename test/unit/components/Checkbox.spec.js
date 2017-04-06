import { assert } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Checkbox } from '../../../src/components/Checkbox';

describe('Checkbox', () => {

    it('Should render Checkbox', () => {
        let props = {
            id: 'agreeid',
            name: 'agree',
            className: 'form-control'
        };
        const wrapper = shallow(<Checkbox  {...props} />);
        let input = wrapper.find('input');
        assert.equal(input.prop('checked'), false);
        assert.equal(input.prop('type'), 'checkbox');
        assert.equal(input.prop('name'), props.name);
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
    });

    it('Should render Checkbox checked', () => {
        let props = {
            name: 'agree',
            checked: true
        };
        const wrapper = shallow(<Checkbox  {...props} />);
        let input = wrapper.find('input');
        assert.equal(input.prop('checked'), true);
    });

});
