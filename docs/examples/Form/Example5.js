import React from 'react';
import Form from 'romagny13-react-form-validation/components/Form';
import LightGroup from 'romagny13-react-form-validation/components/LightGroup';
import Input from 'romagny13-react-form-validation/components/Input';
import Submit from 'romagny13-react-form-validation/components/Submit';
import Label from 'romagny13-react-form-validation/components/Label';
import { required, minlength } from 'romagny13-react-form-validation/helpers/validators';
import { ValidationHelper } from 'romagny13-react-form-validation/helpers/ValidationHelper';

/** Direct imports (to optimize bundle size) */
class Example5 extends React.Component {
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
    }
    onValueChange(name, value) {
        const { model, submitted } = this.state;

        model[name] = value;

        if (submitted) {
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
    render() {
        const { model, errors } = this.state;

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

export default Example5;


