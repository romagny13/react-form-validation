import React from 'react';
import { Form, FormGroup, Input, Label, required, minlength, ValidationHelper } from 'romagny13-react-form-validation';

/** Validation */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: '',
            },
            errors: {},
            touched: {}
        };

        this.validators = {
            firstname: [required('Firstname is required'), minlength()]
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onValueChange(name, value) {
        let model = this.state.model;
        model[name] = value;

        if (this.state.submitted || this.state.touched[name]) {
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
        const { model, errors, touched, submitted } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup error={errors["firstname"]} canChangeValidationState={submitted || touched["firstname"]}>
                    <Label htmlFor="firstname" asterisk>Firstname</Label>
                    <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </FormGroup>
                <input type="submit" value="Submit" />
                <pre>
                    {JSON.stringify(errors)}
                </pre>
            </Form>
        );
    }
}

export default Example2;


