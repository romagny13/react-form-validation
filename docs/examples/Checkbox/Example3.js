import React from 'react';
import { Form, LightGroup, Checkbox, Label, required, ValidationHelper } from 'romagny13-react-form-validation';

/** Validation (required) */
class Example3 extends React.Component {
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

        this.validators = {
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
                <LightGroup error={errors["agree"]}>
                    <div className="checkbox">
                        <Label asterisk>
                            <Checkbox name="agree" checked={model.agree} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                            I agree to terms
                        </Label>
                    </div>
                </LightGroup>
                <input type="submit" value="Submit" />
                <pre>
                    {JSON.stringify(errors)}
                </pre>
            </Form>
        );
    }
}

export default Example3;

