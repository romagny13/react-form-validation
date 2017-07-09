import React from 'react';
import { Form, FormGroup, Label, RadioGroup, required, ValidationHelper } from 'romagny13-react-form-validation';

/** With validation (required) */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {},
            errors: {},
            touched: {}
        };

        this.validations = {
            likes: [required()],
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
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup error={this.state.errors["likes"]} canChangeValidationState={this.state.submitted || this.state.touched["likes"]}>
                    <Label asterisk>Like (multiple choice)</Label>
                    <RadioGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} value={this.state.model["likes"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
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

