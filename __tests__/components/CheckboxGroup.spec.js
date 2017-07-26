import React from 'react';
import { mount, shallow } from 'enzyme';

import { CheckboxGroup } from '../../src/index';

describe('CheckboxGroup', () => {

    // check

    it('Should fail without name', () => {
        let failed = false;
        let props = {
            name: 'my-field',
            dataSource: ['a', 'b']
        };
        try {
            const wrapper = shallow(<CheckboxGroup  {...props} />);
        }
        catch (e) {
            failed = true;
        }
        expect(failed).toBeTruthy();
    });


    it('Should render with values', () => {
        let props = {
            name: 'my-field',
            values: ['a'],
            dataSource: ['a', 'b'],
            blockClassName: "checkbox"
        };
        const wrapper = shallow(<CheckboxGroup  {...props} />);

        expect(wrapper.html()).toEqual('<div><div class="checkbox"><label><input type="checkbox" value="a" checked="" name="my-field"/>a</label></div><div class="checkbox"><label><input type="checkbox" value="b" name="my-field"/>b</label></div></div>');
    });

    it('Should notify on value change', () => {
        let props = {
            name: 'my-field',
            values: ['a'],
            dataSource: ['a', 'b', 'c'],
            onValueChange: (name, value) => {
                expect(name).toEqual('my-field');
                expect(value).toEqual(['a', 'c']);
            }
        };
        const wrapper = shallow(<CheckboxGroup  {...props} />);

        let input = wrapper.find('input').at(2);

        let event = {
            target: {
                value: 'c'
            }
        };
        input.simulate('change', event);
    });


    it('Should notify on blur', () => {
        let props = {
            name: 'my-field',
            values: ['a'],
            dataSource: ['a', 'b', 'c'],
            onTouch: (name) => {
                expect(name).toEqual('my-field');
            }
        };
        const wrapper = shallow(<CheckboxGroup  {...props} />);

        let input = wrapper.find('input').at(2);

        let event = {
            target: {
                value: 'c'
            }
        };
        input.simulate('blur', event);
    });

});