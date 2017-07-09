import React from 'react';
import { Form, FormGroup, Password, CheckboxGroup, Label, required, pattern, custom, ValidationHelper } from 'romagny13-react-form-validation';

/** With validation (required, match) */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                password: '',
                confirmPassword: '',
            },
            errors: {},
            touched: {}
        };

        this.validations = {
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

        this.onValueChange = this.onValueChange.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onValueChange(name, value) {
        let model = this.state.model;
        model[name] = value;

        if (this.state.submitted || this.state.touched[name]) {
            let errors = ValidationHelper.validateAll(model, this.validations);

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
    onTouch(name) {
        let touched = this.state.touched;
        touched[name] = true;

        let errors = ValidationHelper.validateAll(this.state.model, this.validations);

        this.setState({
            touched,
            errors
        });

    }
    onSubmit(event) {
        event.preventDefault();

        let errors = ValidationHelper.validateAll(this.state.model, this.validations);
        this.setState({
            submitted: true,
            errors
        });
    }
    render() {
        const { model, errors, touched, submitted } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup error={errors["password"]} canChangeValidationState={submitted || touched["password"]}>
                    <Label htmlFor="password" asterisk>Password</Label>
                    <Password width="200px" id="password" name="password" value={model["password"]} onValueChange={this.onValueChange} onTouch={this.onTouch} placeholder="Password" />
                </FormGroup>

                <FormGroup error={this.state.errors["confirmPassword"]} canChangeValidationState={this.state.submitted || touched["confirmPassword"]}>
                    <Label htmlFor="confirmPassword" asterisk>Confirm password</Label>
                    <Password width="200px" id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={this.onValueChange} onTouch={this.onTouch} placeholder="Confirm password" />
                </FormGroup>

                <input type="submit" value="Submit" />
                <pre>
                    {JSON.stringify(this.state.errors)}
                </pre>
            </Form>
        );
    }
}

export default Example2;

