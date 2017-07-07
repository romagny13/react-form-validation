import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    CompleteFormGroup,
    FormGroup,
    Label,
    Text,
    Checkbox,
    Email,
    Password,
    File,
    Number,
    RadioGroup,
    CheckboxGroup,
    TextArea,
    Select,
    Submit,
    Reset
} from '../../../../src/index';

const ControlsForm = ({ model, onSubmit, onReset, onValueChange, errors, submitted, initialState }) => {
    console.log('render form', model);
    return (
        <Form onSubmit={onSubmit}>

            <CompleteFormGroup error={errors["firstname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <Label htmlFor="firstname" className="control-label" asterisk>Firstname</Label>
                <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
            </CompleteFormGroup>

            <CompleteFormGroup error={errors["lastname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <Label htmlFor="lastname" className="control-label">Lastname</Label>
                <Text id="lastname" name="lastname" value={model["lastname"]} onValueChange={onValueChange} className="form-control" />
            </CompleteFormGroup>

            <CompleteFormGroup error={errors["password"]} canChangeValidationState={submitted} renderSuccess>
                <Label htmlFor="password" className="control-label" asterisk>Password</Label>
                <Password id="password" name="password" value={model["password"]} onValueChange={onValueChange} className="form-control" placeholder="Password" />
            </CompleteFormGroup>

            <CompleteFormGroup error={errors["confirmPassword"]} canChangeValidationState={submitted} renderSuccess>
                <Label htmlFor="confirmPassword" className="control-label" asterisk>Confirm password</Label>
                <Password id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={onValueChange} className="form-control" placeholder="Confirm password" />
            </CompleteFormGroup>

            <CompleteFormGroup error={errors["email"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <Label htmlFor="email" className="control-label">Email</Label>
                <Email name="email" value={model["email"]} onValueChange={onValueChange} className="form-control" placeholder="example@domain.com" />
            </CompleteFormGroup>

            <CompleteFormGroup error={errors["age"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <Label htmlFor="age" className="control-label" asterisk>Age</Label>
                <Number id="age" name="age" value={model["age"]} onValueChange={onValueChange} className="form-control" />
            </CompleteFormGroup>

            <FormGroup error={errors["file"]} canChangeValidationState={submitted}>
                <Label htmlFor="file" className="control-label" asterisk>File</Label>
                <File name="file" value={model["file"]} onValueChange={onValueChange} accept="image/*" />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="list" className="control-label">List (no validation)</Label>
                <Select name="list" dataSource={[1, 2, 3]} value={model['list']} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["preference"]} canChangeValidationState={submitted}>
                <Label>Preference</Label>
                <RadioGroup name="preference" dataSource={["a", "b", "c"]} value={model["preference"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup error={errors["likes"]} canChangeValidationState={submitted}>
                <Label asterisk>Like (multiple choice)</Label>
                <CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={model["likes"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup>
                <Label>Note</Label>
                <TextArea name="note" value={model["note"]} onValueChange={onValueChange} className="form-control" rows="5" />
            </FormGroup>

            <FormGroup error={errors["agree"]} canChangeValidationState={submitted}>
                <div className="checkbox"><Label asterisk><Checkbox name="agree" checked={model['agree']} onValueChange={onValueChange} />Agree to conditions</Label></div>
            </FormGroup>

            <Submit value="Submit" errors={errors} className="btn btn-default" />

            <Reset value="Reset" initialState={initialState} onReset={onReset} className="btn btn-warning" />

            <hr />
            <pre>
                {JSON.stringify(model)}
            </pre>
            <hr />
            <pre>
                {JSON.stringify(errors)}
            </pre>
        </Form >
    );
};
ControlsForm.propTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
    initialState: PropTypes.object.isRequired
};

export default ControlsForm;

