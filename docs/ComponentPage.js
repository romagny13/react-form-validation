import React from 'react';
import PropTypes from 'prop-types';
import { Example } from './Example';
import { PropsComponent } from './PropsComponent';

export const ComponentPage = ({ component }) => {
    const { name, description, props, examples } = component;

    return (
        <div className="componentpage">
            <h1 className="well">{name}</h1>

            <div className="alert alert-info">{description}</div>

            <h3>Example{examples.length > 1 && "s"}</h3>
            {examples.length > 0 ? examples.map(example => <Example key={example.name} example={example} componentName={name} />) : "No examples."}

            <h3>Props</h3>
            {props ? <PropsComponent props={props} /> : "This component accepts no props."}
        </div>
    );
};
ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};
ComponentPage.defaultProps = {
    examples: []
};
