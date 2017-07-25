import React from 'react';
import { Form, FormGroup, Input, Submit, Reset, Label, required, minlength, ValidationHelper } from 'romagny13-react-form-validation';

/** With FormGroup and "success" state */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: 'Marie',
                lastname: '',
            },
            errors: {},
            touched: {},
            submitted: false
        };

        this.validators = {
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
    onTouch(name) {
        const { model, errors, touched } = this.state;

        touched[name] = true;

        // validate only the field
        let fieldValidations = this.validators[name];
        errors[name] = ValidationHelper.validateProperty(model, name, fieldValidations);

        this.setState({
            touched,
            errors
        });
    }
    onSubmit(event) {
        event.preventDefault();

        // validate all
        let errors = ValidationHelper.validateAll(this.state.model, this.validators);

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

                <FormGroup error={errors["firstname"]} canChangeValidationState={submitted || touched["firstname"]} renderSuccess>
                    <Label htmlFor="firstname" asterisk>Firstname</Label><br />
                    <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </FormGroup>

                <FormGroup error={errors["lastname"]} canChangeValidationState={submitted || touched["firstname"]} renderSuccess>
                    <Label htmlFor="lastname" asterisk>Lastname</Label><br />
                    <Input id="lastname" name="lastname" value={model["lastname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </FormGroup>

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


