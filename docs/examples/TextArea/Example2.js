import React from 'react';
import { Form, LightGroup, TextArea, CheckboxGroup, Label, required, ValidationHelper } from 'romagny13-react-form-validation';

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

        this.validators = {
            note: [required()]
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
                <LightGroup error={errors["note"]}>
                    <Label htmlFor="note" asterisk>Note</Label><br />
                    <TextArea id="note" name="note" value={model["note"]} onValueChange={this.onValueChange} onTouch={this.onTouch} rows="5" />
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

