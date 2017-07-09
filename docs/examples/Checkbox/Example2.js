import React from 'react';
import { Form, FormGroup, Checkbox, Label, required, ValidationHelper } from 'romagny13-react-form-validation';

/** With Validation (required) */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                agree: false
            },
            errors: {},
            submitted: false,
            touched: {}
        };

        this.validations = {
            agree: [required()]
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
                <FormGroup error={errors["agree"]} canChangeValidationState={submitted || touched["agree"]}>
                    <div className="checkbox">
                        <Label asterisk>
                            <Checkbox name="agree" checked={model.agree} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                            I agree to terms
                        </Label>
                    </div>
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

