import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Range } from '../../src/components/Range';

describe('Range', () => {

    it('Should render with range', () => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'range'
        };
        const wrapper = shallow(<Range  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="range" value="10" name="my-field"/>', input.html());
    });

    it('Should convert value to range on value change', (done) => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'range',
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.equal(200, value);
                done();
            }
        };
        const wrapper = shallow(<Range  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: '200'
            }
        };
        input.simulate('change', event);
    });

    it('Should notify on blur / touch with range', (done) => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'range',
            onTouch: (name) => {
                assert.equal('my-field', name);
                done();
            }
        };
        const wrapper = shallow(<Range  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: '200'
            }
        };
        input.simulate('blur', event);
    });
});