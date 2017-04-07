import { assert } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Form, validateAll } from '../../../src/components/FormComponent';

describe('Form', () => {

    it('Should render Form', () => {
        let props = {
            id: 'formid',
            className: 'form-horizontal',
            mode: 'touched',
            showHasSuccess: true,
            hasErrorClassName: 'field-has-error',
            hasSuccessClassName: 'field-has-success',
            onSubmit: () => { }
        };
        const wrapper = mount(<Form  {...props} />);
        let form = wrapper.find('form');
        assert.equal(form.prop('id'), props.id);
        assert.equal(form.prop('placeholder'), props.placeholder);
        assert.isTrue(form.hasClass(props.className));

        let instance = wrapper.instance();
        assert.equal(instance.mode, 'touched');
        assert.equal(instance.hasErrorClassName, props.hasErrorClassName);
        assert.equal(instance.hasSuccessClassName, props.hasSuccessClassName);
        assert.isTrue(instance.showHasSuccess);
    });

});