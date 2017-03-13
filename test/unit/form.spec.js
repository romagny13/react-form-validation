import { assert } from 'chai';
import { validateValue } from '../../src/common/util';
import {
    RequiredValidator,
    MinLengthValidator,
    MaxLengthValidator,
    PatternValidator,
    CustomValidator
} from '../../src/common/validators';

function objLength(obj) {
    return Object.keys(obj).length;
}

function firstError(obj) {
    return obj[Object.keys(obj)[0]];
}

describe('Form', () => {

    describe('Validators', () => {
        it('required ko', () => {
            let validator = new RequiredValidator();
            let result = validator.validate(undefined);
            assert.isFalse(result);
        });

        it('required ok', () => {
            let validator = new RequiredValidator();
            let result = validator.validate('ok');
            assert.isTrue(result);
        });

        it('minlength ko', () => {
            let validator = new MinLengthValidator(3);
            let result = validator.validate('aa');
            assert.isFalse(result);
        });

        it('minlength ok', () => {
            let validator = new MinLengthValidator(3);
            let result = validator.validate('aaaa');
            assert.isTrue(result);
        });

        it('maxlength ko', () => {
            let validator = new MaxLengthValidator(5);
            let result = validator.validate('aaaaaaaa');
            assert.isFalse(result);
        });

        it('maxlength ok', () => {
            let validator = new MaxLengthValidator(5);
            let result = validator.validate('aaa');
            assert.isTrue(result);
        });

        it('pattern ko', () => {
            let validator = new PatternValidator(/^[a-z]+$/);
            let result = validator.validate(1000);
            assert.isFalse(result);
        });

        it('pattern ok', () => {
            let validator = new PatternValidator(/^[a-z]+$/);
            let result = validator.validate('aaaa');
            assert.isTrue(result);
        });

        it('Should set default name', () => {
            let validator = new CustomValidator(() => {
                return true;
            });
            assert.equal(validator.name, 'custom');
        });

        it('Should set name', () => {
            let validator = new CustomValidator(() => {
                return true;
            }, 'Message', 'Name');
            assert.equal(validator.name, 'Name');
        });

        it('custom ko', () => {
            let validator = new CustomValidator((p) => {
                return p === 'a'; // ok if p === 'a'
            });
            let result = validator.validate('b');
            assert.isFalse(result);
        });

        it('custom ok', () => {
            let validator = new CustomValidator((p) => {
                return p === 'a';
            });
            let result = validator.validate('a');
            assert.isTrue(result);
        });
    });

    describe('FormElements', () => {
        it('Should required undefined', () => {
            let validators = [new RequiredValidator(), new MinLengthValidator(3), new MaxLengthValidator(10)];
            let result = validateValue(undefined, validators);
            assert.isTrue(result.hasError);
            assert.equal(firstError(result.errors), 'This field is required.');
        });

        it('Should required null', () => {
            let validators = [new RequiredValidator(), new MinLengthValidator(3), new MaxLengthValidator(10)];
            let result = validateValue(null, validators);
            assert.isTrue(result.hasError);
            assert.equal(firstError(result.errors), 'This field is required.');
        });

        it('Should required string empty', () => {
            let validators = [new RequiredValidator(), new MinLengthValidator(3), new MaxLengthValidator(10)];
            let result = validateValue('', validators);
            assert.isTrue(result.hasError);
            assert.equal(firstError(result.errors), 'This field is required.');
        });

        it('Should required boolean false', () => {
            let validators = [new RequiredValidator(), new MinLengthValidator(3), new MaxLengthValidator(10)];
            let result = validateValue(false, validators);
            assert.isTrue(result.hasError);
            assert.equal(firstError(result.errors), 'This field is required.');
        });

        it('Should minlength', () => {
            let validators = [new RequiredValidator(), new MinLengthValidator(3), new MaxLengthValidator(10)];
            let result = validateValue('ab', validators);
            assert.equal(objLength(result.errors), 1);
            assert.equal(firstError(result.errors), 'Please enter at least than 3 characters.');
        });

        it('Should pass without required if string empty', () => {
            let validators = [new MaxLengthValidator(30), new MaxLengthValidator(10)];
            let result = validateValue('', validators);
            assert.equal(objLength(result.errors), 0);
        });

        it('Should pass validation', () => {
            let validators = [new RequiredValidator(), new MinLengthValidator(3), new MaxLengthValidator(10)];
            let result = validateValue('its ok', validators);
            assert.equal(objLength(result.errors), 0);
        });

        it('Should pattern', () => {
            let validators = [new RequiredValidator(), new PatternValidator(/^[a-z]+$/)];
            let result = validateValue(120, validators);
            assert.equal(objLength(result.errors), 1);
            assert.equal(firstError(result.errors), 'Please fix this field.');
        });

        it('Should pass pattern', () => {
            let validators = [new RequiredValidator(), new PatternValidator(/^[a-z]+$/)];
            let result = validateValue('thisgood', validators);
            assert.equal(objLength(result.errors), 0);
        });

    });

});
