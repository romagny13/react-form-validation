import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { RadioGroup } from '../../src/index';

describe('RadioGroup', () => {

    // check
/*
    it('Should fail without name', () => {
        let failed = false;
        let props = {
            dataSource: ['a', 'b']
        };
        try {
            const wrapper = shallow(<RadioGroup  {...props} />);
        }
        catch (e) {
            failed = true;
        }
        assert.isTrue(failed);
    });*/


    it('Should render with values', () => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            blockClassName:"radio-inline"
        };
        const wrapper = shallow(<RadioGroup  {...props} />);

        assert.equal('<div><label class="radio-inline"><input type="radio" name="my-field" value="a" checked=""/>a</label><label class="radio-inline"><input type="radio" name="my-field" value="b"/>b</label></div>', wrapper.html());
    });

    it('Should notify on value change', (done) => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.deepEqual('b', value);
                done();
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


    it('Should notify on blur', (done) => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            onTouch: (name) => {
                assert.equal('my-field', name);
                done();
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