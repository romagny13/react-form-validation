import React from 'react';
import { FormGroup, Input, Label } from 'romagny13-react-form-validation';

/** Normal state*/
const Example1 = () => {
        return (
            <FormGroup>
                <Label htmlFor="my-field">Lastname</Label>
                <Input id="my-field" name="my-field" value="My value"  />
            </FormGroup>
        );
}
export default Example1;

