import React from 'react';
import { jsdom } from 'jsdom';

import { hasClassName, addClassName, removeClassName } from '../../src/common/util';

describe('util', () => {

    it('check has class name', () => {
        expect(hasClassName('', 'form-group')).toBeFalsy();
        expect(hasClassName('form-group', 'form-group')).toBeTruthy();
        expect(hasClassName('my-form form-group', 'form-group')).toBeTruthy();
    });

    it('should add class name', () => {
        expect(addClassName('', 'form-group')).toEqual('form-group');
        expect(addClassName('my-form', 'form-group')).toEqual('my-form form-group');
    });

    it('should remove class name', () => {
        expect(removeClassName('form-group','form-group')).toEqual('');
        expect(removeClassName('my-form form-group', 'form-group')).toEqual('my-form');
    });

});
