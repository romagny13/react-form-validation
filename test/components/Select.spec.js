import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Select } from '../../src/index';

describe('Select', () => {

    // check

  /*  it('Should fail without name', () => {
        let failed = false;
        let props = {
             dataSource: ['a', 'b']
        };
        try {
            const wrapper = shallow(<Select  {...props} />);
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
            dataSource: ['a', 'b']
        };
        const wrapper = shallow(<Select  {...props} />);

        assert.equal('<select name="my-field"><option selected="" value="a">a</option><option value="b">b</option></select>', wrapper.html());
    });

    it('Should notify on value change', (done) => {
        let props = {
            name: 'my-field',
            value: 'a',
            dataSource: ['a', 'b'],
            onValueChange: (name, value) => {
                assert.equal('my-field', name);
                assert.equal('b', value);
                done();
            }
        };
        const wrapper = shallow(<Select  {...props} />);

        let select = wrapper.find('select');

        let event = {
            target: {
                selectedIndex: 1,
                options: [{ value: 'a' }, { value: 'b' }]
            }
        };
        select.simulate('change', event);
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
        const wrapper = shallow(<Select  {...props} />);

        let select = wrapper.find('select');

        let event = {
            target: {
                selectedIndex: 1,
                options: [{ value: 'a' }, { value: 'b' }]
            }
        };
        select.simulate('blur', event);
    });

});