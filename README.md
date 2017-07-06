# React Form Validation (v0.5)

[![Build Status](https://travis-ci.org/romagny13/react-form-validation.svg?branch=master)](https://travis-ci.org/romagny13/react-form-validation)

```
npm i romagny13-react-form-validation -S
```

Helpers: 
* **Validations**: required, minlength, maxlength, email, pattern, custom
* **ValidationHelper**: allow to validate value, property and form model
* **FormHelper**: allow to resolve element value
* **Util**: omit, clone, extend, etc.

Components:
* **Input**
    * _Text_
    * _Email_
    * _Search_
    * _Password_
    * _File_
    * _Number_
    * _Range_
    * _Color_
* **Checkbox**
* **CheckboxGroup**: dataSource + values
* **RadioGroup**: dataSource + value
* **Select**: dataSource + value
* **TextArea**
* **FormGroup**: allow to show error, success, feedback (classNames based on Bootstrap: has-error, has-feedback, etc.) if **canChangeValidationState** is true
* **Form**: Form with noValidate by default
* **Submit**: can be disabled if has errors
* **Reset**: _clone and notify with initial state_ (form model, errors, etc.) **onReset**


## Example

Note: to run examples `npm i` then `npm run dev`

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
    firstname: [required(), minlength(3)],
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
