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
                email: '',
                age: 20,
                list: '2',
                note: 'My note',
                preference: 'b',
                likes: ['Milk', 'Cakes']
            },
            hasError: false,
            validators: {
                'firstname': [required(), minLength(3)],
                'lastname': [maxLength(10)],
                'email': [email()],
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

    onValidationStateChange(name, value, hasError, firstError, errors) {
        console.log('validation state changed', name, value, hasError, firstError, errors);
        this.setState({
            hasError
        });
    }

    onSubmit(hasError, formStates, formModel) {
        console.log('submitted', hasError, formStates, formModel);
        if (!hasError) {
            const { firstname, lastname, email, age, note, preference, likes } = formModel;
            const user = { firstname, lastname, email, age, note, preference, likes };
            console.log('save user ...', user);
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
                />
            </div>
        );
    }
}

export default HomePage;

