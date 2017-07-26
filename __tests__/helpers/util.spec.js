import { omit, extend, clone } from '../../src/index';

describe('util', () => {

    it('should omit', () => {
        let source = { 'a': 'value a', 'b': 'value b', 'c': 'value c', 'd': 'value d', 'e': 'value e' };
        let result = omit(source, ['b', 'd']);
        expect(result).toEqual({ 'a': 'value a', 'c': 'value c', 'e': 'value e' });
    });

    it('should not omit with no omitted value', () => {
        let source = { 'a': 'value a', 'b': 'value b', 'c': 'value c', 'd': 'value d', 'e': 'value e' };
        let result = omit(source);
        expect(result).toEqual(source);
    });

    it('should extend', () => {
        let source = { 'a': 'source value a' };
        let target = { 'b': 'target value b', 'c': 'target value c' };
        let result = extend(source, target);
        expect(result).toEqual({ 'a': 'source value a', 'b': 'target value b', 'c': 'target value c' });
    });

    it('should not replace target existing value with extend', () => {
        let source = { 'a': 'source value a', 'b': 'source value b' };
        let target = { 'b': 'target value b', 'c': 'target value c' };
        let result = extend(source, target);
        expect(result).toEqual({ 'a': 'source value a', 'b': 'target value b', 'c': 'target value c' });
    });

    it('should extend object', () => {
        let source = { myObj: { name: 'my name' } };
        let target = {};
        let result = extend(source, target);
        expect(result).toEqual({ myObj: { name: 'my name' } });

        source.myObj.name = 'new name';
        expect(source).toEqual({ myObj: { name: 'new name' } });
        expect(result).toEqual({ myObj: { name: 'my name' } });
    });

    it('should extend array', () => {
        let source = { myArray: ['a', 'b'] };
        let target = {};
        let result = extend(source, target);
        expect(result).toEqual({ myArray: ['a', 'b'] });

        source.myArray.push('c');
        expect(source).toEqual({ myArray: ['a', 'b', 'c'] });
        expect(result).toEqual({ myArray: ['a', 'b'] });
    });


    it('should clone object and not update clone on source changes', () => {
        let source = { name: 'my name', myObj: { name: 'my obj name' }, myArray: ['a', 'b'] };
        let result = clone(source);
        expect(result).toEqual({ name: 'my name', myObj: { name: 'my obj name' }, myArray: ['a', 'b'] });

        source.name = 'my new name';
        source.myObj.name = 'new obj name';
        source.myArray.push('c');

        expect(source).toEqual({ name: 'my new name', myObj: { name: 'new obj name' }, myArray: ['a', 'b', 'c'] });
        expect(result).toEqual({ name: 'my name', myObj: { name: 'my obj name' }, myArray: ['a', 'b'] });
    });
});
