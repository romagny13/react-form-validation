import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import {
    Checkbox,
    CheckboxGroup,
    Form,
    FormGroup,
    Input,
    RadioGroup,
    Select,
    Submit,
    TextArea,
    Validator,
    renderForm,
    renderValidator,
    renderInput,
    renderCheckbox,
    renderCheckboxGroup,
    renderRadioGroup,
    renderSelect,
    renderSubmit,
    renderTextArea
} from '../../../src/components';
import { required } from '../../../src/common/validators';

describe('render functions', () => {

    it('Should render Form', () => {
        let isCalled = false;
        let props = {
            id: 'my-form',
            className: 'form-group'
        };
        const wrapper = mount(renderForm(props, (event) => {
            event.preventDefault();
            isCalled = true;
        }, <input type="text" value="my value" />));

        let form = wrapper.find('form');
        assert.equal(form.prop('id'), props.id);
        assert.isTrue(form.hasClass(props.className));
        // find children
        let inputText = wrapper.find('input');
        assert.equal(inputText.prop('value'), 'my value');
        // submit
        form.simulate('submit');
        assert.isTrue(isCalled);
    });

    it('Should render Input', () => {
        let props = {
            id: 'my-input',
            className: 'form-control'
        };
        const wrapper = shallow(renderInput(props, 'my value'));

        let input = wrapper.find('input');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('value'), 'my value');
    });

    it('Should render Checkbox', () => {
        let props = {
            id: 'my-input',
            className: 'form-control'
        };
        const wrapper = shallow(renderCheckbox(props, false));

        let input = wrapper.find('input');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('checked'), false);
    });

    it('Should render Checkbox checked', () => {
        let props = {
            id: 'my-input',
            className: 'form-control'
        };
        const wrapper = shallow(renderCheckbox(props, true));

        let input = wrapper.find('input');
        assert.equal(input.prop('checked'), true);
    });

    it('Should render CheckboxGroup', () => {
        let props = {
            className: 'form-control'
        };
        let dataSource = ['a', 'b', 'c'];
        let currents = ['a', 'b'];


        const wrapper = shallow(renderCheckboxGroup({
            props, dataSource, currents, onChange: () => {
                // on change
            }, onBlur: () => {
                // on blur
            }
        }));

        let input0 = wrapper.find('input').at(0);
        let input1 = wrapper.find('input').at(1);
        let input2 = wrapper.find('input').at(2);
        assert.equal(input0.prop('value'), 'a');
        assert.equal(input0.prop('checked'), true);
        assert.equal(input0.prop('type'), 'checkbox');
        assert.equal(input0.prop('name'), props.name);
        assert.isTrue(input0.hasClass(props.className));
        assert.equal(input1.prop('value'), 'b');
        assert.equal(input1.prop('checked'), true);
        assert.equal(input2.prop('value'), 'c');
        assert.equal(input2.prop('checked'), false);
    });

    it('Should render RadioGroup', () => {
        let props = {
            className: 'form-control'
        };
        let dataSource = ['a', 'b', 'c'];
        let current = 'b';

        const wrapper = shallow(renderRadioGroup({
            props, dataSource, current, onChange: () => {
                // on change
            }, onBlur: () => {
                // on blur
            }
        }));

        let input0 = wrapper.find('input').at(0);
        let input1 = wrapper.find('input').at(1);
        let input2 = wrapper.find('input').at(2);
        assert.equal(input0.prop('value'), 'a');
        assert.equal(input0.prop('checked'), false);
        assert.equal(input0.prop('type'), 'radio');
        assert.equal(input0.prop('name'), props.name);
        assert.isTrue(input0.hasClass(props.className));
        assert.equal(input1.prop('value'), 'b');
        assert.equal(input1.prop('type'), 'radio');
        assert.equal(input1.prop('checked'), true);
        assert.equal(input2.prop('value'), 'c');
        assert.equal(input2.prop('type'), 'radio');
        assert.equal(input2.prop('checked'), false);
    });

    it('Should render Select', () => {
        let props = {
            id: 'my-select-id',
            className: 'form-control'
        };
        let dataSource = ['a', 'b', 'c'];
        let current = 'b';

        const wrapper = shallow(renderSelect(props, dataSource, current, () => {
            // on change
        }, () => {
            // on blur
        }));
        let select = wrapper.find('select');
        assert.equal(select.prop('value'), 'b');
        assert.equal(select.prop('id'), props.id);
        assert.isTrue(select.hasClass(props.className));
        let option0 = select.find('option').at(0);
        let option1 = select.find('option').at(1);
        let option2 = select.find('option').at(2);
        assert.equal(option0.prop('value'), 'a');
        assert.equal(option0.text(), 'a');
        assert.equal(option1.prop('value'), 'b');
        assert.equal(option1.text(), 'b');
        assert.equal(option2.prop('value'), 'c');
        assert.equal(option2.text(), 'c');
    });

    it('Should render Select 2', () => {
        let props = {
            id: 'my-select-id',
            className: 'form-control'
        };
        let dataSource = ['My a', 'My b', 'My c'];
        let current = 'My b';

        const wrapper = shallow(renderSelect(props, dataSource, current, () => {
            // on change
        }, () => {
            // on blur
        }));
        let select = wrapper.find('select');
        assert.equal(select.prop('value'), 'My b');
        assert.equal(select.prop('id'), props.id);
        assert.isTrue(select.hasClass(props.className));
        let option0 = select.find('option').at(0);
        let option1 = select.find('option').at(1);
        let option2 = select.find('option').at(2);
        assert.equal(option0.prop('value'), 'My a');
        assert.equal(option0.text(), 'My a');
        assert.equal(option1.prop('value'), 'My b');
        assert.equal(option1.text(), 'My b');
        assert.equal(option2.prop('value'), 'My c');
        assert.equal(option2.text(), 'My c');
    });

    it('Should render Submit', () => {
        let props = {
            id: 'my-input',
            className: 'form-control'
        };
        const wrapper = shallow(renderSubmit(props, false));

        let input = wrapper.find('input');
        assert.equal(input.prop('type'), 'submit');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('disabled'), false);
    });

    it('Should render Submit disabled', () => {
        let props = {
            id: 'my-input',
            className: 'form-control'
        };
        const wrapper = shallow(renderSubmit(props, true));

        let input = wrapper.find('input');
        assert.equal(input.prop('disabled'), true);
    });

    it('Should render TextArea', () => {
        let props = {
            id: 'my-textarea',
            className: 'form-control'
        };
        const wrapper = shallow(renderTextArea(props, 'my value'));

        let textarea = wrapper.find('textarea');
        assert.equal(textarea.prop('id'), props.id);
        assert.isTrue(textarea.hasClass(props.className));
        assert.equal(textarea.prop('value'), 'my value');
    });

    it('Should render Validator string content with no validation', () => {
        let props = {
            id: 'my-input',
            className: 'form-control',
            value: 'Marie'
        };
        let validationStates = {
            hasError: false,
            hasSuccess: false,
            error: ''
        };
        const wrapper = mount(renderValidator({
            type: 'input',
            props
        }, validationStates));

        let input = wrapper.find('input');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('value'), props.value);
    });

    it('Should render Validator string content and children with no validation', () => {
        let props = {
            id: 'my-input',
            className: 'form-control',
            value: 'Marie'
        };

        let validationStates = {
            hasError: false,
            hasSuccess: false,
            error: ''
        };
        const wrapper = mount(renderValidator({
            type: "div",
            props: {
                children: React.createElement('input', props)
            }
        }, validationStates));

        let input = wrapper.find('input');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('value'), props.value);
    });

    class MyFormGroup extends Component {
        render() {
            return (
                <div>
                    <p>{this.props.hasError ? 'has error' : 'no error'}</p>
                    <p>{this.props.hasSuccess ? 'has success' : 'no success'}</p>
                    <p>{this.props.error}</p>
                    {this.props.children}
                </div>
            );
        }
    }

    const MyStatelessFormGroup = ({ hasError, hasSuccess, error, children }) => {
        let groupClassName = hasError ? 'form-group has-error' : 'form-group';
        return (
            <div>
                <p>{hasError ? 'has error' : 'no error'}</p>
                <p>{hasSuccess ? 'has success' : 'no success'}</p>
                <p>{error}</p>
                {children}
            </div>
        );
    };

    it('Should render Validator with component', () => {
        let props = {
            id: 'my-input',
            className: 'form-control',
            value: 'Marie'
        };

        let validationStates = {
            hasError: true,
            hasSuccess: true,
            error: 'My error'
        };

        const wrapper = mount(renderValidator({
            type: MyFormGroup,
            props: {
                children: React.createElement(Input, props)
            }
        }, validationStates));

        let input = wrapper.find('input');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('value'), props.value);
        // validation states?
        let p0 = wrapper.find('p').at(0);
        let p1 = wrapper.find('p').at(1);
        let p2 = wrapper.find('p').at(2);
        assert.equal(p0.text(), 'has error');
        assert.equal(p1.text(), 'has success');
        assert.equal(p2.text(), validationStates.error);
    });

    it('Should render Validator with stateless component', () => {
        let props = {
            id: 'my-input',
            className: 'form-control',
            value: 'Marie'
        };

        let validationStates = {
            hasError: true,
            hasSuccess: true,
            error: 'My error'
        };

        const wrapper = mount(renderValidator({
            type: MyStatelessFormGroup,
            props: {
                children: React.createElement(Input, props)
            }
        }, validationStates));

        // children injected ?
        let input = wrapper.find('input');
        assert.equal(input.prop('id'), props.id);
        assert.isTrue(input.hasClass(props.className));
        assert.equal(input.prop('value'), props.value);
        // validation states?
        let p0 = wrapper.find('p').at(0);
        let p1 = wrapper.find('p').at(1);
        let p2 = wrapper.find('p').at(2);
        assert.equal(p0.text(), 'has error');
        assert.equal(p1.text(), 'has success');
        assert.equal(p2.text(), validationStates.error);
    });
});
