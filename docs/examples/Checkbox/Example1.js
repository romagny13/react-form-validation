import React from 'react';
import { Checkbox } from 'romagny13-react-form-validation';

const Example1 = () => {
    let values = ['a','c'];
    return (
        <div>
            <h4>Direct check</h4>
            <Checkbox checked name="g1" />

            <h4>Grouped by name (all checked are checked)</h4>
            <Checkbox checked name="g2" />
            <Checkbox checked name="g2" />

            <h4>Checked by value (if values contains control value)</h4>
            <Checkbox name="g3" value="a" checked={values.indexOf("a") !== -1}/>
            <Checkbox name="g3" value="b" checked={values.indexOf("b") !== -1}/>
            <Checkbox name="g3" value="c" checked={values.indexOf("c") !== -1}/>
        </div>

    );
};
export default Example1;

