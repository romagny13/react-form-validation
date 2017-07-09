import React from 'react';
import { FormGroup, Input, Label } from 'romagny13-react-form-validation';

/** Success state*/
const Example3 = () => {
        return (
            <FormGroup renderSuccess canChangeValidationState>
                <Label htmlFor="my-field">Field</Label>
                <Input id="my-field" name="my-field" value="My value"  />
            </FormGroup>
        );
}
export default Example3;
