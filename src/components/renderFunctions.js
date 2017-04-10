import React from 'react';

export const renderForm = (props, children) => React.createElement('form', props, children);
export const renderValidator = (root, validationStates) => {
    if (typeof root.type === 'function') {
        // component
        // validation states + root element props
        const params = Object.assign({}, validationStates, root.props);
        const component = new root.type(params);
        if (typeof component.type === 'string') {
            // stateless component
            return React.createElement(component.type, component.props, component.props.children);
        }
        else if (!component.type) {
            // extends react component
            let resolve = component.render();
            return React.createElement(resolve.type, resolve.props, resolve.props.children);
        }
    }
    else if (typeof root.type === 'string') {
        // render with no validation
        return React.createElement(root.type, root.props, root.props.children);
    }
    throw new Error('Cannot resolve the component');
};
export const renderInput = (props) => React.createElement('input', props);
export const renderCheckbox = (props) => <input type="checkbox" {...props} />;
export const renderCheckboxGroup = (props, dataSource, indexOf, onChange, onBlur) => {
    return (
        <div>
            {dataSource.map((current, i) => {
                return (<div key={i}>
                    <input
                        type="checkbox"
                        checked={indexOf(current) !== -1}
                        value={current}
                        onChange={onChange}
                        onBlur={onBlur}
                        {...props} />
                    {current}
                </div>);
            })}
        </div>
    );
};
export const renderRadioGroup = (props, dataSource, current, onChange, onBlur) => {
    return (
        <div>
            {dataSource.map((dataItem, i) => {
                return (<div key={i}>
                    <input
                        type="radio"
                        value={dataItem}
                        checked={current === dataItem}
                        onChange={onChange}
                        onBlur={onBlur}
                        {...props} />
                    {dataItem}
                </div>);
            })}
        </div>
    );
};
export const renderSelect = (props, dataSource, onChange) => {
    return (
        <select {...props}>
            {dataSource.map((current, i) => {
                return <option key={i} value={current} onChange={onChange}>{current}</option>;
            })}
        </select>
    );
};
export const renderTextArea = (props) => React.createElement('textarea', props);
export const renderSubmit = (props, disabled) => <input type="submit" disabled={disabled} {...props} />;
