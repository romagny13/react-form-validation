# React Form Validation (v0.5)

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

Helpers: allow to validate simple form (without components or with other component framework )
* **Validations**: 
    * _required_: default or custom message
    * _minlength_: value (by default 3) + default or custom message
    * _maxlength_: value (by default 30) + default or custom message
    * _email_: default or custom message
    * _pattern_: regex pattern (required)  + default or custom message
    * _custom_: function to call (pass value and model)  + default or custom message
    * ( + isNullOrEmpty function )
* **ValidationHelper**: allow to validate value, property and form model
    * _validateValue_: model, value, validations array ( example for firstname: [required()] )
    * _validateProperty_: model, property name, validations array
    * _validateAll_: model, validations object ( example: {firstname:[required()], lastname:[required()]} )
    * ( + hasErrors, countErrors functions )
* **FormHelper**: allow to resolve element value
    * _getElementValue_: return value for form element (input, select, radio, etc.)
    * ( + hasClassName, addClassName, removeClassName functions )
* **Util**: 
    * _omit_: allow to omit props for example
    * _clone_: clone an object
    * _extend_: extend a source object with another object

Components: allow to bind value and notify on value change (onValueChange) and on touch / blur (onTouch)
* **Input** value + type ('text', 'email', 'password', 'search', 'file', 'color', 'date', 'month', 'time', 'week', 'tel', 'url', 'number', 'range') and shortcuts:
    * _Text_
    * _Email_
    * _Search_
    * _Password_
    * _File_
    * _Number_
    * _Range_
    * _Color_
* **Checkbox**: _checked_
* **CheckboxGroup**: _dataSource_ + _values_. Its possible to use a custom **renderFunction**
* **RadioGroup**: _dataSource_ + _value_. Its possible to use a custom **renderFunction**
* **Select**: _dataSource_ + _value_
* **TextArea**: _value_
* **FormGroup**: allow to show error, success, feedback (classNames based on Bootstrap: has-error, has-feedback, etc.) if **canChangeValidationState** is true and customize all class names
* **Form**: Form with noValidate by default
* **Label**: allow to display _asterisk_ for required field
* **Submit**: can be disabled if has errors (pass _errors_)
* **Reset**: clone _initialState_ (form model, errors, etc.) and pass inital state **onReset**

## Helpers

### ValidationHelper

validateValue

_Example:_

```js
let model = {
    firstname: '',
    lastname: ''
};

let validations = {
 firstname: [required('Firstname required')],
 lastname: [required('Lastname required')]
};

let value = model['lastname'];

let error = ValidationHelper.validateValue(model,value,validations);
// error => 'Lastname required'
```

validateProperty

_Example:_

```js
let model = {
    firstname: '',
    lastname: ''
};

let validations = {
 firstname: [required('Firstname required')],
 lastname: [required('Lastname required')]
};

let error = ValidationHelper.validateProperty(model, 'lastname', validations);
// error => 'Lastname required'
```

validateAll

_Example:_

```js
let model = {
    firstname: '',
    lastname: ''
};

let validations = {
 firstname: [required('Firstname required')],
 lastname: [required('Lastname required')]
};

let value = model['lastname'];

let errors = ValidationHelper.validateAll(model,validations);
// errors => {firstname: 'Firstname required', lastname: 'Lastname required'}
```

### FormHelper

getElementValue

_Example:_

```xml
<input name="firstname" value={model["firstname"]} onChange={this.onValueChange} />
```

```js
 onValueChange(event) {
    let name = event.target.name;
    let value = FormHelper.getElementValue(event.target);

    let model = this.state.model;
    model[name] = value;

    this.setState({
        model
    });
}
```

## Components

### Form

Form with noValidate by default

_Examples_

```xml
 <Form onSubmit={onSubmit}>

    <FormGroup error={errors["firstname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
        <Label htmlFor="firstname" className="control-label" asterisk>Firstname</Label>
        <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
    </FormGroup>

    <Submit value="Submit" errors={errors} />
    <Reset value="Reset" initialState={initialState} onReset={onReset} />

</Form >
```

### FormGroup

* The error is displayed in a `span` if canChangeValidationState is `true` and error is `defined`
* If renderFeedback is `true` (false by default) a span with a glyphicon remove is displayed
* If renderSuccess is `true` (false by default) and canChangeValidationState is `true` with no error, a span with a glyphicon ok is displayed

2 states with no renderSuccess: "normal" and "error"
3 states with renderSuccess: "start", "error" and "success"

Props | Description
-------- |  -------- 
error | the error message
canChangeValidationState | `boolean` (false by default) 
renderFeedback | `boolean` (false by default) 
renderSuccess | `boolean` (false by default) 
className | `form-group` by default
errorClassName: `has-error` by default
successClassName | `has-success` by default
feedbackClassName | `has-feedback` by default
errorFeedbackClassName | `glyphicon glyphicon-remove form-control-feedback` by default
successFeedbackClassName | `glyphicon glyphicon-ok form-control-feedback` by default
errorSpanClassName | `help-block` by default

_Examples:_

```xml
 <FormGroup error={errors["firstname"]} canChangeValidationState={submitted}>
    <Label htmlFor="firstname" className="control-label" asterisk>Firstname</Label>
    <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
</FormGroup>
```

With feedback and success

```xml
 <FormGroup error={errors["firstname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
    <Label htmlFor="firstname" className="control-label" asterisk>Firstname</Label>
    <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
</FormGroup>
```

With no error displayed

```xml
<FormGroup>
    <Label>Note</Label>
    <TextArea name="note" value={model["note"]} onValueChange={onValueChange} className="form-control" rows="5" />
</FormGroup>
```

### Label

Allow to display an asterisk (*) for require field if `asterisk` is `true` 

Props | Description
-------- |  -------- 
asterisk | display asterisk (`false` by default)
asteriskColor | `red` by default

_Example:_

```xml
<FormGroup>
    <Label htmlFor="firstname" className="control-label">Firstname</Label>
    <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange}  />
</FormGroup>
```

With asterisk

```xml
<FormGroup>
    <Label htmlFor="firstname" className="control-label" asterisk>Firstname</Label>
    <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange}  />
</FormGroup>
```

### Input

Props | Description
-------- |  -------- 
value | `string` or `number` (for input type number and range)
type | `text` (by default), `email`, `password`, `search`, `file`, `color`, `date`, `month`, `time`, `week`, `tel`, `url`, `number`, `range`
onValueChange | notifcation with with form element `name` and current `value`
onTouch | notification on touch / blur with form element `name`

Shortcuts:
* _Text_
* _Email_
* _Search_
* _Password_
* _File_
* _Number_
* _Range_
* _Color_

_Examples:_

Input type text:

```xml
<Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
```
Or
```xml
<Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
```

Number:

```xml
 <Input type="number" id="age" name="age" value={model["age"]} onValueChange={onValueChange} className="form-control" />
```
Or
```xml
 <Number id="age" name="age" value={model["age"]} onValueChange={onValueChange} className="form-control" />
```

Date:

```html
<Input type="date" id="date" name="date" value={model["date"]} onValueChange={onValueChange} className="form-control" />
```

### Checkbox

Props | Description
-------- |  -------- 
checked | `false` by default
onValueChange | notifcation with with form element `name` and `checked`
onTouch | notification on touch / blur with form element `name`

_Example:_

```xml
<div className="checkbox"><Label asterisk><Checkbox name="agree" checked={model['agree']} onValueChange={onValueChange} />Agree to conditions</Label></div>
```

### CheckboxGroup

Props | Description
-------- |  -------- 
dataSource | `array` (example: ['a','b','c'])
values | values checked (example: ['a','c'])
renderFunction | allow to `customize rendering`
onValueChange | notifcation with with form element `name` and current `values` array 
onTouch | notification on touch / blur with form element `name`

_Example:_

```xml
<CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={model["likes"]} onValueChange={onValueChange} />
```

### RadioGroup

Props | Description
-------- |  -------- 
dataSource | `array` (example: ['a','b','c'])
value | value checked (example: 'a')
renderFunction | allow to `customize rendering`
onValueChange | notifcation with with form element `name` and current `value`
onTouch | notification on touch / blur with form element `name`

_Example:_

```xml
<RadioGroup name="preference" dataSource={["a", "b", "c"]} value={model["preference"]} onValueChange={onValueChange} />
```

### Select

Props | Description
-------- |  -------- 
dataSource | `array` (example: ['a','b','c'])
value | value selected (example: 'a')
onValueChange | notifcation with with form element `name` and current `value`
onTouch | notification on touch / blur with form element `name`

_Example:_

```xml
<Select name="list" dataSource={[1, 2, 3]} value={model['list']} onValueChange={onValueChange} className="form-control" />
```


### TextArea

Props | Description
-------- |  -------- 
value | `string`
onValueChange | notifcation with with form element `name` and current `value`
onTouch | notification on touch / blur with form element `name`

_Example:_

```xml
 <TextArea name="note" value={model["note"]} onValueChange={onValueChange} className="form-control" rows="5" />
```

### Submit

The submit button is disabled (+ className added `disabled`) if have errors

Props | Description
-------- |  -------- 
errors | the errors `object` (example: {} or undefined with no error and {firstname:'This field is required'})
className | `btn btn-default` by default

_Example:_

```xml
<Submit value="Submit" errors={errors} />
```

### Reset

The submit button is disabled (+ className added `disabled`) if have errors

Props | Description
-------- |  -------- 
initialState | the initial state (`object`) of the form (with model, errors, etc.)
className | `btn btn-warning` by default

_Example:_

Initial State:

```js
 this.state = {
    // form model
    model: {
        firstname: 'Marie',
        lastname: 'Bellin',
        email: '',
        password: 'Secret',
        confirmPassword: '',
        likes: ['Milk', 'Cakes'],
        list: 'b',
        file: '',
        agree: false
    },
    submitted: false,
    errors: {},
    touched: {}
};
```

```xml
<Reset value="Reset" initialState={initialState} onReset={onReset} />
```
handle on reset

```js
 onReset(initialState) {
    this.setState(initialState);
}
```

## Lib examples

To run examples `npm i` then `npm run dev`

## es6 Example

Imports 

```js
import { Form, FormGroup, Checkbox, Text, Email, Password, File, Number, RadioGroup, CheckboxGroup, TextArea, Select, Submit, Reset } from 'romagny13-react-form-validation';
```

Define form model and validations

```js
 this.state = {
    // form model
    model: {
        firstname: 'Marie',
        lastname: 'Bellin',
        email: '',
        password: 'Secret',
        confirmPassword: '',
        likes: ['Milk', 'Cakes'],
        list: 'b',
        file: '',
        age: 'abc',
        agree: false
    },
    submitted: false,
    errors: {}
};

this.validators = {
    // input
    firstname: [required(), minlength()],
    lastname: [maxlength(10)],
    email: [email()],
    password: [
        required('Please enter a password.'),
        pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')
    ],
    confirmPassword: [
        required('Please confirm the password.'),
        custom((value, model) => {
            return model.password === value;
        }, 'Password and confirm password do not match.')
    ],
    age: [required(), custom((value) => {
        return value > 0 && value < 120;
    }, 'Oops ??')],
    file: [required('Please select a file.')],
    agree: [required()],
    // groups
    likes: [custom((value, model) => {
        return model.likes.length > 0;
    }, 'Please select one or more items.')],
    preference: [required()]
};
```

handle value change and form submission
```js
 onValueChange(name, value) {
    let model = this.state.model;
    model[name] = value;

    if (this.state.submitted) {
        let errors = ValidationHelper.validateAll(this.state.model, this.validators);

        this.setState({
            model,
            errors
        });
    }
    else {
        this.setState({
            model
        });
    }
}

onSubmit(event) {
    event.preventDefault();

    let errors = ValidationHelper.validateAll(this.state.model, this.validators);

    this.setState({
        submitted: true,
        errors
    });

    // or save data and navigate to another page 
    if (!ValidationHelper.hasErrors(errors)) {

    }
}
```

Create a form

```js
const MyForm = ({ model, onSubmit, onReset, onValueChange, errors, submitted, initialState }) => {
    return (
        <Form onSubmit={onSubmit}>

            <FormGroup error={errors["firstname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="firstname" className="control-label">Firstname:</label>
                <Text id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} className="form-control" autoFocus />
            </FormGroup>

            <FormGroup error={errors["lastname"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="lastname" className="control-label">Lastname:</label>
                <Text id="lastname" name="lastname" value={model["lastname"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["password"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="password" className="control-label">Password:</label>
                <Password id="password" name="password" value={model["password"]} onValueChange={onValueChange} className="form-control" placeholder="Password" />
            </FormGroup>

            <FormGroup error={errors["confirmPassword"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="confirmPassword" className="control-label">Confirm password:</label>
                <Password id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={onValueChange} className="form-control" placeholder="Confirm password" />
            </FormGroup>

            <FormGroup error={errors["email"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="email" className="control-label">Email:</label>
                <Email name="email" value={model["email"]} onValueChange={onValueChange} className="form-control" placeholder="example@domain.com" />
            </FormGroup>

            <FormGroup error={errors["age"]} canChangeValidationState={submitted} renderSuccess renderFeedback>
                <label htmlFor="age" className="control-label">Age:</label>
                <Number id="age" name="age" value={model["age"]} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["file"]} canChangeValidationState={submitted}>
                <File name="file" value={model["file"]} onValueChange={onValueChange} accept="image/*" />
            </FormGroup>

            <FormGroup>
                <label htmlFor="list" className="control-label">List (no validation):</label>
                <Select name="list" dataSource={[1, 2, 3]} value={model['list']} onValueChange={onValueChange} className="form-control" />
            </FormGroup>

            <FormGroup error={errors["preference"]} canChangeValidationState={submitted}>
                <label>Preference:</label>
                <RadioGroup name="preference" dataSource={["a", "b", "c"]} value={model["preference"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup error={errors["likes"]} canChangeValidationState={submitted}>
                <label>Like (multiple choice):</label>
                <CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={model["likes"]} onValueChange={onValueChange} />
            </FormGroup>

            <FormGroup>
                <label>Note:</label>
                <TextArea name="note" value={model["note"]} onValueChange={onValueChange} className="form-control" rows="5" />
            </FormGroup>

            <FormGroup error={errors["agree"]} canChangeValidationState={submitted}>
                <div className="checkbox"><label><Checkbox name="agree" checked={model['agree']} onValueChange={onValueChange} />Agree to conditions</label></div>
            </FormGroup>

            <Submit value="Submit" errors={errors} />

            <Reset value="Reset" initialState={initialState} onReset={onReset} />

            <hr />
            <pre>
                {JSON.stringify(model)}
            </pre>
            <hr />
            <pre>
                {JSON.stringify(errors)}
            </pre>
        </Form >
    );
};
MyForm.propTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
    initialState: PropTypes.object.isRequired
};

export default MyForm;
```

## es5 Example

```xml
<!DOCTYPE html>
<html>

<head>
    <title>Example es5</title>
    <script src="https://unpkg.com/react@15.6.1/dist/react.min.js"></script>
    <script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css">
</head>

<body>
    <div id="app"></div>
    <script src="../../dist/react-form-validation.min.js"></script>
    <script type="text/babel">
        var Form = ReactFormValidation.Form;
        var FormGroup = ReactFormValidation.FormGroup;
        var Input = ReactFormValidation.Input;
        var required = ReactFormValidation.required;
        var minlength = ReactFormValidation.minlength;
        var ValidationHelper = ReactFormValidation.ValidationHelper;

        var Home = React.createClass({
            getInitialState: function () {
                return {
                    model: {
                        firstname: 'Marie'
                    },
                    submitted: false,
                    validations:{
                        firstname:[required(), minlength()]
                    },
                    errors:{},
                    touched: {}
                };
            },
            onValueChange: function(name, value) {
                console.log('value changed', name, value);

                var model = this.state.model;
                model[name] = value;

                // with touch
                if (this.state.touched[name]) {
                    var errors = ValidationHelper.validateAll(model, this.state.validations);

                    this.setState({
                        model,
                        errors
                    });
                }
                else {
                    this.setState({
                        model
                    });
                }

                // with submitted
                /*if (this.state.submitted) {
                    var errors = ValidationHelper.validateAll(this.state.model, this.state.validations);

                    this.setState({
                        model,
                        errors
                    });
                }
                else {
                    this.setState({
                        model
                    });
                }*/
            },
            onTouch : function (name){
                console.log('touched', name);

                var touched = this.state.touched;
                touched[name] = 'touched';

                var errors = ValidationHelper.validateAll(this.state.model, this.state.validations);

                this.setState({
                    touched,
                    errors
                });

            },
            onSubmit: function (event) {
                event.preventDefault();

                var errors = ValidationHelper.validateAll(this.state.model, this.state.validations);
                console.log('submitted', errors);
                this.setState({
                    submitted: true,
                    errors: errors
                });
            },
            render: function() {
                return (
                    <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup error={this.state.errors["firstname"]} canChangeValidationState={this.state.touched["firstname"]} renderSuccess renderFeedback>
                                <label htmlFor="firstname">Firstname:</label>
                                <Input id="firstname" name="firstname" value={this.state.model.firstname} onValueChange={this.onValueChange.bind(this)} onTouch={this.onTouch.bind(this)} className="form-control" />
                            </FormGroup>
                        <input className="btn btn-default" type="submit" value="Submit" />
                    </Form>
                );
            }
        });

        ReactDOM.render(<div className="container"><h2>React Form Validation with es5</h2><Home /></div>, document.getElementById('app'));
    </script>
</body>

</html>
```