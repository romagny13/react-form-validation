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
    'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],
    'age': [Validator.custom((value) => {
        return value > 0 && value < 120;
    })],
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

Allow to validate value and show error messages:
- Form
- FormGroup 

Allow to bind value and be notified on value change:
- Input
- Checkbox
- CheckboxGroup
- RadioGroup
- Select
- TextArea


## Create a form with binding and validation

Simple component example with validation

```js
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.user = {
            firstname: 'Marie',
            lastname: 'Bellin',
            email: '',
            age: 20,
            list: '2',
            preference: 'b',
            likes: ['Milk', 'Cakes']
        };

        this.validators = {
            'firstname': [Validator.required(), Validator.minLength(3)],
            'lastname': [Validator.maxLength(10)],
            'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],
            'age': [Validator.custom((value) => {
                return value > 0 && value < 120;
            })],
            'agree': [Validator.required()],
            'likes': [Validator.custom(() => {
                return this.user.likes.length > 0;
            }, 'Please select one or more items.')]
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(name, value) {
        if (name === 'agree') {
            console.log('App agree', value);
        }
        else {
            this.user[name] = value;
            console.log('user updated', this.user);
        }
    }

    onSubmit(hasError, formStates) {
        console.log('submitted', hasError, formStates);
        if (!hasError) {
            console.log('save user', this.user);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Form binding and validation</h2>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup className="form-group" validators={this.validators['firstname']}>
                        <label htmlFor="firstname">Firstname:</label>
                        <Input id="firstname" name="firstname" value={this.user.firstname} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['lastname']}>
                        <label htmlFor="lastname">Lastname:</label>
                        <Input id="lastname" name="lastname" value={this.user.lastname} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['email']}>
                        <label htmlFor="email">Email:</label>
                        <Input id="email" name="email" value={this.user.email} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['age']}>
                        <label htmlFor="age">Age:</label>
                        <Input type="number" id="age" name="age" value={this.user.age} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label htmlFor="list">List (no validation):</label>
                        <Select name="list" dataSource={[1, 2, 3]} current={this.user.list} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Preference:</label>
                        <RadioGroup name="preference" dataSource={['a', 'b', 'c']} current={this.user.preference} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['likes']}>
                        <label>Like (one or more items):</label>
                        <CheckboxGroup name="likes" dataSource={['Cakes', 'Milk', 'Nutella']} currents={this.user.likes} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['agree']}>
                        <div className="checkbox">
                            <label>
                                <Checkbox name="agree" onChange={this.onChange} />Agree to conditions
                            </label>
                        </div>
                    </FormGroup>
                    <input className="btn btn-default" type="submit" value="Submit" />
                </Form>
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
    onChange: function (name, value) {
        var user = this.state.user;
        user[name] = value;
        this.setState({
            user: user
        });
    },
    onSubmit: function (hasError, formStates) {
        if (!hasError) {
            console.log('save', this.state.user);
        }
    },
    render() {
        return (
            <Form className="form-group" onSubmit={this.onSubmit}>
                <FormGroup className="form-group" validators={this.state.validators['firstname']}>
                    <label htmlFor="firstname">Firstname:</label>
                    <Input id="firstname" name="firstname" value={this.state.user.firstname} onChange={this.onChange} className="form-control" />
                </FormGroup>
                <input className="btn btn-default" type="submit" value="Submit" />
            </Form>
        );
    }
});

ReactDOM.render(<div className="container"><h2>Form validation with es5</h2><Home /></div>, document.getElementById('app'));
```



