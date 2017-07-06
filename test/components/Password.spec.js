import { assert } from 'chai';

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

        assert.equal('<input type="password" value="" name="my-field"/>', input.html());
    });

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };
        const wrapper = shallow(<Password  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="password" value="my value" name="my-field"/>', input.html());
    });

    it('Should notify on value change', (done) => {
        let props = {
            name: 'my-field',
            value: 'my value',
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.equal('my new value', value);
                done();
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

    it('Should notify on blur / touch', (done) => {
        let props = {
            name: 'my-field',
            value: 'my value',
            onTouch: (name) => {
                assert.equal('my-field', name);
                done();
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