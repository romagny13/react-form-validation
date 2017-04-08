import React from 'react';
import { Form, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit } from '../../../src/index';
import { renderField } from './renderField';

const UserForm = ({ user, validators, onSubmit, errors, onValidationStateChange }) => {
    console.log('render UserForm');
    return (
        <Form onSubmit={onSubmit} mode="touched">
            <FormGroup
                validators={validators['firstname']}
                errors={errors['firstname']}
                render={renderField}
                component={<Input id="firstname" name="firstname" value={user.firstname} className="form-control" focus />}
                label={<label htmlFor="firstname" className="control-label">Firstname:</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                validators={validators['lastname']}
                render={renderField}
                component={<Input id="lastname" name="lastname" value={user.lastname} className="form-control" />}
                label={<label htmlFor="lastname" className="control-label">Lastname:</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                validators={validators['password']}
                render={renderField}
                component={<Input type="password" id="password" name="password" value={user.password} className="form-control" placeholder="Password" />}
                label={<label htmlFor="password" className="control-label">Password:</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                validators={validators['confirmPassword']}
                render={renderField}
                component={<Input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} className="form-control" placeholder="Confirm password" />}
                label={<label htmlFor="confirmPassword" className="control-label">Password:</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                validators={validators['email']}
                render={renderField}
                component={<Input id="email" name="email" value={user.email} className="form-control" placeholder="example@domain.com" />}
                label={<label htmlFor="email" className="control-label">Email:</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                validators={validators['age']}
                render={renderField}
                component={<Input type="number" id="age" name="age" value={user.age} className="form-control" />}
                label={<label htmlFor="age" className="control-label">Age:</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                render={renderField}
                component={<Select name="list" dataSource={[1, 2, 3]} current={user.list} className="form-control" />}
                label={<label htmlFor="list" className="control-label">List (no validation):</label>}
            />
            <FormGroup
                render={renderField}
                component={<RadioGroup name="preference" dataSource={['a', 'b', 'c']} current={user.preference} />}
                label={<label>Preference:</label>}
            />
            <FormGroup
                validators={validators['likes']}
                render={renderField}
                component={<CheckboxGroup name="likes" dataSource={['Cakes', 'Milk', 'Nutella']} currents={user.likes} />}
                label={<label>Like (one or more items):</label>}
                onValidationStateChange={onValidationStateChange}
            />
            <FormGroup
                render={renderField}
                component={<TextArea name="note" value={user.note} className="form-control" rows="5" />}
                label={<label>Note:</label>}
            />
            <FormGroup
                validators={validators['agree']}
                render={renderField}
                component={<div className="checkbox"><label><Checkbox name="agree" />Agree to conditions</label></div>}
                onValidationStateChange={onValidationStateChange}
            />
            <Submit className="btn btn-default" value="Submit" />
        </Form>
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