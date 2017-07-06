import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    FormGroup,
    Input,
    Checkbox,
    Color,
    Text,
    Email,
    Search,
    Password,
    File,
    Number,
    Range,
    RadioGroup,
    CheckboxGroup,
    TextArea,
    Select,
    Submit,
    Reset
} from '../../../../src/index';

const AllForm = ({ model, onSubmit, onReset, onValueChange, errors, submitted, initialState }) => {
    return (
        <Form onSubmit={onSubmit}>

            <FormGroup error={errors["text"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="text" className="control-label">Text:</label>
                <Text id="text" name="text" value={model["text"]} onValueChange={onValueChange} className="form-control" autoFocus/>
            </FormGroup>

            <FormGroup error={errors["email"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="email" className="control-label">Email:</label>
                <Email id="email" name="email" value={model["email"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["password"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="password" className="control-label">Password:</label>
                <Password id="password" name="password" value={model["password"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["confirmPassword"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="confirmPassword" className="control-label">Confirm password:</label>
                <Password id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={onValueChange} className="form-control" placeholder="Confirm password" />
            </FormGroup>

            <FormGroup error={errors["search"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="search" className="control-label">Search:</label>
                <Search id="search" name="search" value={model["search"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["file"]} canChangeValidationState={submitted}>
                <label htmlFor="file" className="control-label">File:</label>
                <File id="file" name="file" value={model["file"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup error={errors["color"]} canChangeValidationState={submitted}>
                <label htmlFor="color" className="control-label">Color:</label><br />
                <Color id="color" name="color" value={model["color"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup error={errors["date"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="date" className="control-label">Date:</label>
                <Input type="date" id="date" name="date" value={model["date"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["month"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="month" className="control-label">Month:</label>
                <Input type="month" id="month" name="month" value={model["month"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["time"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="time" className="control-label">Time:</label>
                <Input type="time" id="time" name="time" value={model["time"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["week"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="week" className="control-label">Week:</label>
                <Input type="week" id="week" name="week" value={model["week"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["tel"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="tel" className="control-label">Tel:</label>
                <Input type="tel" id="tel" name="tel" value={model["tel"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["url"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="url" className="control-label">Url:</label>
                <Input type="url" id="url" name="url" value={model["url"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["number"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="number" className="control-label">Number:</label>
                <Number id="number" name="number" value={model["number"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["range"]} canChangeValidationState={submitted} renderSuccess>
                <label htmlFor="range" className="control-label">Range:</label>
                <Range id="range" name="range" value={model["range"]} onValueChange={onValueChange} className="form-control" />
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
        </Form>
    );
};
AllForm.propTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
    initialState: PropTypes.object.isRequired
};

export default AllForm;

