import React, { Component, PropTypes } from 'react';
import { required, minLength, maxLength, pattern, custom, isRequired } from '../../../src/common/validators';
import UserForm from './UserForm';

const Sumary = ({ errors }) => {
    return (
        <div className="sumary">
            {Object.keys(errors).map(function (name) {
                return <p key={name}>{name}: {errors[name]} </p>;
            })}
        </div>
    );
};

const email = () => {
    return (value) => {
        if (!isRequired(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return {
                name: 'email',
                error: 'Invalid email address'
            };
        }
    };
};

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // form model, each form element to validate/bind is required
            model: {
                firstname: 'Marie',
                lastname: 'Bellin',
                password: 'Secret',
                confirmPassword: '',
                email: '',
                age: 20,
                list: '2',
                note: 'My note',
                file: '',
                preference: 'b',
                agree: false,
                likes: ['Milk', 'Cakes']
            },
            dataSourcePreferences: ['a', 'b', 'c'],
            dataSourceLikes: ['Milk', 'Cakes', 'Nutella'],
            validators: {
                'firstname': [required(), minLength(3)],
                'lastname': [maxLength(10)],
                'email': [email()],
                'password': [
                    required('Please enter a password.'),
                    pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter')
                ],
                'confirmPassword': [
                    required('Please confirm the password.'),
                    custom((value, model) => {
                        return model.password === value;
                    }, 'Password and confirm password do not match.')
                ],
                'age': [custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'file': [required('Please select a file')],
                'agree': [required()],
                'likes': [custom((value, model) => {
                    return model.likes.length > 0;
                }, 'Please select one or more items.')]
            },
            showSumary: false,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onValidationStateChange = this.onValidationStateChange.bind(this);
    }

    onValidationStateChange({ name, value, hasError, hasSuccess, error }) {
        console.log('validation state changed', name, value, hasError, error);
    }

    onSubmit({ hasError, errors, model }) {
        console.log('submitted', hasError, errors, model);

        if (hasError) {
            // show sumary
            this.setState({
                showSumary: true,
                errors
            });
        }
        else {
            // simulate a server request
            const { firstname, lastname, email, age, note, preference, likes } = model;
            const user = { firstname, lastname, email, age, note, preference, likes };
            console.log('save user ...', user);

            setTimeout(() => {
                if (user.firstname === 'Marie') {
                    this.setState({
                        showSumary: true,
                        errors: {
                            firstname: 'A user with this name is already registered.'
                        }
                    });
                }
                else {
                    this.setState({
                        showSumary: false,
                        errors: {}
                    });
                }
            });

        }
    }

    render() {
        console.log('render HomePage');
        return (
            <div style={{ padding: 24, border: "solid #f7f7f9" }}>
                <h1 style={{ margin: "0 0 24px" }}>Form binding and validation</h1>
                <hr />
                <UserForm
                    model={this.state.model}
                    validators={this.state.validators}
                    dataSourcePreferences={this.state.dataSourcePreferences}
                    dataSourceLikes={this.state.dataSourceLikes}
                    errors={this.state.errors}
                    onSubmit={this.onSubmit}
                    onValidationStateChange={this.onValidationStateChange}
                />
                {this.state.showSumary && <Sumary errors={this.state.errors} />}
            </div>
        );
    }
}

export default HomePage;

