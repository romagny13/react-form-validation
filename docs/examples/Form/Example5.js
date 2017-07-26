import React from 'react';
import PropTypes from 'prop-types';

import { Form, LightGroup, Input, Submit, Reset, Label, required, minlength, ValidationHelper, clone } from 'romagny13-react-form-validation';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


// action types

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_AND_VALIDATE_USER = 'UPDATE_AND_VALIDATE_USER';
const VALIDATE_ALL = 'VALIDATE_ALL';

// action creators

const updateUser = (name, value) => {
    return { type: UPDATE_USER, key: name, value: value };
};

const updateAndValidateUser = (name, value) => {
    return { type: UPDATE_AND_VALIDATE_USER, key: name, value: value };
};

const validateAll = () => {
    return { type: VALIDATE_ALL };
};

// reducer

const validators = {
    firstname: [required('Firstname required'), minlength()],
    lastname: [required('Lastname required')]
};

const formReducer = (state, action) => {

    if (action.type === UPDATE_USER) {
        const newState = clone(state);
        newState.model[action.key] = action.value;
        return newState;
    }
    else if (action.type === UPDATE_AND_VALIDATE_USER) {
        const newState = clone(state);
        newState.model[action.key] = action.value;
        newState.errors = ValidationHelper.validateAll(newState.model, validators);
        return newState;
    }
    else if (action.type === VALIDATE_ALL) {
        const newState = clone(state);
        newState.errors = ValidationHelper.validateAll(newState.model, validators);
        newState.submitted = true;
        return newState;
    }

    return state;
}; 

// form component

const MyForm = ({ model, errors, onValueChange, onSubmit }) => {

    return (
        <form onSubmit={onSubmit}>

            <LightGroup error={errors["firstname"]}>
                <Label htmlFor="firstname" asterisk>Firstname</Label><br />
                <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={onValueChange} />
            </LightGroup>

            <LightGroup error={errors["lastname"]}>
                <Label htmlFor="lastname" asterisk>Lastname</Label><br />
                <Input id="lastname" name="lastname" value={model["lastname"]} onValueChange={onValueChange} />
            </LightGroup>

            <Submit value="Submit" errors={errors} />

            <pre>
                {JSON.stringify(model)}
            </pre>

            <pre>
                {JSON.stringify(errors)}
            </pre>
        </form>
    );
};
MyForm.propTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

// container

class MyContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onValueChange(name, value) {
        const { submitted } = this.props;

        if (submitted) {
            this.props.dispatch(updateAndValidateUser(name, value));
        }
        else {
            this.props.dispatch(updateUser(name, value));
        }
    }
    onSubmit(event) {
        event.preventDefault();

        this.props.dispatch(validateAll());
    }
    render() {
        const { model, errors } = this.props;
        return <MyForm model={model} errors={errors} onValueChange={this.onValueChange} onSubmit={this.onSubmit} />;
    }
}
MyContainer.propTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        model: state.model,
        errors: state.errors,
        submitted: state.submitted
    };
};
const Connected = connect(mapStateToProps)(MyContainer);

// store

const store = createStore(formReducer, {
    model: {
        firstname: 'Marie',
        lastname: ''
    },
    errors: {},
    submitted: false
});


// Provider + connected container

/** Redux */
export class Example5 extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Connected />
            </Provider>
        );
    }
}

export default Example5;

