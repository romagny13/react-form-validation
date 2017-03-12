# React form validation

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

## Validators

- required
- minLength
- maxLength
- pattern
- custom

## form config

create a form config with validators 

```js
let formConfig = {
    'firstname': [Validator.required(), Validator.minLength(3)],
    'lastname': [Validator.maxLength(10)],
    'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],
    'age': [Validator.custom((value) => {
        return value > 0 && value < 120;
    })], 
    'agree': [Validator.required()],
    'likes': [Validator.custom(() => {
        return this.state.user.likes.length > 0;
    }, 'oneOrMore')] // custom validator named 'oneOrMore'
};
```

### model and form elements

formConfig =  model + form elements (element without model property)

Example
```js
// model
let user = {
    firstname: 'Marie',
    lastname: 'Bellin',
    email: '',
    age: 20,
    list: '2',
    preference: 'b',
    likes: ['Milk', 'Cakes']
};

// form elements
let formElements = {
    agree: false
};
```

## create initial state

```js
let formStates = getInitialFormState(formConfig);
this.state = {
    formConfig,
    user,
    formElements,
    formStates,
    hasError: false
};
```

### formStates

Example
```js
this.state.formStates.firstname.hasError
this.state.formStates.firstname.errors.required
```

With a named custom validator :

```js
this.state.formStates.likes.errors.onOreMore
```

## create a form with binding and validation

Simple component example with validation

```js
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        // form config (= model + form elements)
        let formConfig = {
            'firstname': [Validator.required(), Validator.minLength(3)],
            'agree': [Validator.required()]
        };

        // model
        let user = {
            firstname: 'Marie'
        };

        // form elements
        let formElements = {
            agree: false
        };

        // form states (errors)
        let formStates = getInitialFormState(formConfig);
        this.state = {
            formConfig,
            user,
            formElements,
            formStates,
            hasError: false
        };

        this.onChange = this.onChange.bind(this);
        this.onFormElementChange = this.onFormElementChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        let name = event.target.name;
        let value = getElementValue(event.target);
        let user = this.state.user;

        user[name] = value;
        this.setState({
            user
        });
    }

    onFormElementChange(event) {
        let name = event.target.name;
        let value = getElementValue(event.target);
        let formElements = this.state.formElements;

        formElements[name] = value;
        this.setState({
            formElements
        });
    }

    onStateChange(hasError, formStates) {
        this.setState({
            hasError,
            formStates
        });
    }

    onSubmit(hasError, formStates) {
        if (!hasError) {
            console.log('save', this.state.user);
        }
        else {
            this.setState({
                hasError,
                formStates
            });
        }
    }

    render() {
        // with bootstrap
        let groupFirstnameClassName = this.state.formStates.firstname.hasError ? 'form-group has-error' : 'form-group';
        let groupAgreeClassName = this.state.formStates.agree.hasError ? 'form-group has-error' : 'form-group';

        return (
            <FormComponent formConfig={this.state.formConfig} onStateChange={this.onStateChange} onSubmit={this.onSubmit}>
                <div className={groupFirstnameClassName}>
                    <label htmlFor="firstname">Firstname:</label>
                    <input type="text" id="firstname" name="firstname" value={this.state.user.firstname} onChange={this.onChange} className="form-control" />
                    {this.state.formStates.firstname.errors.required ? (
                        <span className="help-block">This field is required</span>
                    ) : null}
                    {this.state.formStates.firstname.errors.minLength ? (
                        <span className="help-block">Please enter at least than 3 characters.</span>
                    ) : null}
                </div >
                <div className={groupAgreeClassName}>
                    <div className="checkbox"> <label><input type="checkbox" name="agree" checked={this.state.formElements.agree === true} onChange={this.onFormElementChange} />Agree to conditions</label></div>
                    {this.state.formStates.agree.errors.required ? (
                        <span className="help-block">Please agree to conditions.</span>
                    ) : null}
                </div>
                <input className="btn btn-default" type="submit" value="Submit" />
            </FormComponent>
        );
    }
}

export default HomePage;
```

## es5

Example

```js
var FormComponent = ReactFormValidation.FormComponent;
var Validator = ReactFormValidation.Validator;

var Home = React.createClass({
    getInitialState: function () {
        return {
            formConfig: {
                'firstname': [Validator.required(), Validator.minLength(3)]
            },
            user: {
                firstname: 'Marie'
            },
            formStates: {
                'firstname': {
                    hasError: false,
                    errors: {}
                }
            },
            hasError: false
        };
    },
    onChange: function (event) {
        var name = event.target.name;
        var value = event.target.value;
        var user = this.state.user;
        user[name] = value;
        this.setState({
            user: user
        });
    },
    onStateChange: function (hasError, formStates) {
        this.setState({
            hasError: hasError,
            formStates: formStates
        });
    },
    onSubmit: function (hasError, formStates) {
        if (!hasError) {
            console.log('save', this.state.user);
        }
        else {
            this.setState({
                hasError,
                formStates
            });
        }
    },
    render() {
        let formGroup = this.state.hasError ? 'form-group has-error' : 'form-group';
        return (
            <FormComponent id="my-form" formConfig={this.state.formConfig} onStateChange={this.onStateChange} onSubmit={this.onSubmit}>
                <div className={formGroup}>
                    <label htmlFor="firstname">Firstname:</label>
                    <input type="text" id="firstname" name="firstname" value={this.state.user.firstname} onChange={this.onChange} className="form-control" />
                    {this.state.formStates.firstname.errors.required ? (
                        <span className="help-block">This field is required</span>
                    ) : null}
                    {this.state.formStates.firstname.errors.minLength ? (
                        <span className="help-block">Please enter at least than 3 characters.</span>
                    ) : null}
                </div >
                <input className="btn btn-default" type="submit" value="Submit" />
            </FormComponent>
        );
    }
});

ReactDOM.render(<div className="container"><h2>Form validation with es5</h2><Home /></div>, document.getElementById('app'));
```



