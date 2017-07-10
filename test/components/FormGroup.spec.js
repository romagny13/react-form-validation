import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { FormGroup } from '../../src/index';

describe('FormGroup', () => {

    it('Should render without error and success', () => {
        let props = {};
        const wrapper = shallow(<FormGroup  {...props} />);
        let div = wrapper.find('div');
        assert.isTrue(div.hasClass('form-group'));
        assert.isFalse(div.hasClass('has-feedback'));
        assert.isFalse(div.hasClass('has-error'));
        assert.isFalse(div.hasClass('has-success'));
        assert.isFalse(wrapper.find('span').exists());

        assert.equal('<div class="form-group"></div>', div.html());
    });

    it('Should not render error if canValidationState is undefined', () => {
        let props = {
            error: 'my error'
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group"></div>', wrapper.html());
    });

    // error

    it('Should not render error if canValidationState is false', () => {
        let props = {
            canChangeValidationState: false,
            error: 'my error'
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group"></div>', wrapper.html());
    });

    it('Should render with error', () => {
        let props = {
            canChangeValidationState: true,
            error: 'my error'
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group has-error"><div class="clearfix"></div><span class="error-block">my error</span></div>', wrapper.html());
    });

    // success

    it('Should not render success if canValidationState is undefined', () => {
        let props = {
            renderSuccess: true
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group"></div>', wrapper.html());
    });

    it('Should not render success if canValidationState is false', () => {
        let props = {
            canChangeValidationState: false,
            renderSuccess: true
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group"></div>', wrapper.html());
    });

    it('Should render with success', () => {
        let props = {
            canChangeValidationState: true,
            renderSuccess: true
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group has-success"><div class="clearfix"></div></div>', wrapper.html());
    });

   
    // custom

    it('Should render with error custom', () => {
        let props = {
            canChangeValidationState: true,
            renderFeedback: true,
            error: 'my error',
            feedbackClassName: 'my-feedback',
            errorClassName: 'my-error',
            successClassName: 'my-success'
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group my-error"><div class="clearfix"></div><span class="error-block">my error</span></div>', wrapper.html());
    });

    it('Should render with success custom', () => {
        let props = {
            canChangeValidationState: true,
            renderFeedback: true,
            renderSuccess: true,
            feedbackClassName: 'my-feedback',
            errorClassName: 'my-error',
            successClassName: 'my-success'
        };
        const wrapper = shallow(<FormGroup  {...props} />);

        assert.equal('<div class="form-group my-success"><div class="clearfix"></div></div>', wrapper.html());
    });

});
