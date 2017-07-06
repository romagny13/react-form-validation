import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { File } from '../../src/components/File';

describe('File', () => {

    it('Should render File with no value', () => {
        let props = {
            name: 'my-field'
        };
        const wrapper = shallow(<File  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="file" value="" name="my-field"/>', input.html());
    });

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };
        const wrapper = shallow(<File  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="file" value="my value" name="my-field"/>', input.html());
    });

    it('Should render with accept', () => {
        let props = {
            name: 'my-field',
            value: 'my value',
            accept: 'image/*'
        };
        const wrapper = shallow(<File  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="file" value="my value" name="my-field" accept="image/*"/>', input.html());
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
        const wrapper = shallow(<File  {...props} />);
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
        const wrapper = shallow(<File  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                value: 'my new value'
            }
        };
        input.simulate('blur', event);
    });

});