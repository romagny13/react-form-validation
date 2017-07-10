import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    FormGroup,
    Label,
    ErrorBlock,
    Input,
    FontIcon,
    Checkbox,
    Password,
    RadioGroup,
    CheckboxGroup,
    TextArea,
    Select,
    Submit,
    Reset
} from '../../../../src/index';

const CustomForm = ({ model, onSubmit, onReset, onValueChange, errors, submitted, initialState }) => {
    console.log('render form', model);
    return (
        <div className="custom-form well bs-component">
            <Form onSubmit={onSubmit} className="form-horizontal">

                <fieldset>
                    <legend>Legend</legend>

                    <FormGroup error={errors["email"]} canChangeValidationState={submitted} renderSuccess>
                        <Label htmlFor="email" className="col-lg-2 control-Label">Email</Label>
                        <div className="col-lg-10">
                            <Input id="email" name="email" value={model["email"]} onValueChange={onValueChange} placeholder="Email" className="form-control" />
                        </div>
                    </FormGroup>

                    <FormGroup error={errors["password"]} canChangeValidationState={submitted} renderSuccess>
                        <Label htmlFor="password" className="col-lg-2 control-Label">Password</Label>
                        <div className="col-lg-10">
                            <Password id="password" name="password" value={model["password"]} onValueChange={onValueChange} placeholder="Password" className="form-control" />
                        </div>
                    </FormGroup>

                    <FormGroup error={errors["note"]} canChangeValidationState={submitted} renderSuccess>
                        <Label htmlFor="note" className="col-lg-2 control-Label">Textarea</Label>
                        <div className="col-lg-10">
                            <TextArea id="note" name="note" value={model["note"]} onValueChange={onValueChange} rows="3" className="form-control" />
                            <span className="help-block">A block of help text.</span>
                        </div>
                    </FormGroup>

                    <FormGroup error={errors["likes"]} canChangeValidationState={submitted}>
                        <Label htmlFor="likes" className="col-lg-2 control-Label">Select multiple</Label>
                        <div className="col-lg-10">
                            <Select id="likes" name="likes" multiple dataSource={["Milk", "Cakes", "Nutella"]} values={model["likes"]} onValueChange={onValueChange} className="form-control" />
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div className="col-lg-10 col-lg-offset-2">
                            <Reset value="Reset" initialState={initialState} onReset={onReset} className="btn btn-default" />
                            <Submit value="Submit" errors={errors} className="btn btn-primary" />
                        </div>
                    </FormGroup>
                </fieldset>

                <hr />
                <pre>
                    {JSON.stringify(model)}
                </pre>
                <hr />
                <pre>
                    {JSON.stringify(errors)}
                </pre>
            </Form >
        </div>
    );
};
CustomForm.propTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
    initialState: PropTypes.object.isRequired
};

export default CustomForm;

