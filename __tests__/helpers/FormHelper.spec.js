import React from 'react';
import { jsdom } from 'jsdom';

import { FormHelper } from '../../src/index';

const document = jsdom();

describe('FormHelper', () => {

    it('is element', () => {
        // input
        expect(FormHelper.isInput(document.createElement('input'))).toBeTruthy();
        // textarea
        expect(FormHelper.isTextarea(document.createElement('textarea'))).toBeTruthy();
        // select
        expect(FormHelper.isSelect(document.createElement('select'))).toBeTruthy();
        // checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        expect(FormHelper.isCheckbox(checkbox)).toBeTruthy();
        // radio
        let radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        expect(FormHelper.isRadio(radio)).toBeTruthy();

        // number
        let numberEl = document.createElement('input');
        numberEl.setAttribute('type', 'number');
        expect(FormHelper.isNumberElement(numberEl)).toBeTruthy();

        // range
        let rangeEl = document.createElement('input');
        rangeEl.setAttribute('type', 'range');
        expect(FormHelper.isNumberElement(rangeEl)).toBeTruthy();
    });

    it('should get checkbox value not checked', () => {
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        expect(FormHelper.getCheckboxValue(checkbox)).toBeFalsy();
    });

    it('should get checkbox value checked', () => {
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('checked', 'true');
        expect(FormHelper.getCheckboxValue(checkbox)).toBeTruthy();
    });

      it('should get checkbox value with value', () => {
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', 'a');
        expect(FormHelper.getCheckboxValue(checkbox)).toEqual('a');
    });

     it('should get checkbox value with get input value function', () => {
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('checked', 'true');
        expect(FormHelper.getInputValue(checkbox)).toBeTruthy();
    });

    it('should get input value', () => {
        let input = document.createElement('input');
        input.setAttribute('value', 'my value');
        expect(FormHelper.getInputValue(input)).toEqual('my value');
    });

    it('should get select value', () => {
        /*
          <select>
               <option value="a">A</option>
               <option value="b" selected>B</option>
               <option value="c">C</option>
          </select>
        */
        let select = document.createElement('select');

        let op1 = document.createElement('option');
        op1.setAttribute('value', 'a');

        let op2 = document.createElement('option');
        op2.setAttribute('value', 'b');
        op2.setAttribute('selected', true);

        let op3 = document.createElement('option');
        op3.setAttribute('value', 'c');

        select.appendChild(op1);
        select.appendChild(op2);
        select.appendChild(op2);

        expect(FormHelper.getSelectValue(select)).toEqual('b');
    });

    it('should get select mutliple values', () => {
        /*
            <select multiple>
                <option value="a" selected>A</option>
                <option value="b" selected>B</option>
                <option value="c">C</option>
            </select>
        */
        let select = document.createElement('select');
        select.setAttribute('multiple', true);

        let op1 = document.createElement('option');
        op1.setAttribute('value', 'a');
        op1.setAttribute('selected', true);

        let op2 = document.createElement('option');
        op2.setAttribute('value', 'b');
        op2.setAttribute('selected', true);

        let op3 = document.createElement('option');
        op3.setAttribute('value', 'c');

        select.appendChild(op1);
        select.appendChild(op2);
        select.appendChild(op2);

        expect(FormHelper.getSelectValue(select)).toEqual(['a','b']);
    });

});
