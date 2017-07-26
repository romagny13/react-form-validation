import React from 'react';
import { mount, shallow } from 'enzyme';

import { Password } from '../../src/index';

describe('Password', () => {

    it('Should render Password with no value', () => {
        let props = {
            name: 'my-field'
        };
        const wrapper = shallow(<Password  {...props} />);

        let input = wrapper.find('input');

        expect(input.html()).toEqual('<input type="password" value="" style="position:relative;width:100%;" name="my-field" class="hide-ms-eye"/>');
        expect(wrapper.find('a').exists()).toBeFalsy();
    });

    it('Should render with value show eye', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };
        const wrapper = shallow(<Password  {...props} />);

        let input = wrapper.find('input');

        expect(input.html()).toEqual('<input type="password" value="my value" style="position:relative;width:100%;" name="my-field" class="hide-ms-eye"/>');
         expect(wrapper.find('a').exists()).toBeTruthy();
    });

    it('Should not render eye if renderEyeIcon is false', () => {
        let props = {
            name: 'my-field',
            value: 'my value',
            renderEyeIcon: false,
        };
        const wrapper = shallow(<Password  {...props} />);

        expect(wrapper.html()).toEqual('<input type="password" value="my value" name="my-field"/>');
    });

    it('Should change type on mouse down on eye', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };

        const wrapper = shallow(<Password  {...props} />);

        let input = wrapper.find('input');

        expect(input.html()).toEqual('<input type="password" value="my value" style="position:relative;width:100%;" name="my-field" class="hide-ms-eye"/>');

        let event = {
            preventDefault: function () { }
        };

        let a = wrapper.find('a');
        a.simulate('click', event);

        input = wrapper.find('input');
        expect(input.html()).toEqual('<input type="text" value="my value" style="position:relative;width:100%;" name="my-field" class="hide-ms-eye"/>');

        a.simulate('click', event);

        input = wrapper.find('input');
        expect(input.html()).toEqual('<input type="password" value="my value" style="position:relative;width:100%;" name="my-field" class="hide-ms-eye"/>');
    });

    it('Should notify on value change', () => {
        let props = {
            name: 'my-field',
            value: 'my value',
            onValueChange: (name, value) => {
                expect(name).toEqual('my-field');
                expect(value).toEqual('my new value');
            }
        };
        const wrapper = shallow(<Password  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: 'my new value'
            }
        };
        input.simulate('change', event);

    });

    it('Should notify on blur / touch', () => {
        let props = {
            name: 'my-field',
            value: 'my value',
            onTouch: (name) => {
                expect(name).toEqual('my-field');
            }
        };
        const wrapper = shallow(<Password  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: 'my new value'
            }
        };
        input.simulate('blur', event);
    });

});