import React from 'react';
import { LightGroup, Input, Label } from 'romagny13-react-form-validation';

/** Normal state*/
const Example1 = () => {
        return (
            <LightGroup>
                <Label htmlFor="my-field">Field</Label>
                <Input id="my-field" name="my-field" value="My value"  />
            </LightGroup>
        );
}
export default Example1;
