import React from 'react';
import PropTypes from 'prop-types';
import { Form, Validator, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit } from '../../../src/index';

/*function getGroupClassName(hasError, hasSuccess, className, hasFeedbackClassName, hasErrorClassName, hasSuccessClassName) {
    if (hasError) {
        return className + ' ' + hasFeedbackClassName + ' ' + hasErrorClassName;
    }
    else if (hasSuccess) {
        return className + ' ' + hasFeedbackClassName + ' ' + hasSuccessClassName;
    }
    return className;
}

export const FormGroup = ({ hasError, hasSuccess, firstError, children }) => {
    let groupClassName = getGroupClassName(hasError, hasSuccess, 'form-group', 'has-feedback', 'has-error', 'has-success');
    return (
        <div className={groupClassName}>
            {children}
            {hasError && <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" />}
            {hasSuccess && <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" />}
            {hasError && <span className="help-block">{firstError}</span>}
        </div>
    );
};
*/

const UserForm = ({ user, validators, onSubmit, errors, onValidationStateChange }) => {
    console.log('render UserForm');
    return (
        <Form onSubmit={onSubmit} mode="touched">
            <Validator name="firstname" validators={validators['firstname']} errors={errors['firstname']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="firstname" className="control-label" > Firstname:</label>
                    <Input id="firstname" name="firstname" value={user.firstname} className="form-control" focus />
                </FormGroup>
            </Validator>
            <Validator name="lastname" validators={validators['lastname']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="lastname" className="control-label">Lastname:</label>
                    <Input id="lastname" name="lastname" value={user.lastname} className="form-control" />
                </FormGroup>
            </Validator>
            <Validator name="password" validators={validators['password']} onValidationStateChange={onValidationStateChange} >
                <FormGroup>
                    <label htmlFor="password" className="control-label">Password:</label>
                    <Input type="password" id="password" name="password" value={user.password} className="form-control" placeholder="Password" />
                </FormGroup>
            </Validator>
            <Validator name="confirmPassword" validators={validators['confirmPassword']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="confirmPassword" className="control-label">Confirm password:</label>
                    <Input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} className="form-control" placeholder="Confirm password" />
                </FormGroup>
            </Validator>
            <Validator name="email" validators={validators['email']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="email" className="control-label">Email:</label>
                    <Input id="email" name="email" value={user.email} className="form-control" placeholder="example@domain.com" />
                </FormGroup>
            </Validator>
            <Validator name="age" validators={validators['age']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="age" className="control-label">Age:</label>
                    <Input type="number" id="age" name="age" value={user.age} className="form-control" />
                </FormGroup>
            </Validator>
            <div className="form-group">
                <label htmlFor="list" className="control-label">List (no validation):</label>
                <Select name="list" dataSource={[1, 2, 3]} current={user.list} className="form-control" />
            </div>
            <div className="form-group">
                <label>Preference:</label>
                <RadioGroup name="preference" dataSource={['a', 'b', 'c']} current={user.preference} />
            </div>
            <Validator name="likes" validators={validators['likes']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label>Like (one or more items):</label>
                    <CheckboxGroup name="likes" dataSource={['Cakes', 'Milk', 'Nutella']} currents={user.likes} />
                </FormGroup>
            </Validator>
            <div className="form-group">
                <label>Note:</label>
                <TextArea name="note" value={user.note} className="form-control" rows="5" />
            </div>
            <Validator name="agree" validators={validators['agree']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <div className="checkbox"><label><Checkbox name="agree" />Agree to conditions</label></div>
                </FormGroup>
            </Validator>
            <Submit className="btn btn-default" value="Submit" />
        </Form >
    );
};
UserForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    validators: React.PropTypes.object,
    onValidationStateChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    errors: React.PropTypes.object
};
UserForm.defaultProps = {
    validators: []
};

export default UserForm;