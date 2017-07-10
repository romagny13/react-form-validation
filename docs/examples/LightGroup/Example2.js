import React from 'react';
import { LightGroup, Input, Label } from 'romagny13-react-form-validation';

/** Error state*/
const Example2 = () => {
    return (
        <LightGroup error="My error message">
            <Label htmlFor="my-field">Field</Label>
            <Input id="my-field" name="my-field" value="My value" />
        </LightGroup>
    );
}
export default Example2;

