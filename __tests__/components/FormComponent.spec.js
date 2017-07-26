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

        expect(form.html()).toEqual('<form class="my-form" novalidate=""></form>');
    });

});
