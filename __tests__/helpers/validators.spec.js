import { required, minlength, maxlength, pattern, email, custom } from '../../src/index';

describe('Validators', () => {

    it('required ko', () => {
        let validator = required();
        let result = validator();
        expect(result).toEqual('This field is required.');
    });

    it('required ok', () => {
        let validator = required();
        let result = validator('ok');
        expect(result).toBeUndefined();
    });

    it('minlength ko', () => {
        let validator = minlength();
        let result = validator('aa');
        expect(result).toEqual('Please enter at least than 3 characters.');
    });

    it('minlength ok', () => {
        let validator = minlength();
        let result = validator('aaaaa');
        expect(result).toBeUndefined();
    });

    it('maxlength ko', () => {
        let validator = maxlength(5);
        let result = validator('aaaaaaaa');
        expect(result).toEqual('Please enter no more than 5 characters.');
    });

    it('maxlength ok', () => {
        let validator = maxlength(5);
        let result = validator('aaa');
        expect(result).toBeUndefined();
    });

    it('pattern ko', () => {
        let validator = pattern(/^[a-z]+$/);
        let result = validator(1000);
        expect(result).toEqual('Please fix this field.');
    });

    it('pattern ok', () => {
        let validator = pattern(/^[a-z]+$/);
        let result = validator('aaaa');
        expect(result).toBeUndefined();
    });

    it('custom ko', () => {
        let validator = custom((p) => p === 'a');
        let result = validator('b');
        expect(result).toEqual('Please fix this field.');
    });

    it('custom ok', () => {
        let validator = custom((p) => p === 'a');
        let result = validator('a');
        expect(result).toBeUndefined();
    });

    it('Should ignore minlength if no value', () => {
        let validator = minlength(3, 'Message');
        let result = validator('');
        expect(result).toBeUndefined();
    });

    it('Should ignore maxlength if no value', () => {
        let validator = maxlength(3, 'Message');
        let result = validator('');
        expect(result).toBeUndefined();
    });

    it('Should ignore pattern if no value', () => {
        let validator = pattern(/^[a-z]+$/, 'Message');
        let result = validator('');
        expect(result).toBeUndefined();
    });

    it('Should ignore custom if no value', () => {
        let validator = custom((p) => p === 'a', 'Message');
        let result = validator('');
        expect(result).toBeUndefined();
    });

});
