import React from 'react';
import { mount, shallow } from 'enzyme';

import { Submit } from '../../src/index';

describe('Submit', () => {

    it('Should disabled with no error', () => {
        let props = {
            errors: {}
        };
        const wrapper = shallow(<Submit  {...props} />);
        expect(wrapper.html()).toEqual('<input type="submit" class=""/>');
    });

    it('Should disabled with error undefined', () => {
        let props = {
            className:'btn btn-default'
        };
        const wrapper = shallow(<Submit  {...props} />);
        expect(wrapper.html()).toEqual('<input type="submit" class="btn btn-default"/>');
    });

    it('Should disabled with errors', () => {
        let props = {
            errors: {
                firsname: 'Tis field is required'
            },
             className:'btn btn-default'
        };
        const wrapper = shallow(<Submit  {...props} />);
        expect(wrapper.html()).toEqual('<input type="submit" disabled="" class="btn btn-default disabled"/>');
    });

    // custom

    it('Should disabled with errors + custom', () => {
        let props = {
            errors: {
                firsname: 'Tis field is required'
            },
            className: 'my-btn'
        };
        const wrapper = shallow(<Submit  {...props} />);
        expect(wrapper.html()).toEqual('<input type="submit" disabled="" class="my-btn disabled"/>');
    });


    it('Should disabled with no error + custom', () => {
        let props = {
            errors: {},
            className: 'my-btn'
        };
        const wrapper = shallow(<Submit  {...props} />);
        expect(wrapper.html()).toEqual('<input type="submit" class="my-btn"/>');
    });
});