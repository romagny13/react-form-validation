import React from 'react';
import { mount, shallow } from 'enzyme';

import { Select } from '../../src/index';

describe('Select', () => {

    it('Should render with values', () => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b']
        };
        const wrapper = shallow(<Select  {...props} />);

        expect(wrapper.html()).toEqual('<select name="my-field"><option selected="" value="a">a</option><option value="b">b</option></select>');
    });

    it('Should notify on value change', () => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            onValueChange: (name, value) => {
                expect(name).toEqual('my-field');
                expect(value).toEqual('b');
            }
        };
        const wrapper = shallow(<Select  {...props} />);

        let select = wrapper.find('select');

        let event = {
            target: {
                selectedIndex: 1,
                options: [{ value: 'a' }, { value: 'b' }]
            }
        };
        select.simulate('change', event);
    });


    it('Should notify on blur', () => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            onTouch: (name) => {
                expect(name).toEqual('my-field');
            }
        };
        const wrapper = shallow(<Select  {...props} />);

        let select = wrapper.find('select');

        let event = {
            target: {
                selectedIndex: 1,
                options: [{ value: 'a' }, { value: 'b' }]
            }
        };
        select.simulate('blur', event);
    });

});