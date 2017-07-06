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
        let result = FormGroupHelper.getGroupClassName(false, false, false, 'form-group', 'has-feedback', 'has-error', 'has-success');
        assert.equal('form-group', result);
    });

    it('Should get only group class name without error or success with feedback', () => {
        let result = FormGroupHelper.getGroupClassName(true, false, false, 'form-group', 'has-feedback', 'has-error', 'has-success');
        assert.equal('form-group', result);
    });

    it('Should get group class name + error', () => {
        let result = FormGroupHelper.getGroupClassName(false, true, false, 'form-group', 'has-feedback', 'has-error', 'has-success');
        assert.equal('form-group has-error', result);
    });

    it('Should get group class name + success', () => {
        let result = FormGroupHelper.getGroupClassName(false, false, true, 'form-group', 'has-feedback', 'has-error', 'has-success');
        assert.equal('form-group has-success', result);
    });

    // group class name + feed back

    it('Should get group class name + error + feedback', () => {
        let result = FormGroupHelper.getGroupClassName(true, true, false, 'form-group', 'has-feedback', 'has-error', 'has-success');
        assert.equal('form-group has-error has-feedback', result);
    });

    it('Should get group class name + success', () => {
        let result = FormGroupHelper.getGroupClassName(true, false, true, 'form-group', 'has-feedback', 'has-error', 'has-success');
        assert.equal('form-group has-success has-feedback', result);
    });
});
