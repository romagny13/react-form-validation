import { assert } from 'chai';
import { validateValue, required, minLength, maxLength, pattern, custom } from '../../../src/index';

function objLength(obj) {
    return Object.keys(obj).length;
}

function firstError(obj) {
    return obj[Object.keys(obj)[0]];
}

describe('Validators', () => {

    it('required ko', () => {
        let validator = required();
        let result = validator();
        assert.equal(result.name, 'required');
        assert.equal(result.error, 'This field is required.');
    });

    it('required ko with personal message and name', () => {
        let validator = required('Message', 'MyValidator');
        let result = validator();
        assert.equal(result.name, 'MyValidator');
        assert.equal(result.error, 'Message');
    });

    it('required ok', () => {
        let validator = required();
        let result = validator('ok');
        assert.isUndefined(result);
    });

    it('minlength ko', () => {
        let validator = minLength();
        let result = validator('aa');
        assert.equal(result.name, 'minLength');
        assert.equal(result.error, 'Please enter at least than 3 characters.');
    });

    it('minlength ko with personal message and name', () => {
        let validator = minLength(3, 'Message', 'MyValidator');
        let result = validator('aa');
        assert.equal(result.name, 'MyValidator');
        assert.equal(result.error, 'Message');
    });

    it('minlength ok', () => {
        let validator = minLength();
        let result = validator('aaaaa');
        assert.isUndefined(result);
    });

    it('maxlength ko', () => {
        let validator = maxLength(5);
        let result = validator('aaaaaaaa');
        assert.equal(result.name, 'maxLength');
        assert.equal(result.error, 'Please enter no more than 5 characters.');
    });

    it('maxlength ko with personal message and name', () => {
        let validator = maxLength(5, 'Message', 'MyValidator');
        let result = validator('aaaaaaaa');
        assert.equal(result.name, 'MyValidator');
        assert.equal(result.error, 'Message');
    });

    it('maxlength ok', () => {
        let validator = maxLength(5);
        let result = validator('aaa');
        assert.isUndefined(result);
    });

    it('pattern ko', () => {
        let validator = pattern(/^[a-z]+$/);
        let result = validator(1000);
        assert.equal(result.name, 'pattern');
        assert.equal(result.error, 'Please fix this field.');
    });

    it('pattern ko with personal message and name', () => {
        let validator = pattern(/^[a-z]+$/, 'Message', 'MyValidator');
        let result = validator(1000);
        assert.equal(result.name, 'MyValidator');
        assert.equal(result.error, 'Message');
    });

    it('pattern ok', () => {
        let validator = pattern(/^[a-z]+$/);
        let result = validator('aaaa');
        assert.isUndefined(result);
    });

    it('custom ko', () => {
        let validator = custom((p) => p === 'a');
        let result = validator('b');
        assert.equal(result.name, 'custom');
        assert.equal(result.error, 'Please fix this field.');
    });

    it('custom ko with personal messsage and name', () => {
        let validator = custom((p) => p === 'a', 'Message', 'MyValidator');
        let result = validator('b');
        assert.equal(result.name, 'MyValidator');
        assert.equal(result.error, 'Message');
    });

    it('custom ok', () => {
        let validator = custom((p) => p === 'a');
        let result = validator('a');
        assert.isUndefined(result);
    });

    it('Should ignore minLength if no value', () => {
        let validator = minLength(3, 'Message');
        let result = validator('');
        assert.isUndefined(result);
    });

    it('Should ignore maxLength if no value', () => {
        let validator = maxLength(3, 'Message');
        let result = validator('');
        assert.isUndefined(result);
    });

    it('Should ignore pattern if no value', () => {
        let validator = pattern(/^[a-z]+$/, 'Message');
        let result = validator('');
        assert.isUndefined(result);
    });

    it('Should ignore custom if no value', () => {
        let validator = custom((p) => p === 'a', 'Message');
        let result = validator('');
        assert.isUndefined(result);
    });


    describe('FormElements', () => {
        it('Should required undefined', () => {
            let validators = [required(), minLength(3), maxLength(10)];
            let result = validateValue(undefined, validators);
            assert.isTrue(result.hasError);
            assert.equal(result.error, 'This field is required.');
        });

        it('Should required null', () => {
            let validators = [required(), minLength(3), maxLength(10)];
            let result = validateValue(null, validators);
            assert.isTrue(result.hasError);
            assert.equal(result.error, 'This field is required.');
        });

        it('Should required string empty', () => {
            let validators = [required(), minLength(3), maxLength(10)];
            let result = validateValue('', validators);
            assert.isTrue(result.hasError);
            assert.equal(result.error, 'This field is required.');
        });

        it('Should required boolean false', () => {
            let validators = [required(), minLength(3), maxLength(10)];
            let result = validateValue(false, validators);
            assert.isTrue(result.hasError);
            assert.equal(result.error, 'This field is required.');
        });

        it('Should minlength', () => {
            let validators = [required(), minLength(3), maxLength(10)];
            let result = validateValue('ab', validators);
            assert.equal(result.error, 'Please enter at least than 3 characters.');
        });

        it('Should pass without required if string empty', () => {
            let validators = [maxLength(30), maxLength(10)];
            let result = validateValue('', validators);
            assert.isFalse(result.hasError);
        });

        it('Should pass validation', () => {
            let validators = [required(), minLength(3), maxLength(10)];
            let result = validateValue('its ok', validators);
            assert.isFalse(result.hasError);
        });

        it('Should pattern', () => {
            let validators = [required(), pattern(/^[a-z]+$/)];
            let result = validateValue(120, validators);
            assert.equal(result.error, 'Please fix this field.');
        });

        it('Should pass pattern', () => {
            let validators = [required(), pattern(/^[a-z]+$/)];
            let result = validateValue('thisgood', validators);
            assert.isFalse(result.hasError);
        });

    });

});
