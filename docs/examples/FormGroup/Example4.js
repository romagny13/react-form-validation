import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, FontIcon } from 'romagny13-react-form-validation';

const CustomFormGroup = ({ canChangeValidationState, error, children, onValueChange }) => {

    return (
        <FormGroup className={canChangeValidationState ? error ? 'form-group has-error has-feedback' : 'form-group has-success has-feedback' : 'form-group'} 
                   error={error} canChangeValidationState={canChangeValidationState} renderSuccess>
            {children}
            {canChangeValidationState && <FontIcon iconName={error ? "times" : "check"} className="feedback" />}
        </FormGroup>
    );
};
CustomFormGroup.propTypes = {
    children: PropTypes.node,
    canChangeValidationState: PropTypes.bool,
    error: PropTypes.string,
    onValueChange: PropTypes.func
};

/** Create a custom FormGroup (example with feedback) */
const Example4 = () => {
        return (
            <CustomFormGroup renderSuccess canChangeValidationState>
                <Label htmlFor="my-field">Field</Label>
                <Input id="my-field" name="my-field" value="My value"  />
            </CustomFormGroup>
        );
}
export default Example4;

