import { assert } from 'chai';
import { omit } from '../../../src/common/util';

describe('Util', () => {

    it('Should omit', () => {
        let props = {
            a: 'a',
            b: 'b',
            c: 'c'
        };

        let result = omit(props, ['b']);
        assert.deepEqual(result, {
            a: 'a',
            c: 'c'
        });
    });

});