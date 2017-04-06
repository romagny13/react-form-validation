import React from 'react';
import { Validator } from '../../../src/index';
import UserForm from './UserForm';

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
            validators: {
                'firstname': [Validator.required(), Validator.minLength(3)],
                'lastname': [Validator.maxLength(10)],
                'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email.')],
                'age': [Validator.custom((value) => {
                    return value > 0 && value < 120;
                }, 'Oops ??')],
                'agree': [Validator.required()],
                'likes': [Validator.custom(() => {
                    return this.state.user.likes.length > 0;
                }, 'Please select one or more items.')]
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(hasError, formStates, formModel) {
        console.log('submitted', hasError, formStates, formModel);
        if (!hasError) {
            const { firstname, lastname, email, age, note, likes } = formModel;
            const user = { firstname, lastname, email, age, note, likes };
            console.log('save user ...', user);
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
                />
            </div>
        );
    }
}

export default HomePage;

