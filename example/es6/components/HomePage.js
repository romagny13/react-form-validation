import React from 'react';
import { required, minLength, maxLength, pattern, custom, isRequired } from '../../../src/index';
import UserForm from './UserForm';


export const email = () => {
    return (value) => {
        if (!isRequired(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return {
                name: 'email',
                error: 'Invalid email address'
            };
        }
    };
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: 'Marie',
                lastname: 'Bellin',
                password: 'Secret',
                email: '',
                age: 20,
                list: '2',
                note: 'My note',
                preference: 'b',
                likes: ['Milk', 'Cakes']
            },
            hasError: false,
            errors: {},
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
                    custom((value) => {
                        return this.state.user.password === value;
                    }, 'Password and confirm password do not match.')
                ],
                'age': [custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'agree': [required()],
                'likes': [custom(() => {
                    return this.state.user.likes.length > 0;
                }, 'Please select one or more items.')]
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onValidationStateChange = this.onValidationStateChange.bind(this);
    }

    onValidationStateChange(name, value, hasError, firstError, groupErrors) {
        console.log('validation state changed', name, value, hasError, firstError, groupErrors);
        let errors = this.state.errors;
        errors[name] = groupErrors;
        this.setState({
            hasError,
            errors
        });
    }

    onSubmit(hasError, formStates, formModel) {
        if (!hasError) {
            const { firstname, lastname, email, age, note, preference, likes } = formModel;
            const user = { firstname, lastname, email, age, note, preference, likes };
            console.log('save user ...', user);

            // simulate response error from server (example user exists error)
            setTimeout(() => {
                if (user.firstname === 'Marie') {
                    this.setState({
                        hasError: true,
                        errors: {
                            firstname: {
                                custom: 'A user with this name is already registered.'
                            }
                        }
                    });
                }
            });
        }
        else {
            this.setState({
                hasError
            });
        }
    }

    render() {
        console.log('render HomePage');
        return (
            <div className="container">
                <h2>Form binding and validation</h2>
                <UserForm
                    user={this.state.user}
                    validators={this.state.validators}
                    onSubmit={this.onSubmit}
                    hasError={this.state.hasError}
                    onValidationStateChange={this.onValidationStateChange}
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

export default HomePage;