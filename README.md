# React Form Validation v0.3

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

## imports with es6

Example 

```js
import { Form, FormGroup, Validator, Input } from 'romagny13-react-form-validation';
```

## Validators

* required
* minLength
* maxLength
* pattern
* custom

`params`: message (for personal error message), name (to change name of validator)

... Or create an other validator. Example 'email'

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
        pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')
    ],
    'confirmPassword': [
        required('Please confirm the password.'),
        custom((value) => {
            return this.state.user.password === value;
        }, 'Password and confirm password do not match.')
    ],
    'age': [custom((value) => {
        return value > 0 && value < 120;
    }, 'Oops ??')],
    'agree': [required()],
    'likes': [custom(() => {
        return this.state.user.likes.length > 0;
    }, 'Please select one or more items.')]
};
```

### Model (for binding)

Example

```js
const user = {
    firstname: 'Marie',
    lastname: 'Bellin',
    email: '',
    password: 'Secret',
    age: 20,
    list: '2',
    note: 'My note',
    preference: 'b',
    likes: ['Milk', 'Cakes']
};
```

### Components

Allow to validate value and show error messages (note: css class "has-error" is added on FormGroup on error):

* Form
* Validator

Form props | Description
-------- |  --------
mode | `submit` (by default) or `touched`
onSubmit | function to call on form submission

... And more (autoComplete for example)

Validator props | Description
-------- |  --------
name | the form element's name to validate (required)
validators | validators array (required)
onValidationStateChange | notifcation on validation state change
errors | allow to set errors (object) after server validation error for example

Allow to bind value (and isolate rendering) and be notified on value change:

* Input
* Checkbox
* CheckboxGroup
* RadioGroup
* Select
* TextArea
* Submit (disabled if form has errors) 

And
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
const MyFormGroup = ({ hasError, hasSuccess, firstError, errors, children }) => {
    let groupClassName = hasError ? 'form-group has-error' : 'form-group';
    return (
        <div className={groupClassName}>
            {children}
            {hasError && <span className="help-block">{firstError}</span>}
        </div>
    );
};
```

And render a simple form
```js
const MyForm = () => {
    return (
        <Form>
            <Validator name="firstname" validators={[required()]}>
                <MyFormGroup>
                    <Input name="firstname" value="" />
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
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Validator, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit } from 'romagny13-react-form-validation';

const UserForm = ({ user, validators, onSubmit, errors, onValidationStateChange }) => {
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
```

Page with form, validators and model

```js
import React from 'react';
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

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: 'Marie',
                lastname: 'Bellin',
                password: 'Secret',
                email: '',
                age: 20,
                list: '2',
                note: 'My note',
                preference: 'b',
                likes: ['Milk', 'Cakes']
            },
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
                    custom((value) => {
                        return this.state.user.password === value;
                    }, 'Password and confirm password do not match.')
                ],
                'age': [custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'agree': [required()],
                'likes': [custom(() => {
                    return this.state.user.likes.length > 0;
                }, 'Please select one or more items.')]
            },
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onValidationStateChange = this.onValidationStateChange.bind(this);
    }

    onValidationStateChange({ name, value, hasError, hasSuccess, firstError, errors }) {
        console.log('validation state changed', name, value, hasError, firstError, errors);
    }

    onSubmit({ hasError, formStates, formModel }) {
        if (!hasError) {
            const { firstname, lastname, email, age, note, preference, likes } = formModel;
            const user = { firstname, lastname, email, age, note, preference, likes };
            console.log('save user ...', user);

            // simulate response error from server (example user exists error)
            setTimeout(() => {
                if (user.firstname === 'Marie') {
                    this.setState({
                        errors: {
                            firstname: {
                                custom: 'A user with this name is already registered.'
                            }
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Form binding and validation</h2>
                <UserForm
                    validators={this.state.validators}
                    errors={this.state.errors}
                    user={this.state.user}
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
            {props.hasError && <span className="help-block">{props.firstError}</span>}
        </div>
    );
};

var Home = React.createClass({
    getInitialState: function () {
        return {
            user: {
                firstname: 'Marie'
            }
        };
    },
    onSubmit: function (hasError, formStates, formModel) {
        if (!hasError) {
            var user = {
                firstname: formModel['firstname']
            };
            console.log('save user', user);
        }
    },
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Validator name="firstname" validators={[required(), minLength(3)]}>
                    <MyFormGroup>
                        <label htmlFor="firstname">Firstname:</label>
                        <Input id="firstname" name="firstname" value={this.state.user.firstname} className="form-control" focus />
                    </MyFormGroup>
                </Validator>
                <input className="btn btn-default" type="submit" value="Submit" />
            </Form>
        );
    }
});

ReactDOM.render(<div className="container"><h2>Form validation with es5</h2><Home /></div>, document.getElementById('app'));
```
