import React from 'react';
import { Form, FormGroup, Reset, Input, CheckboxGroup, Label, required, minlength, ValidationHelper } from 'romagny13-react-form-validation';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: 'Marie',
            },
            errors: {},
            touched: {}
        };

        this.validations = {
            firstname: [required(), minlength()]
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
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
    onReset(initialState) {
        this.setState(initialState);
    }
    render() {
        const { model, errors, touched, submitted } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup error={errors["firstname"]} canChangeValidationState={submitted || touched["firstname"]}>
                    <Label htmlFor="firstname" asterisk>Password</Label>
                    <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </FormGroup>
                <input type="submit" value="Submit" />
                <Reset value="Reset" initialState={this.state} onReset={this.onReset} />
            </Form>
        );
    }
}

export default Example1;


