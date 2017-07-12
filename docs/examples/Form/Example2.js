import React from 'react';
import { Form, LightGroup, Input, Submit, Reset, Label, required, minlength, ValidationHelper } from 'romagny13-react-form-validation';

/** Validation Strategy "onTouch" */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {},
            errors: {},
            touched: {},
            submitted: false
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
        const { model, errors, touched, submitted } = this.state;

        model[name] = value;

        if (submitted || touched[name]) {

            // validate only the field
            let fieldValidations = this.validations[name];
            errors[name] = ValidationHelper.validateProperty(model, name, fieldValidations);

            // ... or all fields with validate all
            //  let errors = ValidationHelper.validateAll(this.state.model, this.validations);

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
        const { model, errors, touched } = this.state;

        touched[name] = true;

        // validate only the field
        let fieldValidations = this.validations[name];
        errors[name] = ValidationHelper.validateProperty(model, name, fieldValidations);

        this.setState({
            touched,
            errors
        });
    }
    onSubmit(event) {
        event.preventDefault();

        // validate all
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
        const { model, errors, touched } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>

                <LightGroup error={errors["firstname"]}>
                    <Label htmlFor="firstname" asterisk>Firstname</Label><br />
                    <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>

                <LightGroup error={errors["lastname"]}>
                    <Label htmlFor="lastname" asterisk>Lastname</Label><br />
                    <Input id="lastname" name="lastname" value={model["lastname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>

                <Submit value="Submit" errors={errors} />

                <Reset value="Reset" initialState={this.state} onReset={this.onReset} />

                <pre>
                    {JSON.stringify(model)}
                </pre>
                <pre>
                    {JSON.stringify(touched)}
                </pre>
                <pre>
                    {JSON.stringify(errors)}
                </pre>
            </Form>
        );
    }
}

export default Example2;


