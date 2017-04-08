# React Form Validation v2

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

## imports with es6

Example 

```js
import { Form, FormGroup, Input } from 'romagny13-react-form-validation';
```

## Validators

* required
* minLength
* maxLength
* pattern
* custom

params: message (for personal error message), name (to change name of validator)

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
* FormGroup

Form props | Description
-------- |  --------
mode | submit (by default) or touched
onSubmit | function to call on form submission

... And more (autoComplete for example)

FormGroup props | Description
-------- |  --------
validators | validators array
render | function called to render field
onValidationStateChange | notifcation on validation state change
errors | allow to set errors (object) for example after form submission and server validation error

Allow to bind value (and isolate rendering) and be notified on value change:

* Input
* Checkbox
* CheckboxGroup
* RadioGroup
* Select
* TextArea
* Submit (disabled if form has errors) 

## Example: form with binding and validation

UserForm

```js
import React from 'react';
import { Form, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit } from 'romagny13-react-form-validation';
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
```

render field function example with success and error feedbacks
```js
import React from 'react';

function getGroupClassName(hasError, hasSuccess, className, hasFeedbackClassName, hasErrorClassName, hasSuccessClassName) {
    if (hasError) {
        return className + ' ' + hasFeedbackClassName + ' ' + hasErrorClassName;
    }
    else if (hasSuccess) {
        return className + ' ' + hasFeedbackClassName + ' ' + hasSuccessClassName;
    }
    return className;
}

export const renderField = ({ component, label, hasError, hasSuccess, firstError }) => {
    let groupClassName = getGroupClassName(hasError, hasSuccess, 'form-group', 'has-feedback', 'has-error', 'has-success');
    return (
        <div className={groupClassName}>
            {label}
            {component}
            {hasError && <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" />}
            {hasSuccess && <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" />}
            {hasError && <span className="help-block">{firstError}</span>}
        </div>
    );
};
```


Page with form, validators and model
```js
import React from 'react';
import { required, minLength, maxLength, pattern, custom, isRequired } from 'romagny13-react-form-validation';
import UserForm from './UserForm';

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
        console.log('render HomePage');
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

## es5

Example

```js
var Form = ReactFormValidation.Form;
var FormGroup = ReactFormValidation.FormGroup;
var Input = ReactFormValidation.Input;
var required = ReactFormValidation.required;
var minLength = ReactFormValidation.minLength;

var Home = React.createClass({
    getInitialState: function () {
        return {
            validators: {
                'firstname': [required(), minLength(3)]
            },
            user: {
                firstname: 'Marie'
            }
        };
    },
    renderField: function (infos) {
        var hasError = infos.hasError;
        var groupClassName = hasError ? 'form-group has-error' : 'form-group';
        return (
            <div id="group" className={groupClassName}>
                <label htmlFor="firstname">Firstname:</label>
                <Input id="firstname" name="firstname" value={this.state.user.firstname} className="form-control" focus />
                {hasError && <span className="help-block">{infos.firstError}</span>}
            </div>
        );
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
                <FormGroup validators={this.state.validators['firstname']} render={this.renderField} />
                <input className="btn btn-default" type="submit" value="Submit" />
            </Form>
        );
    }
});

ReactDOM.render(<div className="container"><h2>Form validation with es5</h2><Home /></div>, document.getElementById('app'));
```



