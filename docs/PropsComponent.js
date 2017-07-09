import React from 'react';
import PropTypes from 'prop-types';

export const PropsComponent = ({ props }) => {
    return (
        <table className="props">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Required</th>
                </tr>
            </thead>
            <tbody>
                { 
                    Object.keys(props).map(key => {
                        return (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{props[key].description}</td>
                                <td>{props[key].type.name}</td>
                                <td>{props[key].defaultValue && props[key].defaultValue.value}</td>
                                <td>{props[key].required && "X"}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};
PropsComponent.propTypes = {
    props: PropTypes.object.isRequired
};

