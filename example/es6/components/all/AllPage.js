import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ValidationHelper, required, minlength, maxlength, pattern, email, custom, isNullOrEmpty } from '../../../../src/index';

import Form from './AllForm';

class ControlsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // form model
            model: {
                color: '#000000',
                range: 0
            },
            submitted: false,
            errors: {},
            touched: {}
        };

        this.validators = {
            text: [required(), minlength(), maxlength(10)],
            email: [required(), email()],
            password: [required('Please enter a password.'), pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')],
            confirmPassword: [
                required('Please confirm the password.'),
                custom((value, model) => {
                    return model.password === value;
                }, 'Password and confirm password do not match.')
            ],
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
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onValueChange(name, value) {
        console.log('value changed', name, value);

        let model = this.state.model;
        model[name] = value;

        if (this.state.submitted) {
            let errors = ValidationHelper.validateAll(this.state.model, this.validators);

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

    // validation

    onSubmit(event) {
        event.preventDefault();

        let errors = ValidationHelper.validateAll(this.state.model, this.validators);

        console.log('errors', errors);
        this.setState({
            submitted: true,
            errors
        });

        // save data  

    }

    onReset(initialState) {
        this.setState(initialState);
    }

    render() {
        return <Form
            model={this.state.model}
            errors={this.state.errors}
            onValueChange={this.onValueChange}
            onSubmit={this.onSubmit}
            submitted={this.state.submitted}
            initialState={this.state}
            onReset={this.onReset} />;
    }
}

export default ControlsPage;