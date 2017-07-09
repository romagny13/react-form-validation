import React from 'react';
import { Form, FormGroup, TextArea, CheckboxGroup, Label, required, ValidationHelper } from 'romagny13-react-form-validation';

/** Validation (required) */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                note: ''
            },
            errors: {},
            touched: {}
        };

        this.validations = {
            note: [required()]
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
                <FormGroup error={errors["note"]} canChangeValidationState={submitted || touched["note"]}>
                    <Label htmlFor="note" asterisk>Note</Label><br />
                    <TextArea id="note" name="note" value={model["note"]} onValueChange={this.onValueChange} onTouch={this.onTouch} rows="5" />
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

