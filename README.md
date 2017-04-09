# React Form Validation v0.4

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

## imports with es6

Example 

```js
import { Form, FormGroup, Validator, Input } from 'romagny13-react-form-validation';
```

### Form Model

Create a model with all fields to validate or bind

```js
const model = {
    firstname: 'Marie',
    lastname: 'Bellin',
    password: 'Secret',
    confirmPassword: '',
    email: '',
    age: 20,
    list: '2',
    note: 'My note',
    preference: 'b',
    agree: false,
    likes: ['Milk', 'Cakes']
};
```

## Validators

* required
* minLength
* maxLength
* pattern
* custom

`params`: message (for personal error message), name (to change name of validator)

... We could create our validators. Example 'email'

```js
// isRequired is an utility function
export const email = () => {
    return (value) => {
        if (!isRequired(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return {
                name: 'email',
                error: 'Invalid email address'
            };
        }
    };
};
```

```js
const validators = {
    'firstname': [required(), minLength(3)],
    'lastname': [maxLength(10)],
    'email': [email()],
    'password': [
        required('Please enter a password.'),
        pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter')
    ],
    'confirmPassword': [
        required('Please confirm the password.'),
        custom((value, model) => {
            return model.password === value;
        }, 'Password and confirm password do not match.')
    ],
    'age': [custom((value) => {
        return value > 0 && value < 120;
    }, 'Oops ??')],
    'agree': [required()],
    'likes': [custom((value, model) => {
        return model.likes.length > 0;
    }, 'Please select one or more items.')]
};
```

### Components

Allow to validate value values:

* Form
* Validator

Form props | Description
-------- |  --------
model | form model (required)
mode | `submit` (by default) or `touched`
onSubmit | function to call on form submission

... And more (autoComplete for example)

Validator props | Description
-------- |  --------
validators | validators array (required)
onValidationStateChange | notifcation on validation state change
error | allow to set error (after server validation error for example)

Allow to bind value (and isolate rendering):

* Input
* Checkbox
* CheckboxGroup
* RadioGroup
* Select
* TextArea

And
* Submit (disabled if form has errors) 
* FormGroup a component that append label and feedbacks on error /success

FormGroup props | Description
-------- |  --------
className | `form-group` by default
hasErrorClassName | `has-error` by default
hasSuccessClassName | `has-success` by default
showHasFeedback | `true` by default
showHasSuccess | `true` by default
hasFeedbackClassName | `has-feedback`
hasErrorFeedbackClassName | `glyphicon glyphicon-remove form-control-feedback`
hasSuccessFeedbackClassName | `glyphicon glyphicon-ok form-control-feedback`

We could create our own `FormGroup` or component

Example:
```js
// the component receive the validation states
const MyFormGroup = ({ hasError, hasSuccess, error, children }) => {
    let groupClassName = hasError ? 'form-group has-error' : 'form-group';
    return (
        <div className={groupClassName}>
            {children}
            {hasError && <span className="help-block">{error}</span>}
        </div>
    );
};
```

And render a simple form
```js
const MyForm = ({ model, onSubmit }) => {
    return (
        <Form onSubmit={onSubmit} model={model}>
            <Validator validators={[required()]}>
                <MyFormGroup>
                    <Input name="firstname" value={model.firstname} />
                </MyFormGroup>
            </Validator>
            <Submit value="Submit" />
        </Form>
    );
};
```

## Example: form with binding and validation

Create a form
```js
import React, { Component, PropTypes } from 'react';
import PropTypes from 'prop-types';
import { Form, Validator, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit } from 'romagny13-react-form-validation';

const UserForm = ({ model, dataSourcePreferences, dataSourceLikes, validators, onSubmit, errors, onValidationStateChange }) => {
    return (
        <Form onSubmit={onSubmit} mode="touched" model={model} autoComplete="off">
            <Validator validators={validators['firstname']} error={errors['firstname']} onValidationStateChange={onValidationStateChange}>
                <FormGroup>
                    <label htmlFor="firstname" className="control-label">Firstname:</label>
                    <Input id="firstname" name="firstname" value={model.firstname} className="form-control" focus />
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
```

Page with form, validators and model

```js
import React, { Component, PropTypes } from 'react';
import { required, minLength, maxLength, pattern, custom, isRequired } from 'romagny13-react-form-validation';
import UserForm from './UserForm';

const email = () => {
    return (value) => {
        if (!isRequired(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return {
                name: 'email',
                error: 'Invalid email address'
            };
        }
    };
};

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: 'Marie',
                lastname: 'Bellin',
                password: 'Secret',
                confirmPassword: '',
                email: '',
                age: 20,
                list: '2',
                note: 'My note',
                preference: 'b',
                agree: false,
                likes: ['Milk', 'Cakes']
            },
            dataSourcePreferences: ['a', 'b', 'c'],
            dataSourceLikes: ['Milk', 'Cakes', 'Nutella'],
            validators: {
                'firstname': [required(), minLength(3)],
                'lastname': [maxLength(10)],
                'email': [email()],
                'password': [
                    required('Please enter a password.'),
                    pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter')
                ],
                'confirmPassword': [
                    required('Please confirm the password.'),
                    custom((value, model) => {
                        return model.password === value;
                    }, 'Password and confirm password do not match.')
                ],
                'age': [custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'agree': [required()],
                'likes': [custom((value, model) => {
                    return model.likes.length > 0;
                }, 'Please select one or more items.')]
            },
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onValidationStateChange = this.onValidationStateChange.bind(this);
    }

    onValidationStateChange({ name, value, hasError, hasSuccess, error }) {
        console.log('validation state changed', name, value, hasError, error);
    }

    onSubmit({ hasError, errors, model }) {
        if (!hasError) {
            // simulate a server request
            const { firstname, lastname, email, age, note, preference, likes } = model;
            const user = { firstname, lastname, email, age, note, preference, likes };
            console.log('save user ...', user);

            setTimeout(() => {
                if (user.firstname === 'Marie') {
                    this.setState({
                        errors: {
                            firstname: 'A user with this name is already registered.'
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Form binding and validation</h1>
                <UserForm
                    model={this.state.model}
                    validators={this.state.validators}
                    dataSourcePreferences={this.state.dataSourcePreferences}
                    dataSourceLikes={this.state.dataSourceLikes}
                    errors={this.state.errors}
                    onSubmit={this.onSubmit}
                    onValidationStateChange={this.onValidationStateChange}
                />
            </div>
        );
    }
}

export default HomePage;
```

## Es5 example

```js

var Form = ReactFormValidation.Form;
var Validator = ReactFormValidation.Validator;
var Input = ReactFormValidation.Input;
var required = ReactFormValidation.required;
var minLength = ReactFormValidation.minLength;

var MyFormGroup = function (props) {
    var groupClassName = props.hasError ? 'form-group has-error' : 'form-group';
    return (
        <div className={groupClassName}>
            {props.children}
            {props.hasError && <span className="help-block">{props.error}</span>}
        </div>
    );
};

var Home = React.createClass({
    getInitialState: function () {
        return {
            model: {
                firstname: 'Marie'
            }
        };
    },
    onSubmit: function (result) {
        console.log(result)
        if (!result.hasError) {
            var user = {
                firstname: result.model['firstname']
            };
            console.log('save user', user);
        }
    },
    render() {
        return (
            <Form onSubmit={this.onSubmit} mode="touched" model={this.state.model}>
                <Validator validators={[required(), minLength(3)]}>
                    <MyFormGroup>
                        <label htmlFor="firstname">Firstname:</label>
                        <Input id="firstname" name="firstname" value={this.state.model.firstname} className="form-control" focus />
                    </MyFormGroup>
                </Validator>
                <input className="btn btn-default" type="submit" value="Submit" />
            </Form>
        );
    }
});

ReactDOM.render(<div className="container"><h2>Form validation with es5</h2><Home /></div>, document.getElementById('app'));
```