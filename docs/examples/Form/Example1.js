import React from 'react';
import { Form, FormGroup, Input, Submit, Reset, Label, required, minlength, ValidationHelper } from 'romagny13-react-form-validation';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: 'Marie',
                lastname: '',
            },
            errors: {},
            touched: {}
        };

        this.validations = {
            firstname: [required('Firstname is required'), minlength()],
            lastname: [required('Lastname is required')]
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
                    <Label htmlFor="firstname" asterisk>Firstname</Label>
                    <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </FormGroup>

                <FormGroup error={errors["lastname"]} canChangeValidationState={submitted || touched["lastname"]}>
                    <Label htmlFor="lastname" asterisk>Lastname</Label>
                    <Input id="lastname" name="lastname" value={model["lastname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </FormGroup>
                <Submit value="Submit" errors={errors} />
                <Reset value="Reset" initialState={this.state} onReset={this.onReset} />
            </Form>
        );
    }
}

export default Example1;


