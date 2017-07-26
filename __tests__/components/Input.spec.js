import React from 'react';
import { mount, shallow } from 'enzyme';

import { Input } from '../../src/index';

describe('Input', () => {

    it('Should render with no value', () => {
        let props = {
            name: 'my-field'
        };
        const wrapper = shallow(<Input  {...props} />);

        let input = wrapper.find('input');

        expect(input.html()).toEqual('<input type="text" value="" name="my-field"/>');
    });

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };
        const wrapper = shallow(<Input  {...props} />);

        let input = wrapper.find('input');

        expect(input.html()).toEqual('<input type="text" value="my value" name="my-field"/>');
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
        const wrapper = shallow(<Input  {...props} />);
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
        const wrapper = shallow(<Input  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: 'my new value'
            }
        };
        input.simulate('blur', event);
    });

    // number

    it('Should render with number', () => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'number'
        };
        const wrapper = shallow(<Input  {...props} />);

        let input = wrapper.find('input');

        expect(input.html()).toEqual('<input type="number" value="10" name="my-field"/>');
    });


    it('Should convert value to number on value change', () => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'number',
            onValueChange: (name, value) => {
                expect(name).toEqual('my-field');
                expect(value).toEqual(200);
            }
        };
        const wrapper = shallow(<Input  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: '200'
            }
        };
        input.simulate('change', event);
    });

    it('Should notify on blur / touch with number', () => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'number',
            onTouch: (name) => {
                expect(name).toEqual('my-field');
            }
        };
        const wrapper = shallow(<Input  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: '200'
            }
        };
        input.simulate('blur', event);
    });
});