import React from 'react';
import { mount, shallow } from 'enzyme';

import { Reset } from '../../src/index';

describe('Reset', () => {

    it('Should reset', () => {
        let props = {
            initialState: {
                model: {
                    firstname: 'Marie',
                    lastname: 'bellin'
                },
                errors: {}
            },
            onReset: (value) => {
                expect(value).toEqual({
                    model: {
                        firstname: 'Marie',
                        lastname: 'bellin'
                    },
                    errors: {}
                });
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