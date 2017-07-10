import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LightGroup } from 'romagny13-react-form-validation';

const SimpleForm = ({ model, onSubmit, onValueChange, errors, submitted }) => {
    console.log('render form', model);
    return (
        <form onSubmit={onSubmit}>
            <LightGroup error={errors["firstname"]}>
                <label htmlFor="firstname" className="control-label">Firstname</label>
                <input id="firstname" name="firstname" value={model["firstname"]} onChange={onValueChange} className="form-control" autoFocus />
            </LightGroup>
            <LightGroup error={errors["lastname"]}>
                <label htmlFor="lastname" className="control-label">Lastname</label>
                <input id="lastname" name="lastname" value={model["lastname"]} onChange={onValueChange} className="form-control" />
            </LightGroup>
            <LightGroup error={errors["password"]}>
                <label htmlFor="password" className="control-label">Password</label>
                <input type="password" id="password" name="password" value={model["password"]} onChange={onValueChange} className="form-control" placeholder="Password" />
            </LightGroup>
            <LightGroup error={errors["confirmPassword"]}>
                <label htmlFor="confirmPassword" className="control-label">Confirm password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={model["confirmPassword"]} onChange={onValueChange} className="form-control" placeholder="Confirm password" />
            </LightGroup>
            <LightGroup error={errors["email"]}>
                <label htmlFor="email" className="control-label">Email</label>
                <input id="email" name="email" value={model["email"]} onChange={onValueChange} className="form-control" placeholder="example@domain.com" />
            </LightGroup>
            <LightGroup error={errors["age"]}>
                <label htmlFor="age" className="control-label">Age</label>
                <input type="number" id="age" name="age" value={model["age"] || ''} onChange={onValueChange} className="form-control" />
            </LightGroup>
            <LightGroup>
                <label htmlFor="list" className="control-label">List (no validation)</label>
                <select name="list" value={model['list']} onChange={onValueChange} className="form-control">
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                </select>
            </LightGroup>
            <LightGroup error={errors["preference"]}>
                <label>Preference</label>
                <div>
                    <label className="radio-inline"><input type="radio" name="preference" value="a" checked={model['preference'] === "a"} onChange={onValueChange} />A</label>
                    <label className="radio-inline"><input type="radio" name="preference" value="b" checked={model['preference'] === "b"} onChange={onValueChange} />B</label>
                    <label className="radio-inline"><input type="radio" name="preference" value="c" checked={model['preference'] === "c"} onChange={onValueChange} />C</label>
                </div>
            </LightGroup>
            <LightGroup error={errors["likes"]}>
                <label>Like (multiple choice)</label>
                <div className="checkbox"><label><input type="checkbox" name="likes" value="Milk" checked={model['likes'].indexOf('Milk') !== -1} onChange={onValueChange} />Milk</label></div>
                <div className="checkbox"><label><input type="checkbox" name="likes" value="Cakes" checked={model['likes'].indexOf('Cakes') !== -1} onChange={onValueChange} />Cakes</label></div>
                <div className="checkbox"><label><input type="checkbox" name="likes" value="Nutella" checked={model['likes'].indexOf('Nutella') !== -1} onChange={onValueChange} />Nutella</label></div>
            </LightGroup>
            <LightGroup>
                <label>Note</label>
                <textarea name="note" value={model["note"]} onChange={onValueChange} className="form-control" rows="5" />
            </LightGroup>
            <LightGroup error={errors["file"]}>
                <input type="file" name="file" value={model["file"]} onChange={onValueChange} accept="image/*" />
            </LightGroup>
            <LightGroup error={errors["agree"]}>
                <div className="checkbox"><label><input type="checkbox" name="agree" checked={model['agree']} onChange={onValueChange} />Agree to conditions</label></div>
            </LightGroup>
            <input type="submit" value="Submit" />
            <pre>
                {JSON.stringify(model)}
            </pre>
        </form >
    );
};
SimpleForm.propTypes = {
    model: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired
};


export default SimpleForm;

