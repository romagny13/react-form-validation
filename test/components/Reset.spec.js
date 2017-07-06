import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Reset } from '../../src/index';

describe('Reset', () => {

    it('Should reset', (done) => {
        let props = {
            initialState: {
                model: {
                    firstname: 'Marie',
                    lastname: 'bellin'
                },
                errors: {}
            },
            onReset: (value) => {
                assert.deepEqual({
                    model: {
                        firstname: 'Marie',
                        lastname: 'bellin'
                    },
                    errors: {}
                }, value);
                done();
            }
        };

        const wrapper = shallow(<Reset {...props} />);

        props.initialState.model = {
            firstname: 'Marie!',
            lastname: 'bellin!'
        };

        let button = wrapper.find('input');
        
        button.simulate('click');
    });

});