import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Input } from '../../src/components/Input';

describe('Input', () => {

    // check

    it('Should fail without name', () => {
        let failed = false;
        let props = {};
        try {
            const wrapper = shallow(<Input  {...props} />);
        }
        catch (e) {
            failed = true;
        }
        assert.isTrue(failed);
    });

    it('Should success with name', () => {
        let failed = false;
        let props = {
            name: 'my-field'
        };

        let wrapper;

        try {
            wrapper = shallow(<Input  {...props} />);
        }
        catch (e) {
            failed = true;
        }

        let input = wrapper.find('input');

        assert.isFalse(failed);
        assert.equal('<input type="text" value="" name="my-field"/>', input.html());
    });

    it('Should render with no value', () => {
        let props = {
            name: 'my-field'
        };
        const wrapper = shallow(<Input  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="text" value="" name="my-field"/>', input.html());
    });

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            value: 'my value'
        };
        const wrapper = shallow(<Input  {...props} />);

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
        const wrapper = shallow(<Input  {...props} />);
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

        assert.equal('<input type="number" value="10" name="my-field"/>', input.html());
    });


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
        const wrapper = shallow(<Input  {...props} />);
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