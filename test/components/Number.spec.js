import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Number } from '../../src/components/Number';

describe('Number', () => {

    it('Should render with number', () => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'number'
        };
        const wrapper = shallow(<Number  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="number" value="10" name="my-field"/>', input.html());
    });

   /* it('Should not render value with not a number', () => {
        let props = {
            name: 'my-field',
            value: 'abc',
            type: 'number'
        };
        const wrapper = shallow(<Number  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="number" value="" name="my-field"/>', input.html());
    });
*/
    it('Should convert value to number on value change', (done) => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'number',
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.equal(200, value);
                done();
            }
        };
        const wrapper = shallow(<Number  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: '200'
            }
        };
        input.simulate('change', event);
    });

    it('Should notify on blur / touch with number', (done) => {
        let props = {
            name: 'my-field',
            value: 10,
            type: 'number',
            onTouch: (name) => {
                assert.equal('my-field', name);
                done();
            }
        };
        const wrapper = shallow(<Number  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: '200'
            }
        };
        input.simulate('blur', event);
    });
});