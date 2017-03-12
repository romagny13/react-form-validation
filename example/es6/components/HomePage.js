import React from 'react';
import { Validator } from '../../../src/common/validators';
import { FormComponent } from '../../../src/components/form';
import { getInitialFormState, getElementValue } from '../../../src/common/util';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        // form config (= model + form elements)
        let formConfig = {
            'firstname': [Validator.required(), Validator.minLength(3)],
            'lastname': [Validator.maxLength(10)],
            'email': [Validator.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],
            'age': [Validator.custom((value) => {
                return value > 0 && value < 120;
            })],
            'agree': [Validator.required()],
            'likes': [Validator.custom(() => {
                return this.state.user.likes.length > 0;
            }, 'oneOrMore')]
        };

        // model
        let user = {
            firstname: 'Marie',
            lastname: 'Bellin',
            email: '',
            age: 20,
            list: '2',
            preference: 'b',
            likes: ['Milk', 'Cakes']
        };

        // form elements
        let formElements = {
            agree: false
        };

        // form states (errors)
        let formStates = getInitialFormState(formConfig);
        this.state = {
            formConfig,
            user,
            formElements,
            formStates,
            hasError: false
        };

        this.onChange = this.onChange.bind(this);
        this.onFormElementChange = this.onFormElementChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.addRemoveToLikes = this.addRemoveToLikes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    indexOfLike(value) {
        let likes = this.state.user.likes;
        for (let i = 0; i < likes.length; i++) {
            if (likes[i] === value) {
                return i;
            }
        }
        return -1;
    }

    addRemoveToLikes(event) {
        // update source array and validation
        let value = event.target.value;
        let user = this.state.user;
        let index = this.indexOfLike(value);
        if (index !== -1) {
            user.likes.splice(index, 1);
        }
        else {
            user.likes.push(value);
        }

        this.setState({
            user
        });
    }

    onChange(event) {
        let name = event.target.name;
        let value = getElementValue(event.target);
        let user = this.state.user;

        user[name] = value;
        this.setState({
            user
        });
    }

    onFormElementChange(event) {
        let name = event.target.name;
        let value = getElementValue(event.target);
        let formElements = this.state.formElements;

        formElements[name] = value;
        this.setState({
            formElements
        });
    }

    onStateChange(hasError, formStates) {
        // console.log('state changed', formStates);
        this.setState({
            hasError,
            formStates
        });
    }

    onSubmit(hasError, formStates) {
        if (!hasError) {
            /*eslint no-console: 0 */
            console.log('save', this.state.user);
        }
        else {
            this.setState({
                hasError,
                formStates
            });
        }
    }

    render() {
        let likeCakes = this.indexOfLike('Cakes') !== -1;
        let likeMilk = this.indexOfLike('Milk') !== -1;
        let likeNutella = this.indexOfLike('Nutella') !== -1;

        let groupClassNames = {};
        for (let name in this.state.formStates) {
            if (this.state.formStates.hasOwnProperty(name)) {
                let control = this.state.formStates[name];
                let className = control.hasError ? 'form-group has-error' : 'form-group';
                groupClassNames[name] = className;
            }
        }

        let jsonSource = JSON.stringify(this.state.user);
        let jsonForm = JSON.stringify(this.state.formStates);

        let result = this.state.hasError ? 'Fix the errors.' : 'Ok.';

        return (
            <div>
                <h2>Form binding and validation with React</h2>
                <FormComponent formConfig={this.state.formConfig} onStateChange={this.onStateChange} onSubmit={this.onSubmit}>
                    <div className={groupClassNames['firstname']}>
                        <label htmlFor="firstname">Firstname:</label>
                        <input type="text" id="firstname" name="firstname" value={this.state.user.firstname} onChange={this.onChange} className="form-control" />
                        {this.state.formStates.firstname.errors.required ? (
                            <span className="help-block">This field is required</span>
                        ) : null}
                        {this.state.formStates.firstname.errors.minLength ? (
                            <span className="help-block">Please enter at least than 3 characters.</span>
                        ) : null}
                    </div >
                    <div className={groupClassNames['lastname']}>
                        <label htmlFor="lastname">Lastname:</label>
                        <input type="text" id="lastname" name="lastname" value={this.state.user.lastname} onChange={this.onChange} className="form-control" />
                        {this.state.formStates.lastname.errors.maxLength ? (
                            <span className="help-block">Please enter no more than 10 characters.</span>
                        ) : null}
                    </div>
                    <div className={groupClassNames['email']}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" value={this.state.user.email} onChange={this.onChange} className="form-control" />
                        {this.state.formStates.email.errors.pattern ? (
                            <span className="help-block">Please enter a valid email.</span>
                        ) : null}
                    </div>

                    <div className={groupClassNames['age']}>
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" value={this.state.user.age} onChange={this.onChange} className="form-control" />
                        {this.state.formStates.age.errors.custom ? (
                            <span className="help-block">Please enter a valid age.</span>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="list">List (no validation):</label>
                        <div>
                            <select name="list" value={this.state.user.list} onChange={this.onChange} className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>

                    <div className={groupClassNames['preference']}>
                        <label>Preference:</label>
                        <div>
                            <input type="radio" name="preference" value="a" checked={this.state.user.preference === 'a'} onChange={this.onChange} />A<br />
                            <input type="radio" name="preference" value="b" checked={this.state.user.preference === 'b'} onChange={this.onChange} />B<br />
                            <input type="radio" name="preference" value="c" checked={this.state.user.preference === 'c'} onChange={this.onChange} />C
                        </div>
                    </div>

                    <div className={groupClassNames['likes']}>
                        <label>Like (one or more items):</label>
                        <div>
                            <input type="checkbox" name="likes" value="Cakes" checked={likeCakes} onChange={this.addRemoveToLikes} />Cakes<br />
                            <input type="checkbox" name="likes" value="Milk" checked={likeMilk} onChange={this.addRemoveToLikes} />Milk<br />
                            <input type="checkbox" name="likes" value="Nutella" checked={likeNutella} onChange={this.addRemoveToLikes} />Nutella
                            {this.state.formStates.likes.errors.oneOrMore ? (
                                <span className="help-block">Please select one or more items.</span>
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className={groupClassNames['agree']}>
                        <div className="checkbox"> <label><input type="checkbox" name="agree" checked={this.state.formElements.agree === true} onChange={this.onFormElementChange} />Agree to conditions</label></div>
                        {this.state.formStates.agree.errors.required ? (
                            <span className="help-block">Please agree to conditions.</span>
                        ) : null}
                    </div>
                    <input className="btn btn-default" type="submit" value="Submit" />
                </FormComponent>
                <br />
                <div className="sumary">{result}</div>
                <h4>Source:</h4>
                <pre>{jsonSource}</pre>
                <h4>Errors:</h4>
                <pre>{jsonForm}</pre>
            </div>
        );
    }
}

export default HomePage;
