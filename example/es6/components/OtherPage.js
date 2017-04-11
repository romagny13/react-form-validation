import React, { PropTypes, Component } from 'react';
import { Form, Validator, Checkbox, CheckboxGroup, Input, RadioGroup, Select, TextArea, Submit, custom, required } from '../../../src/index';

const model = {
    color: '#004040',
    date: '',
    month: '',
    search: 'My search',
    tel: '',
    time: '',
    url: 'http://google.fr',
    week: ''
};

const MyFormGroup = ({ hasError, hasSuccess, error, label, children }) => {
    let groupClassName = hasError ? 'form-group has-error' : 'form-group';
    return (
        <div className={groupClassName}>
            <label className="col-sm-3 control-label">{label}</label>
            <div className="col-sm-9">
                {children}
                {hasError && <span className="help-block">{error}</span>}
            </div>
        </div>
    );
}

class AboutPage extends React.Component {
    onSubmit(e) {
        console.log(e);
    }
    render() {
        return (<div style={{ padding: 24, border: "solid #f7f7f9" }}>
            <Form model={model} mode="touched" onSubmit={this.onSubmit} className="form-horizontal" stye={{ maxWidth: 530 }}>
                <h2 style={{ margin: "20px 0 30px 150px" }}>Input types</h2>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Date">
                        <Input type="date" name="date" value={model.date} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Month">
                        <Input type="month" name="month" value={model.month} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Week">
                        <Input type="week" name="week" value={model.week} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Time">
                        <Input type="time" name="time" value={model.time} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Search">
                        <Input type="search" name="search" value={model.search} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Tel">
                        <Input type="tel" name="tel" value={model.tel} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Url">
                        <Input type="url" name="url" value={model.url} className="form-control" />
                    </MyFormGroup>
                </Validator>
                <Validator validators={[required()]}>
                    <MyFormGroup label="Color">
                        <Input type="color" name="color" value={model.color} />
                    </MyFormGroup>
                </Validator>
                <div className="form-group">
                    <div className="col-sm-offset-3">
                        <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                    </div>
                </div>
            </Form>
        </div>);
    }
}
export default AboutPage;
