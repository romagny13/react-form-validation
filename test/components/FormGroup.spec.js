import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { CompleteFormGroup } from '../../src/index';

describe('CompleteFormGroup', () => {

    it('Should render without error and success', () => {
        let props = {};
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
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
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group"></div>', div.html());
    });

    // error

    it('Should not render error if canValidationState is false', () => {
        let props = {
            canChangeValidationState: false,
            error: 'my error'
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group"></div>', div.html());
    });

    it('Should render with error', () => {
        let props = {
            canChangeValidationState: true,
            error: 'my error'
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group has-error"><span class="help-block">my error</span></div>', div.html());
    });

    // success

    it('Should not render success if canValidationState is undefined', () => {
        let props = {
            renderSuccess: true
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group"></div>', div.html());
    });

    it('Should not render success if canValidationState is false', () => {
        let props = {
            canChangeValidationState: false,
            renderSuccess: true
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group"></div>', div.html());
    });

    it('Should render with success', () => {
        let props = {
            canChangeValidationState: true,
            renderSuccess: true
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group has-success"></div>', div.html());
    });

    // feedback

    it('Should render with error + feedback', () => {
        let props = {
            canChangeValidationState: true,
            renderFeedback: true,
            error: 'my error'
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group has-error has-feedback"><span class="fa fa-times feedback" aria-hidden="true"></span><span class="help-block">my error</span></div>', div.html());
    });

    it('Should render with success + feedback', () => {
        let props = {
            canChangeValidationState: true,
            renderFeedback: true,
            renderSuccess: true
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group has-success has-feedback"><span class="fa fa-check feedback" aria-hidden="true"></span></div>', div.html());
    });

    // custom

    it('Should render with error + feedback with custom class names', () => {
        let props = {
            canChangeValidationState: true,
            renderFeedback: true,
            error: 'my error',
            feedbackClassName: 'my-feedback',
            errorClassName: 'my-error',
            successClassName: 'my-success',
            errorFeedbackClassName: 'my-error-feedback',
            successFeedbackClassName: 'my-success-feedback'
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group my-error my-feedback"><span class="my-error-feedback" aria-hidden="true"></span><span class="help-block">my error</span></div>', div.html());
    });

    it('Should render with success + feedback + feedback with custom class names', () => {
        let props = {
            canChangeValidationState: true,
            renderFeedback: true,
            renderSuccess: true,
            feedbackClassName: 'my-feedback',
            errorClassName: 'my-error',
            successClassName: 'my-success',
            errorFeedbackClassName: 'my-error-feedback',
            successFeedbackClassName: 'my-success-feedback'
        };
        const wrapper = shallow(<CompleteFormGroup  {...props} />);
        let div = wrapper.find('div');

        assert.equal('<div class="form-group my-success my-feedback"><span class="my-success-feedback" aria-hidden="true"></span></div>', div.html());
    });

});
