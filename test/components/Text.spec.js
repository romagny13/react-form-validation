import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Text } from '../../src/components/Text';

describe('Text', () => {

    it('Should render text with no value', () => {
        let props = {
            name: 'my-field'
        };
        const wrapper = shallow(<Text  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="text" value="" name="my-field"/>', input.html());
    });

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };
        const wrapper = shallow(<Text  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="text" value="my value" name="my-field"/>', input.html());
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
        const wrapper = shallow(<Text  {...props} />);
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
        const wrapper = shallow(<Text  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: 'my new value'
            }
        };
        input.simulate('blur', event);
    });

});