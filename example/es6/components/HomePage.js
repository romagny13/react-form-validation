import React from 'react';
import { Validator } from '../../../src/common/validators';
import { Checkbox } from '../../../src/components/Checkbox';
import { CheckboxGroup } from '../../../src/components/CheckboxGroup';
import { Form } from '../../../src/components/FormComponent';
import { FormGroup } from '../../../src/components/FormGroup';
import { Input } from '../../../src/components/Input';
import { RadioGroup } from '../../../src/components/RadioGroup';
import { Select } from '../../../src/components/Select';
import { TextArea } from '../../../src/components/TextArea';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.user = {
            firstname: 'Marie',
            lastname: 'Bellin',
            email: '',
            age: 20,
            list: '2',
            preference: 'b',
            likes: ['Milk', 'Cakes']
        };

        this.validators = {
            'firstname': [Validator.required(), Validator.minLength(3)],
            'lastname': [Validator.maxLength(10)],
            'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],
            'age': [Validator.custom((value) => {
                return value > 0 && value < 120;
            })],
            'agree': [Validator.required()],
            'likes': [Validator.custom(() => {
                return this.user.likes.length > 0;
            }, 'Please select one or more items.')]
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(name, value) {
        if (name === 'agree') {
            console.log('App agree', value);
        }
        else {
            this.user[name] = value;
            console.log('user updated', this.user);
        }
    }

    onSubmit(hasError, formStates) {
        console.log('submitted', hasError, formStates);
        if (!hasError) {
            console.log('save user', this.user);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Form binding and validation</h2>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup className="form-group" validators={this.validators['firstname']}>
                        <label htmlFor="firstname">Firstname:</label>
                        <Input id="firstname" name="firstname" value={this.user.firstname} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['lastname']}>
                        <label htmlFor="lastname">Lastname:</label>
                        <Input id="lastname" name="lastname" value={this.user.lastname} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['email']}>
                        <label htmlFor="email">Email:</label>
                        <Input id="email" name="email" value={this.user.email} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['age']}>
                        <label htmlFor="age">Age:</label>
                        <Input type="number" id="age" name="age" value={this.user.age} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label htmlFor="list">List (no validation):</label>
                        <Select name="list" dataSource={[1, 2, 3]} current={this.user.list} onChange={this.onChange} className="form-control" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <label>Preference:</label>
                        <RadioGroup name="preference" dataSource={['a', 'b', 'c']} current={this.user.preference} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['likes']}>
                        <label>Like (one or more items):</label>
                        <CheckboxGroup name="likes" dataSource={['Cakes', 'Milk', 'Nutella']} currents={this.user.likes} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="form-group" validators={this.validators['agree']}>
                        <div className="checkbox">
                            <label>
                                <Checkbox name="agree" onChange={this.onChange} />Agree to conditions
                            </label>
                        </div>
                    </FormGroup>
                    <input className="btn btn-default" type="submit" value="Submit" />
                </Form>
            </div>
        );
    }
}

export default HomePage;
