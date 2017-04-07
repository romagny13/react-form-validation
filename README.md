# React Form Validation

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

## imports with es6

Example 

```js
import { Validator, Form, FormGroup, Input } from 'romagny13-react-form-validation';
```

## Validators

params: message (for personal error message), name (to change name of validator)

* required
* minLength
* maxLength
* pattern
* custom

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
    'age': [custom((value) => {
        return value > 0 && value < 120;
    }, 'Oops ??')],
    'agree': [required()],
    'likes': [custom(() => {
        return this.state.user.likes.length > 0;
    }, 'Please select one or more items.')]
};
```

### Model

Example

```js
const user = {
    firstname: 'Marie',
    lastname: 'Bellin',
    email: '',
    age: 20,
    list: '2',
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
mode | submit (by default, validate form elements after the first submission) or touched (validate form elements on lost focus the first time)
onSubmit | function to call on form submission (with hasError, form states and form model)
hasErrorClassName | error className ('has-error' by default)
hasSuccessClassName | success className ('has-success' by default)
showHasSuccess | (false by default) add has success className on success

... And more (autoComplete for example)

FormGroup props | Description
-------- |  --------
validators | validators array
onChange | function to call on validation state change (with form element name, value, hasError, firstError, errors)
className | base className to add to form group ('form-group' for example)


Allow to bind value (and isolate rendering) and be notified on value change:

* Input
* Checkbox
* CheckboxGroup
* RadioGroup
* Select
* TextArea

## Create a form with binding and validation

UserForm

```js
const UserForm = ({ user, validators, onSubmit, hasError, onValidationStateChange }) => {
    console.log('render UserForm');
    return (
        <Form onSubmit={onSubmit} mode="touched">
            <FormGroup className="form-group" validators={validators['firstname']} onChange={onValidationStateChange}>
                <label htmlFor="firstname">Firstname:</label>
                <Input id="firstname" name="firstname" value={user.firstname} className="form-control" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['lastname']} onChange={onValidationStateChange}>
                <label htmlFor="lastname">Lastname:</label>
                <Input id="lastname" name="lastname" value={user.lastname} className="form-control" />
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
                'age': [custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'agree': [required()],
                'likes': [custom(() => {
                    return this.state.user.likes.length > 0;
                }, 'Please select one or more items.')]
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValidationStateChange(name, value, hasError, firstError, errors) {
        console.log('validation state changed', name, value, hasError, firstError, errors);
    }

    onSubmit(hasError, formStates, formModel) {
        if (!hasError) {
            const { firstname, lastname, email, age, note, preference, likes } = formModel;
            const user = { firstname, lastname, email, age, note, preference, likes };
            console.log('save user ...', user);
        }
    }

    render() {
        console.log('render HomePage');
        return (
            <div className="container">
                <h2>Form binding and validation</h2>
                <UserForm
                    user={this.state.user}
                    validators={this.state.validators}
                    onSubmit={this.onSubmit}
                    hasError={this.state.hasError}
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
    onSubmit: function (hasError, formStates, formModel) {
          if (!hasError) {
              var user = {
                  firstname:formModel['firstname']
              };
              console.log('save user ...', user);
          }
    },
    render() {
        return (
            <Form className="form-group" onSubmit={this.onSubmit}>
                <FormGroup className="form-group" validators={this.state.validators['firstname']}>
                    <label htmlFor="firstname">Firstname:</label>
                    <Input id="firstname" name="firstname" value={this.state.user.firstname}  className="form-control" />
                </FormGroup>
                <input className="btn btn-default" type="submit" value="Submit" />
            </Form>
        );
    }
});

ReactDOM.render(<div className="container"><h2>Form validation with es5</h2><Home /></div>, document.getElementById('app'));
```



