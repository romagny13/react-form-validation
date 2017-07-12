import React from 'react';
import { Form, LightGroup, Input, Password, Submit, Reset, Label, required, minlength, pattern, email, custom, ValidationHelper } from 'romagny13-react-form-validation';

const validations = {
    email: [required(), email()],
    username: [required(), minlength()],
    password: [
        required('Please enter a password.'),
        pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')
    ],
    confirmPassword: [
        required('Please confirm the password.'),
        custom((value, model) => {
            return model.password === value;
        }, 'Password and confirm password do not match.')
    ]
};


function registerUser(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user['email'] === 'mb@hotmail.com') {
                reject({ email: 'A user with this email address is already registered.' });
            }
            else {
                resolve(user);
            }
        }, 1500);
    });
}

/** Async Validation "onSubmit" (simulate user registration fail) */
class Example4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                email: 'mb@hotmail.com',
                username: 'Marie',
                password: 'Secret',
                confirmPassword: 'Secret'
            },
            errors: {},
            submitted: false
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onValueChange(name, value) {
        const { model, submitted } = this.state;

        // change the value
        model[name] = value;

        if (submitted) {

            let errors = ValidationHelper.validateAll(model, validations);

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

        const { model } = this.state;

        let errors = ValidationHelper.validateAll(model, validations);

        if (!ValidationHelper.hasErrors(errors)) {

            registerUser(model).then(() => {

                // ok ... navigate to login page for example

            }, (errors) => {
                this.setState({
                    submitted: true,
                    errors
                });
            });
        }
        else {
            this.setState({
                submitted: true,
                errors
            });
        }
    }
    render() {
        const { model, errors } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>

                <LightGroup error={errors["email"]}>
                    <Label htmlFor="email" asterisk>Email</Label><br />
                    <Input type="email" id="email" name="email" value={model["email"]} onValueChange={this.onValueChange} onTouch={this.onTouch} autoFocus />
                </LightGroup>

                <LightGroup error={errors["username"]}>
                    <Label htmlFor="username" asterisk>Username</Label><br />
                    <Input id="username" name="username" value={model["username"]} onValueChange={this.onValueChange} onTouch={this.onTouch} autoFocus />
                </LightGroup>

                <LightGroup error={errors["password"]}>
                    <Label htmlFor="password" asterisk>Password</Label>
                    <Password width="173px" id="password" name="password" value={model["password"]} onValueChange={this.onValueChange} onTouch={this.onTouch} placeholder="Password" />
                </LightGroup>

                <LightGroup error={errors["confirmPassword"]}>
                    <Label htmlFor="confirmPassword" asterisk>Confirm password</Label>
                    <Password width="173px" id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={this.onValueChange} onTouch={this.onTouch} placeholder="Confirm password" />
                </LightGroup>

                <Submit value="Submit" errors={errors} />
            </Form>
        );
    }
}

export default Example4;


