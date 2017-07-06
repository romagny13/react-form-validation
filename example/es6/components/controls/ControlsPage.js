import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ValidationHelper, required, minlength, maxlength, pattern, email, custom, isNullOrEmpty } from '../../../../src/index';

import Form from './ControlsForm';

class ControlsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // form model
            model: {
                firstname: 'Marie',
                lastname: 'Bellin',
                email: '',
                password: 'Secret',
                confirmPassword: '',
                likes: ['Milk', 'Cakes'],
                list: 'b',
                file: '',
                age: 'abc',
                agree: false
            },
            submitted: false,
            errors: {},
            touched: {}
        };

        this.validators = {
            // input
            firstname: [required(), minlength(3)],
            lastname: [maxlength(10)],
            email: [email()],
            password: [
                required('Please enter a password.'),
                pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')
            ],
            confirmPassword: [
                required('Please confirm the password.'),
                custom((value, model) => {
                    return model.password === value;
                }, 'Password and confirm password do not match.')
            ],
            age: [required(), custom((value) => {
                return value > 0 && value < 120;
            }, 'Oops ??')],
            file: [required('Please select a file.')],
            agree: [required()],
            // groups
            likes: [custom((value, model) => {
                return model.likes.length > 0;
            }, 'Please select one or more items.')],
            preference: [required()]
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

        // or save data and navigate to another page 
        if (!ValidationHelper.hasErrors(errors)) {

        }

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