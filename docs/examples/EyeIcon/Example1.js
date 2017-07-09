import React from 'react';
import { EyeIcon } from 'romagny13-react-form-validation';

const Example1 = () => {
    return (
        <div>
            <h4>Normal</h4>
            <EyeIcon />
            
            <h4>Closed</h4>
            <EyeIcon closed />
        </div>
    );
};
export default Example1;
