import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Validator, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit, custom } from '../../../src/index';

/*
export const MyFormGroup = ({ hasError, hasSuccess, error, label, children }) => {
    let groupClassName = getGroupClassName(hasError, hasSuccess, 'form-group', 'has-feedback', 'has-error', 'has-success');
    return (
        <div className={groupClassName}>
            <label className="col-sm-3 control-label">{label}</label>
            <div className="col-sm-9">
                {children}
                {hasError && <span className="help-block">{error}</span>}
            </div>
        </div>
    );
};
*/

/*class FormGroup extends Component {
    render() {
        let groupClassName = this.props.hasError ? 'form-group has-error' : 'form-group';
        return (
            <div className={groupClassName}>
                {this.props.children}
                {this.props.hasError && <span className="help-block">{this.props.error}</span>}
            </div>
        );
    }
}*/


const UserForm = ({ model, dataSourcePreferences, dataSourceLikes, validators, onSubmit, errors, onValidationStateChange }) => {
    console.log('render UserForm');
    return (
        <Form onSubmit={onSubmit} mode="touched" model={model} autoComplete="off">
            <Validator validators={validators['firstname']} error={errors['firstname']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="firstname" className="control-label">Firstname:</label>
                    <Input id="firstname" name="firstname" value={model.firstname} className="form-control" autoFocus />
                </FormGroup>
            </Validator>
            <Validator validators={validators['lastname']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="lastname" className="control-label">Lastname:</label>
                    <Input id="lastname" name="lastname" value={model.lastname} className="form-control" />
                </FormGroup>
            </Validator>
            <Validator validators={validators['password']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="password" className="control-label">Password:</label>
                    <Input type="password" id="password" name="password" value={model.password} className="form-control" placeholder="Password" />
                </FormGroup>
            </Validator>
            <Validator validators={validators['confirmPassword']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="confirmPassword" className="control-label">Confirm password:</label>
                    <Input type="password" id="confirmPassword" name="confirmPassword" value={model.confirmPassword} className="form-control" placeholder="Confirm password" />
                </FormGroup>
            </Validator>
            <Validator validators={validators['email']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="email" className="control-label">Email:</label>
                    <Input id="email" name="email" value={model.email} className="form-control" placeholder="example@domain.com" />
                </FormGroup>
            </Validator>
            <Validator validators={validators['age']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="age" className="control-label">Age:</label>
                    <Input type="number" id="age" name="age" value={model.age} className="form-control" />
                </FormGroup>
            </Validator>
            <div className="form-group">
                <label htmlFor="list" className="control-label">List (no validation):</label>
                <Select name="list" dataSource={[1, 2, 3]} current={model.list} className="form-control" />
            </div>
            <div className="form-group">
                <label>Preference:</label>
                <RadioGroup name="preference" dataSource={dataSourcePreferences} current={model.preference} />
            </div>
            <Validator validators={validators['likes']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label>Like (one or more items):</label>
                    <CheckboxGroup name="likes" dataSource={dataSourceLikes} currents={model.likes} />
                </FormGroup>
            </Validator>
            <div className="form-group">
                <label>Note:</label>
                <TextArea name="note" value={model.note} className="form-control" rows="5" />
            </div>
            <Validator validators={validators['file']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <Input type="file" id="file" name="file" value={model.file} accept="image/*" />
                </FormGroup>
            </Validator>
            <Validator validators={validators['agree']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <div className="checkbox"><label><Checkbox name="agree" />Agree to conditions</label></div>
                </FormGroup>
            </Validator>
            <Submit className="btn btn-default" value="Submit" />
        </Form >
    );
};
UserForm.propTypes = {
    model: PropTypes.object.isRequired,
    dataSourcePreferences: PropTypes.array.isRequired,
    dataSourceLikes: PropTypes.array.isRequired,
    validators: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onValidationStateChange: PropTypes.func,
    errors: PropTypes.object
};
UserForm.defaultProps = {
    validators: []
};

export default UserForm;

