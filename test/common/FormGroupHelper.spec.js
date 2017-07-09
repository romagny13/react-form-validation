import { assert } from 'chai';

import { FormGroupHelper } from '../../src/common/FormGroupHelper';

describe('FormGroupHelper', () => {

    // concat 

    it('Should concat classNames', () => {
        let result = FormGroupHelper.concatClassName('form-group', 'has-error');
        assert.equal('form-group has-error', result);
    });

    it('Should concat classNames with className empty', () => {
        let result = FormGroupHelper.concatClassName('', 'has-error');
        assert.equal('has-error', result);
    });

    it('Should concat classNames with multiple class names', () => {
        let result = FormGroupHelper.concatClassName('form-group', 'has-error has-error2');
        assert.equal('form-group has-error has-error2', result);
    });

    // group class name

    it('Should get only group class name without error or success', () => {
        let result = FormGroupHelper.getGroupClassName(false,  false, 'form-group', 'has-error', 'has-success');
        assert.equal('form-group', result);
    });

    it('Should get group class name + error', () => {
        let result = FormGroupHelper.getGroupClassName(true, false, 'form-group',  'has-error', 'has-success');
        assert.equal('form-group has-error', result);
    });

    it('Should get group class name + success', () => {
        let result = FormGroupHelper.getGroupClassName(false, true, 'form-group', 'has-error', 'has-success');
        assert.equal('form-group has-success', result);
    });

});
