import React from 'react';
import { mount, shallow } from 'enzyme';

import { Checkbox } from '../../src/index';

describe('Checkbox', () => {

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            checked: true
        };
        const wrapper = shallow(<Checkbox  {...props} />);

        let input = wrapper.find('input');
        expect(input.html()).toEqual('<input type="checkbox" checked="" name="my-field"/>');
    });

    it('Should notify on value change', () => {
        let props = {
            name: 'my-field',
            onValueChange: (name, value) => {
                expect(name).toEqual('my-field');
                expect(value).toBeTruthy();
            }
        };
        const wrapper = shallow(<Checkbox  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                checked: true
            }
        };
        input.simulate('change', event);

    });

    it('Should notify on blur / touch', () => {
        let props = {
            name: 'my-field',
            onTouch: (name) => {
                expect(name).toEqual('my-field');
            }
        };
        const wrapper = shallow(<Checkbox  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                checked: true
            }
        };
        input.simulate('blur', event);
    });

});