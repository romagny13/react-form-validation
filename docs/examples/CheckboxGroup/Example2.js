import React from 'react';
import { Form, FormGroup, CheckboxGroup, Label, custom, ValidationHelper } from 'romagny13-react-form-validation';

/** With validation (one or more selected items) */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                likes: ['Milk', 'Cakes']
            },
            errors: {},
            touched: {}
        };

        this.validations = {
            likes: [custom((value, model) => {
                return model.likes.length > 0;
            }, 'Please select one or more items.')],
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
                    <CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={this.state.model["likes"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
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

