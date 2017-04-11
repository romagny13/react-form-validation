import React from 'react';
import { warn } from '../common/warn';

export const renderForm = (props, onSubmit, children) => <form onSubmit={onSubmit} {...props}>{children}</form>;
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
        warn('Validator: Cannot inject validation states (hasError, hasSuccess, error) to props with string content (rendering with no validation). Use a component.');
        return React.createElement(root.type, root.props, root.props.children);
    }
    throw new Error('Cannot resolve the component');
};
export const renderInput = (props, value) => <input value={value} {...props} />;
export const renderCheckbox = (props, checked) => <input type="checkbox" checked={checked} {...props} />;
export const renderCheckboxGroup = (props, dataSource, currents, onChange, onBlur) => {
    return (
        <div>
            {dataSource.map((current, i) => {
                return (<div key={i}>
                    <input
                        type="checkbox"
                        checked={currents.indexOf(current) !== -1}
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
export const renderSelect = (props, dataSource, current, onChange, onBlur) => {
    return (
        <select value={current} {...props}>
            {dataSource.map((dataItem, i) => {
                return <option key={i} value={dataItem} onChange={onChange} onBlur={onBlur}>{dataItem}</option>;
            })}
        </select>
    );
};
export const renderTextArea = (props, value) => <textarea value={value} {...props} />;
export const renderSubmit = (props, disabled) => <input type="submit" disabled={disabled} {...props} />;
