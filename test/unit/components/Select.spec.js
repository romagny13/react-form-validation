import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { Select } from '../../../src/components/Select';

describe('Select', () => {

    it('Should render Select', () => {
        let props = {
            id: 'my-select-id',
            name: 'my-select',
            className: 'form-control',
            dataSource: ['a', 'b', 'c'],
            current: 'b'
        };
        const wrapper = shallow(<Select  {...props} />);
        let select = wrapper.find('select');
        assert.equal(select.prop('value'), 'b');
        assert.equal(select.prop('name'), props.name);
        assert.equal(select.prop('id'), props.id);
        assert.isTrue(select.hasClass(props.className));
    });

});
