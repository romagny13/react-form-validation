import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Checkbox, Text, Email, Password, File, Number, RadioGroup, CheckboxGroup, TextArea, Select, Submit, Reset } from '../../../../src/index';

const ControlsForm = ({ model, onSubmit, onReset, onValueChange, errors, submitted, initialState }) => {
    console.log('render form', model);
    return (
        <Form onSubmit={onSubmit}>

            <FormGroup error={errors["firstname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="firstname" className="control-label">Firstname:</label>
                <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
            </FormGroup>

            <FormGroup error={errors["lastname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="lastname" className="control-label">Lastname:</label>
                <Text id="lastname" name="lastname" value={model["lastname"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["password"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="password" className="control-label">Password:</label>
                <Password id="password" name="password" value={model["password"]} onValueChange={onValueChange} className="form-control" placeholder="Password" />
            </FormGroup>

            <FormGroup error={errors["confirmPassword"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="confirmPassword" className="control-label">Confirm password:</label>
                <Password id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={onValueChange} className="form-control" placeholder="Confirm password" />
            </FormGroup>

            <FormGroup error={errors["email"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="email" className="control-label">Email:</label>
                <Email name="email" value={model["email"]} onValueChange={onValueChange} className="form-control" placeholder="example@domain.com" />
            </FormGroup>

            <FormGroup error={errors["age"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="age" className="control-label">Age:</label>
                <Number id="age" name="age" value={model["age"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["file"]} canChangeValidationState={submitted}>
                <File name="file" value={model["file"]} onValueChange={onValueChange} accept="image/*" />
            </FormGroup>

            <FormGroup>
                <label htmlFor="list" className="control-label">List (no validation):</label>
                <Select name="list" dataSource={[1, 2, 3]} value={model['list']} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["preference"]} canChangeValidationState={submitted}>
                <label>Preference:</label>
                <RadioGroup name="preference" dataSource={["a", "b", "c"]} value={model["preference"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup error={errors["likes"]} canChangeValidationState={submitted}>
                <label>Like (multiple choice):</label>
                <CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={model["likes"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup>
                <label>Note:</label>
                <TextArea name="note" value={model["note"]} onValueChange={onValueChange} className="form-control" rows="5" />
            </FormGroup>

            <FormGroup error={errors["agree"]} canChangeValidationState={submitted}>
                <div className="checkbox"><label><Checkbox name="agree" checked={model['agree']} onValueChange={onValueChange} />Agree to conditions</label></div>
            </FormGroup>

            <Submit value="Submit" errors={errors} />

            <Reset value="Reset" initialState={initialState} onReset={onReset} />

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

