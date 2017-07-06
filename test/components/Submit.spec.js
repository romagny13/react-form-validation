import { assert } from 'chai';

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Submit } from '../../src/components/Submit';

describe('Submit', () => {

    it('Should disabled with no error', () => {
        let props = {
            errors: {}
        };
        const wrapper = shallow(<Submit  {...props} />);
        assert.equal('<input type="submit" class="btn btn-default"/>', wrapper.html());
    });

    it('Should disabled with error undefined', () => {
        let props = {};
        const wrapper = shallow(<Submit  {...props} />);
        assert.equal('<input type="submit" class="btn btn-default"/>', wrapper.html());
    });

    it('Should disabled with errors', () => {
        let props = {
            errors: {
                firsname: 'Tis field is required'
            }
        };
        const wrapper = shallow(<Submit  {...props} />);
        assert.equal('<input type="submit" disabled="" class="btn btn-default disabled"/>', wrapper.html());
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
        assert.equal('<input type="submit" disabled="" class="my-btn disabled"/>', wrapper.html());
    });


    it('Should disabled with no error + custom', () => {
        let props = {
            errors: {},
            className: 'my-btn'
        };
        const wrapper = shallow(<Submit  {...props} />);
        assert.equal('<input type="submit" class="my-btn"/>', wrapper.html());
    });
});