import React from 'react';
import { Form, LightGroup, Password, CheckboxGroup, Label, required, pattern, custom, ValidationHelper } from 'romagny13-react-form-validation';

/** Validation (required, match) */
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

        this.validators = {
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
        const { model, touched, submitted } = this.state;

        model[name] = value;

        if (submitted || touched[name]) {
            let errors = ValidationHelper.validateAll(model, this.validators);

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

        let errors = ValidationHelper.validateAll(this.state.model, this.validators);

        this.setState({
            touched,
            errors
        });

    }
    onSubmit(event) {
        event.preventDefault();

        let errors = ValidationHelper.validateAll(this.state.model, this.validators);
        this.setState({
            submitted: true,
            errors
        });
    }
    render() {
        const { model, errors } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <LightGroup error={errors["password"]}>
                    <Label htmlFor="password" asterisk>Password</Label>
                    <Password width="200px" id="password" name="password" value={model["password"]} onValueChange={this.onValueChange} onTouch={this.onTouch} placeholder="Password" />
                </LightGroup>

                <LightGroup error={errors["confirmPassword"]}>
                    <Label htmlFor="confirmPassword" asterisk>Confirm password</Label>
                    <Password width="200px" id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onValueChange={this.onValueChange} onTouch={this.onTouch} placeholder="Confirm password" />
                </LightGroup>

                <input type="submit" value="Submit" />
                <pre>
                    {JSON.stringify(errors)}
                </pre>
            </Form>
        );
    }
}

export default Example2;

