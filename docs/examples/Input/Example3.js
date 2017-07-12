import React from 'react';
import { Form, LightGroup, Input, Label, required, minlength, pattern, email, custom, ValidationHelper } from 'romagny13-react-form-validation';

/** All types */
class Example3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                range: 0
            },
            errors: {},
            touched: {}
        };

        this.validations = {
            email: [required(), email()],
            search: [required()],
            file: [required()],
            /*  color: [required()],*/
            date: [required()],
            month: [required()],
            time: [required()], week: [required()],
            tel: [required()],
            url: [required()],
            number: [required(), custom((value) => {
                return value >= 0 && value <= 100;
            }, 'Value betwwen 0 and 100')],
            range: [required()]
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onValueChange(name, value) {
        const { model, touched, submitted } = this.state;

        model[name] = value;

        if (submitted || touched[name]) {
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
        const { model, errors } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>

                <LightGroup error={errors["email"]}>
                    <label htmlFor="email" className="control-label">Email</label>
                    <Input type="email" id="email" name="email" value={model["email"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["search"]}>
                    <label htmlFor="search" className="control-label">Search</label>
                    <Input type="search" id="search" name="search" value={model["search"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["file"]}>
                    <label htmlFor="file" className="control-label">File</label>
                    <Input type="file" id="file" name="file" value={model["file"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />

                <LightGroup error={errors["date"]}>
                    <label htmlFor="date" className="control-label">Date</label>
                    <Input type="date" id="date" name="date" value={model["date"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["month"]}>
                    <label htmlFor="month" className="control-label">Month</label>
                    <Input type="month" id="month" name="month" value={model["month"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["time"]}>
                    <label htmlFor="time" className="control-label">Time</label>
                    <Input type="time" id="time" name="time" value={model["time"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["week"]}>
                    <label htmlFor="week" className="control-label">Week</label>
                    <Input type="week" id="week" name="week" value={model["week"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["tel"]}>
                    <label htmlFor="tel" className="control-label">Tel</label>
                    <Input type="tel" id="tel" name="tel" value={model["tel"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["url"]}>
                    <label htmlFor="url" className="control-label">Url</label>
                    <Input type="url" id="url" name="url" value={model["url"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["number"]}>
                    <label htmlFor="number" className="control-label">Number</label>
                    <Input type="number" id="number" name="number" value={model["number"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <LightGroup error={errors["range"]}>
                    <label htmlFor="range" className="control-label">Range</label>
                    <Input type="range" id="range" name="range" value={model["range"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                </LightGroup>
                <br />
                <input type="submit" value="Submit" />

                <pre>
                    {JSON.stringify(model)}
                </pre>
            </Form>
        );
    }
}

export default Example3;


