import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Checkbox } from '../../src/index';

describe('Checkbox', () => {

    // check

    it('Should fail without name', () => {
        let failed = false;
        let props = {};
        try {
            const wrapper = shallow(<Checkbox  {...props} />);
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
            wrapper = shallow(<Checkbox  {...props} />);
        }
        catch (e) {
            failed = true;
        }

        let input = wrapper.find('input');

        assert.isFalse(failed);
        assert.equal('<input type="checkbox" name="my-field"/>', input.html());
    });

    it('Should render with value', () => {
        let props = {
            name: 'my-field',
            checked: true
        };
        const wrapper = shallow(<Checkbox  {...props} />);

        let input = wrapper.find('input');

        assert.equal('<input type="checkbox" checked="" name="my-field"/>', input.html());
    });

    it('Should notify on value change', (done) => {
        let props = {
            name: 'my-field',
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.equal(true, value);
                done();
            }
        };
        const wrapper = shallow(<Checkbox  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                checked: true
            }
        };
        input.simulate('change', event);

    });

    it('Should notify on blur / touch', (done) => {
        let props = {
            name: 'my-field',
            onTouch: (name) => {
                assert.equal('my-field', name);
                done();
            }
        };
        const wrapper = shallow(<Checkbox  {...props} />);
        let input = wrapper.find('input');

        let event = {
            target: {
                checked: true
            }
        };
        input.simulate('blur', event);
    });

});