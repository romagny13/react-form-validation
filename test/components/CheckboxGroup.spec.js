import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { CheckboxGroup } from '../../src/components/CheckboxGroup';

describe('CheckboxGroup', () => {

    // check

    it('Should fail without name', () => {
        let failed = false;
        let props = {
            dataSource: ['a', 'b']
        };
        try {
            const wrapper = shallow(<CheckboxGroup  {...props} />);
        }
        catch (e) {
            failed = true;
        }
        assert.isTrue(failed);
    });


    it('Should render with values', () => {
        let props = {
            name: 'my-field',
            values: ['a'],
            dataSource: ['a', 'b']
        };
        const wrapper = shallow(<CheckboxGroup  {...props} />);

        assert.equal('<div><div class="checkbox"><label><input type="checkbox" value="a" checked="" name="my-field"/>a</label></div><div class="checkbox"><label><input type="checkbox" value="b" name="my-field"/>b</label></div></div>', wrapper.html());
    });

    it('Should notify on value change', (done) => {
        let props = {
            name: 'my-field',
            values: ['a'],
            dataSource: ['a', 'b', 'c'],
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.deepEqual(['a', 'c'], value);
                done();
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


    it('Should notify on blur', (done) => {
        let props = {
            name: 'my-field',
            values: ['a'],
            dataSource: ['a', 'b', 'c'],
            onTouch: (name) => {
                assert.equal('my-field', name);
                done();
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