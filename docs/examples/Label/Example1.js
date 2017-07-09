import React from 'react';
import { Label } from 'romagny13-react-form-validation';


const Example1 = () => {
        return (
                <div>
                        <h4>Normal</h4>
                        <Label>My label</Label>

                        <h4>With asterisk</h4>
                        <Label asterisk>My label</Label>

                        <h4>With asterisk color</h4>
                        <Label asterisk asteriskColor="green">My label</Label>
                </div>

        );
};
export default Example1;

