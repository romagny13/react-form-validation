import React from 'react';
import { mount, shallow } from 'enzyme';

import { RadioGroup } from '../../src/index';

describe('RadioGroup', () => {

    it('Should render with values', () => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            blockClassName: "radio-inline"
        };
        const wrapper = shallow(<RadioGroup  {...props} />);

        expect(wrapper.html()).toEqual('<div><label class="radio-inline"><input type="radio" name="my-field" value="a" checked=""/>a</label><label class="radio-inline"><input type="radio" name="my-field" value="b"/>b</label></div>');
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
        const wrapper = shallow(<RadioGroup  {...props} />);

        let input = wrapper.find('input').at(1);

        let event = {
            target: {
                value: 'b'
            }
        };
        input.simulate('change', event);
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
        const wrapper = shallow(<RadioGroup  {...props} />);

        let input = wrapper.find('input').at(1);

        let event = {
            target: {
                value: 'b'
            }
        };
        input.simulate('blur', event);
    });

});