import React from 'react';
import { Form, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea } from '../../../src/index';

const UserForm = ({ user, validators, onSubmit, hasError, onValidationStateChange }) => {
    console.log('render UserForm');
    return (
        <Form onSubmit={onSubmit} mode="touched" showHasSuccess>
            <FormGroup className="form-group" validators={validators['firstname']} onChange={onValidationStateChange}>
                <label htmlFor="firstname">Firstname:</label>
                <Input id="firstname" name="firstname" value={user.firstname} className="form-control" focus />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['lastname']} onChange={onValidationStateChange}>
                <label htmlFor="lastname">Lastname:</label>
                <Input id="lastname" name="lastname" value={user.lastname} className="form-control" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['password']} onChange={onValidationStateChange}>
                <label htmlFor="password">Password:</label>
                <Input type="password" id="password" name="password" value={user.password} className="form-control" placeholder="Password" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['confirmPassword']} onChange={onValidationStateChange}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm password" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['email']} onChange={onValidationStateChange}>
                <label htmlFor="email">Email:</label>
                <Input id="email" name="email" value={user.email} className="form-control" placeholder="example@domain.com" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['age']} onChange={onValidationStateChange}>
                <label htmlFor="age">Age:</label>
                <Input type="number" id="age" name="age" value={user.age} className="form-control" />
            </FormGroup>
            <FormGroup className="form-group">
                <label htmlFor="list">List (no validation):</label>
                <Select name="list" dataSource={[1, 2, 3]} current={user.list} className="form-control" />
            </FormGroup>
            <fieldset>
                <legend>Titre</legend>
                <FormGroup className="form-group">
                    <label>Preference:</label>
                    <RadioGroup name="preference" dataSource={['a', 'b', 'c']} current={user.preference} />
                </FormGroup>
            </fieldset>
            <FormGroup className="form-group" validators={validators['likes']} onChange={onValidationStateChange}>
                <label>Like (one or more items):</label>
                <CheckboxGroup name="likes" dataSource={['Cakes', 'Milk', 'Nutella']} currents={user.likes} />
            </FormGroup>
            <FormGroup className="form-group">
                <label>Note:</label>
                <TextArea name="note" value={user.note} className="form-control" rows="5" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['agree']} onChange={onValidationStateChange}>
                <div className="checkbox">
                    <label>
                        <Checkbox name="agree" />Agree to conditions
                            </label>
                </div>
            </FormGroup>
            <input className="btn btn-default" disabled={hasError} type="submit" value="Submit" />
        </Form>
    );
};
UserForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    validators: React.PropTypes.object,
    hasError: React.PropTypes.bool,
    onValidationStateChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func
};
UserForm.defaultProps = {
    validators: []
};

export default UserForm;