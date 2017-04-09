import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { TextArea } from '../../../src/components/TextArea';

describe('TextArea', () => {

    it('Should render TextArea', () => {
        let props = {
            id: 'my-textarea-id',
            name: 'my-textarea',
            rows: 10,
            cols: 30,
            value: 'My text',
            className: 'form-control',
            placeholder: 'Enter'
        };
        const wrapper = shallow(<TextArea  {...props} />);
        let textArea = wrapper.find('textarea');
        assert.equal(textArea.prop('value'), props.value);
        assert.equal(textArea.prop('name'), props.name);
        assert.equal(textArea.prop('rows'), props.rows);
        assert.equal(textArea.prop('cols'), props.cols);
        assert.equal(textArea.prop('id'), props.id);
        assert.equal(textArea.prop('placeholder'), props.placeholder);
        assert.isTrue(textArea.hasClass(props.className));
    });

});
