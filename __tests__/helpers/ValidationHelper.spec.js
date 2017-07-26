import { ValidationHelper, required, minlength, maxlength, pattern, email, custom } from '../../src/index';

function objLength(obj) {
    return Object.keys(obj).length;
}

function firstError(obj) {
    return obj[Object.keys(obj)[0]];
}

describe('ValidationHelper', () => {

    it('Should required undefined', () => {
        let validators = [required(), minlength(3), maxlength(10)];
        let result = ValidationHelper.validateValue({}, undefined, validators);
        expect(result).toEqual('This field is required.');
    });

    it('Should required null', () => {
        let validators = [required(), minlength(3), maxlength(10)];
        let result = ValidationHelper.validateValue({}, null, validators);
        expect(result).toEqual('This field is required.');
    });

    it('Should required string empty', () => {
        let validators = [required(), minlength(3), maxlength(10)];
        let result = ValidationHelper.validateValue({}, '', validators);
        expect(result).toEqual('This field is required.');
    });

    it('Should required boolean false', () => {
        let validators = [required(), minlength(3), maxlength(10)];
        let result = ValidationHelper.validateValue({}, false, validators);
        expect(result).toEqual('This field is required.');
    });

    it('Should minlength', () => {
        let validators = [required(), minlength(3), maxlength(10)];
        let result = ValidationHelper.validateValue({}, 'ab', validators);
        expect(result).toEqual('Please enter at least than 3 characters.');
    });

    it('Should pass without required if string empty', () => {
        let validators = [maxlength(30), maxlength(10)];
        let result = ValidationHelper.validateValue({}, '', validators);
        expect(result).toBeUndefined();
    });

    it('Should pass validation', () => {
        let validators = [required(), minlength(3), maxlength(10)];
        let result = ValidationHelper.validateValue({}, 'its ok', validators);
        expect(result).toBeUndefined();
    });

    it('Should pattern', () => {
        let validators = [required(), pattern(/^[a-z]+$/)];
        let result = ValidationHelper.validateValue({}, 120, validators);
        expect(result).toEqual('Please fix this field.');
    });

    it('Should pass pattern', () => {
        let validators = [required(), pattern(/^[a-z]+$/)];
        let result = ValidationHelper.validateValue({}, 'thisgood', validators);
        expect(result).toBeUndefined();
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
        expect(result['lastname']).toEqual('This field is required.');
        expect(ValidationHelper.countErrors(result)).toEqual(1);
        expect(ValidationHelper.hasErrors(result)).toBeTruthy();
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
        expect(result['firstname']).toEqual('Please enter at least than 3 characters.');
        expect(result['lastname']).toEqual('This field is required.');
        expect(ValidationHelper.countErrors(result)).toEqual(2);
        expect(ValidationHelper.hasErrors(result)).toBeTruthy();
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
        expect(ValidationHelper.countErrors(result)).toEqual(0);
        expect(ValidationHelper.hasErrors(result)).toBeFalsy();
    });

});
