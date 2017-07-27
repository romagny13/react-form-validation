import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormGroup, ValidationHelper, required, minlength, maxlength, pattern, email, custom, isNullOrEmpty, DOMFormHelper } from '../../../../src/index';

import MyForm from './SimpleForm';

class SimplePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: '',
                lastname: '',
                email: '',
                password: 'Secret',
                confirmPassword: '',
                likes: ['Milk', 'Cakes'],
                list: 'b',
                agree: false
            },
            submitted: false,
            errors: {}
        };

        this.validators = {
            firstname: [required(), minlength(3)],
            lastname: [required(), maxlength(10)],
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
            likes: [custom((value, model) => {
                return model.likes.length > 0;
            }, 'Please select one or more items.')],
            preference: [required()],
            file: [required('Please select a file.')],
            agree: [required()]
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(event) {
        // change model value
        let name = event.target.name;
        let value = DOMFormHelper.getElementValue(event.target);
        let model = this.state.model;

        if (name === 'likes') {
            let likes = model['likes'];
            let index = likes.indexOf(value);
            if (index === -1) {
                likes.push(value);
            }
            else {
                likes.splice(index, 1);
            }
        }
        else {
            model[name] = value;
        }

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

    }

    render() {
        const { model, errors, submitted } = this.state;
        return <MyForm
            model={this.state.model}
            errors={this.state.errors}
            onValueChange={this.onValueChange}
            onSubmit={this.onSubmit}
            submitted={this.state.submitted} />;
    }
}

export default SimplePage;

