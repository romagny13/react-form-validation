import React from 'react';
import { FormGroup, Input, Label } from 'romagny13-react-form-validation';

/** Error state*/
const Example2 = () => {
        return (
            <FormGroup error="My error message" canChangeValidationState>
                <Label htmlFor="my-field">Field</Label>
                <Input id="my-field" name="my-field" value="My value"  />
            </FormGroup>
        );
}
export default Example2;

