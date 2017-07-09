import React from 'react';
import { Radio } from 'romagny13-react-form-validation';

const Example1 = () => {
    let value = 'b';
    return (
        <div>
            <h4>Direct check</h4>
            <Radio checked name="g1" />

            <h4>Grouped by name (the last checked is checked)</h4>
            <Radio checked name="g2" />
            <Radio checked name="g2" />

            <h4>Checked by value (if value === control value)</h4>
            <Radio name="g3" value="a" checked={value === "a"}/>
            <Radio name="g3" value="b" checked={value === "b"}/>
            <Radio name="g3" value="c" checked={value === "c"}/>
        </div>

    );
};
export default Example1;

