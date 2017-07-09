import React from 'react';
import { Submit } from 'romagny13-react-form-validation';

const Example1 = () => {
    let errors = { firstname: 'This field is required' };
    return (
        <div>
            <h4>No error</h4>
            <Submit value="Submit" />
            
            <h4>With disabled</h4>
            <Submit value="Submit" disabled />

            <h4>With errors</h4>
            <Submit value="Submit" errors={errors} />
        </div>
    );
}
export default Example1;

