import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Form } from '../../src/index';

describe('Form', () => {

    it('Should render with no validate', () => {
        let props = {
            className:'my-form'
        };
        const wrapper = shallow(<Form  {...props} />);
        let form = wrapper.find('form');

        assert.equal('<form class="my-form" novalidate=""></form>', form.html());
    });

});
