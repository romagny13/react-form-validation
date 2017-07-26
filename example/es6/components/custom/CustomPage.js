import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ValidationHelper, required, minlength, maxlength, pattern, email, custom, isNullOrEmpty } from '../../../../src/index';

import Form from './CustomForm';

class CustomPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // form model
            model: {
                email: '',
                password: 'Secret',
                likes: ['Milk', 'Cakes']
            },
            submitted: false,
            errors: {},
            touched: {}
        };

        this.validators = {
            email: [required(),email()],
            password: [
                required('Please enter a password.'),
                pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')
            ],
            note: [required(), minlength()],
            likes: [custom((value, model) => {
                return model.likes.length > 0;
            }, 'Please select one or more items.')]
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

export default CustomPage;