import React from 'react';
import { Form, LightGroup, Input, Submit, Reset, Label, required, minlength, ValidationHelper } from 'romagny13-react-form-validation';
/* or direct import to optimize bundle size:
import Form from 'romagny13-react-form-validation/lib/components/Form';
import LightGroup from 'romagny13-react-form-validation/lib/components/LightGroup';
import Input from 'romagny13-react-form-validation/lib/components/Input';
import Submit from 'romagny13-react-form-validation/lib/components/Submit';
import Submit from 'romagny13-react-form-validation/lib/components/Submit';
import Reset from 'romagny13-react-form-validation/lib/components/Reset';
import { required, minlength } from 'romagny13-react-form-validation/lib/helpers/validators';
import { ValidationHelper } from 'romagny13-react-form-validation/lib/helpers/ValidationHelper';
*/

/** Validation Strategy "onSubmit" */
class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: '',
                lastname: '',
            },
            errors: {},
            submitted: false
        };

        this.validators = {
            firstname: [required('Firstname is required'), minlength()],
            lastname: [required('Lastname is required')]
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }
    onValueChange(name, value) {
        const { model, submitted } = this.state;

        // change the value
        model[name] = value;

        if (submitted) {

            // validate only the field
            // let fieldValidators = this.validators[name];
            // errors[name] = ValidationHelper.validateProperty(model, name, fieldValidators);

            // ... or validate all
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
    onSubmit(event) {
        event.preventDefault();

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
        const { model, errors } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>

                <LightGroup error={errors["firstname"]}>
                    <Label htmlFor="firstname" asterisk>Firstname</Label><br />
                    <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} autoFocus />
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
                    {JSON.stringify(errors)}
                </pre>
            </Form>
        );
    }
}

export default Example1;


