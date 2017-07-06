import { assert } from 'chai';

import { ValidationHelper, required, minlength, maxlength, pattern, email, custom } from '../../src/index';

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
        assert.equal(result, 'This field is required.');
    });

    it('required ok', () => {
        let validator = required();
        let result = validator('ok');
        assert.isUndefined(result);
    });

    it('minlength ko', () => {
        let validator = minlength();
        let result = validator('aa');
        assert.equal(result, 'Please enter at least than 3 characters.');
    });

    it('minlength ok', () => {
        let validator = minlength();
        let result = validator('aaaaa');
        assert.isUndefined(result);
    });

    it('maxlength ko', () => {
        let validator = maxlength(5);
        let result = validator('aaaaaaaa');
        assert.equal(result, 'Please enter no more than 5 characters.');
    });

    it('maxlength ok', () => {
        let validator = maxlength(5);
        let result = validator('aaa');
        assert.isUndefined(result);
    });

    it('pattern ko', () => {
        let validator = pattern(/^[a-z]+$/);
        let result = validator(1000);
        assert.equal(result, 'Please fix this field.');
    });

    it('pattern ok', () => {
        let validator = pattern(/^[a-z]+$/);
        let result = validator('aaaa');
        assert.isUndefined(result);
    });

    it('custom ko', () => {
        let validator = custom((p) => p === 'a');
        let result = validator('b');
        assert.equal(result, 'Please fix this field.');
    });

    it('custom ok', () => {
        let validator = custom((p) => p === 'a');
        let result = validator('a');
        assert.isUndefined(result);
    });

    it('Should ignore minlength if no value', () => {
        let validator = minlength(3, 'Message');
        let result = validator('');
        assert.isUndefined(result);
    });

    it('Should ignore maxlength if no value', () => {
        let validator = maxlength(3, 'Message');
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
            let validations = [required(), minlength(3), maxlength(10)];
            let result = ValidationHelper.validateValue({}, undefined, validations);
            assert.equal(result, 'This field is required.');
        });

        it('Should required null', () => {
            let validations = [required(), minlength(3), maxlength(10)];
            let result = ValidationHelper.validateValue({}, null, validations);
            assert.equal(result, 'This field is required.');
        });

        it('Should required string empty', () => {
            let validations = [required(), minlength(3), maxlength(10)];
            let result = ValidationHelper.validateValue({}, '', validations);
            assert.equal(result, 'This field is required.');
        });

        it('Should required boolean false', () => {
            let validations = [required(), minlength(3), maxlength(10)];
            let result = ValidationHelper.validateValue({}, false, validations);
            assert.equal(result, 'This field is required.');
        });

        it('Should minlength', () => {
            let validations = [required(), minlength(3), maxlength(10)];
            let result = ValidationHelper.validateValue({}, 'ab', validations);
            assert.equal(result, 'Please enter at least than 3 characters.');
        });

        it('Should pass without required if string empty', () => {
            let validations = [maxlength(30), maxlength(10)];
            let result = ValidationHelper.validateValue({}, '', validations);
            assert.isUndefined(result);
        });

        it('Should pass validation', () => {
            let validations = [required(), minlength(3), maxlength(10)];
            let result = ValidationHelper.validateValue({}, 'its ok', validations);
            assert.isUndefined(result);
        });

        it('Should pattern', () => {
            let validations = [required(), pattern(/^[a-z]+$/)];
            let result = ValidationHelper.validateValue({}, 120, validations);
            assert.equal(result, 'Please fix this field.');
        });

        it('Should pass pattern', () => {
            let validations = [required(), pattern(/^[a-z]+$/)];
            let result = ValidationHelper.validateValue({}, 'thisgood', validations);
            assert.isUndefined(result);
        });


        it('Should validate all', () => {
            let model = {
                firstname: 'Marie',
                lastname: ''
            };

            let v = {
                firstname: [required(), minlength()],
                lastname: [required()]
            };

            let result = ValidationHelper.validateAll(model, v);
            assert.equal('This field is required.', result['lastname']);
            assert.equal(1, ValidationHelper.countErrors(result));
            assert.isTrue(ValidationHelper.hasErrors(result));
        });

        it('Should validate all with multiple errors', () => {
            let model = {
                firstname: 'Ma',
                lastname: ''
            };

            let v = {
                firstname: [required(), minlength()],
                lastname: [required()]
            };

            let result = ValidationHelper.validateAll(model, v);
            assert.equal('Please enter at least than 3 characters.', result['firstname']);
            assert.equal('This field is required.', result['lastname']);
            assert.equal(2, ValidationHelper.countErrors(result));
            assert.isTrue(ValidationHelper.hasErrors(result));
        });

        it('Should validate all with no error', () => {
            let model = {
                firstname: 'Marie',
                lastname: 'Bellin'
            };

            let v = {
                firstname: [required(), minlength()],
                lastname: [required()]
            };

            let result = ValidationHelper.validateAll(model, v);
            assert.equal(0, ValidationHelper.countErrors(result));
            assert.isFalse(ValidationHelper.hasErrors(result));
        });

    });

});
