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

- required
- minLength
- maxLength
- pattern
- custom

```js
const validators = {
    'firstname': [Validator.required(), Validator.minLength(3)],
    'lastname': [Validator.maxLength(10)],
    'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email.')],
    'age': [Validator.custom((value) => {
        return value > 0 && value < 120;
    }, 'Oops ??')],
    'agree': [Validator.required()],
    'likes': [Validator.custom(() => {
        return this.user.likes.length > 0;
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
- Form
- FormGroup 


Allow to bind value (and isolate rendering) and be notified on value change:
- Input
- Checkbox
- CheckboxGroup
- RadioGroup
- Select
- TextArea


## Create a form with binding and validation

UserForm

```js
import React from 'react';
import { Form, FormGroup, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea } from 'romagny13-react-form-validation';

const UserForm = ({ user, validators, onSubmit }) => {
    console.log('render UserForm');
    return (
        <Form onSubmit={onSubmit} id="myform">
            <FormGroup className="form-group" validators={validators['firstname']}>
                <label htmlFor="firstname">Firstname:</label>
                <Input id="firstname" name="firstname" value={user.firstname}  className="form-control" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['lastname']}>
                <label htmlFor="lastname">Lastname:</label>
                <Input id="lastname" name="lastname" value={user.lastname}  className="form-control" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['email']}>
                <label htmlFor="email">Email:</label>
                <Input id="email" name="email" value={user.email}  className="form-control" placeholder="example@domain.com" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['age']}>
                <label htmlFor="age">Age:</label>
                <Input type="number" id="age" name="age" value={user.age}  className="form-control" />
            </FormGroup>
            <FormGroup className="form-group">
                <label htmlFor="list">List (no validation):</label>
                <Select name="list" dataSource={[1, 2, 3]} current={user.list}  className="form-control" />
            </FormGroup>
            <fieldset>
                <legend>Titre</legend>
                <FormGroup className="form-group">
                    <label>Preference:</label>
                    <RadioGroup name="preference" dataSource={['a', 'b', 'c']} current={user.preference}  />
                </FormGroup>
            </fieldset>
            <FormGroup className="form-group" validators={validators['likes']}>
                <label>Like (one or more items):</label>
                <CheckboxGroup name="likes" dataSource={['Cakes', 'Milk', 'Nutella']} currents={user.likes}  />
            </FormGroup>
            <FormGroup className="form-group">
                <label>Note:</label>
                <TextArea name="note" value={user.note} className="form-control" rows="5" />
            </FormGroup>
            <FormGroup className="form-group" validators={validators['agree']}>
                <div className="checkbox">
                    <label>
                        <Checkbox name="agree"  />Agree to conditions
                            </label>
                </div>
            </FormGroup>
            <input className="btn btn-default" type="submit" value="Submit" />
        </Form>
    );
};
UserForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    validators: React.PropTypes.object,
    onChange: React.PropTypes.func,
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
import { Validator } from 'romagny13-react-form-validation';
import UserForm from './UserForm';

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
                note:'My note',
                preference: 'b',
                likes: ['Milk', 'Cakes']
            },
            validators: {
                'firstname': [Validator.required(), Validator.minLength(3)],
                'lastname': [Validator.maxLength(10)],
                'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email.')],
                'age': [Validator.custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'agree': [Validator.required()],
                'likes': [Validator.custom(() => {
                    return this.state.user.likes.length > 0;
                }, 'Please select one or more items.')]
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(hasError, formStates, formModel) {
        let { firstname, lastname, email, age, note, likes } = formModel;
        let user = { firstname, lastname, email, age, note, likes };

        if (!hasError) {
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
var Validator = ReactFormValidation.Validator;

var Home = React.createClass({
    getInitialState: function () {
        return {
            validators: {
                'firstname': [Validator.required(), Validator.minLength(3)]
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



