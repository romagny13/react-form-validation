import React from 'react';
import PropTypes from 'prop-types';

export const Navigation = ({ components }) => {
    return (
        <ul className="navigation">
            <li className="navigation-heading">Components</li>
            {
                components.map(name => {
                    return (
                        <li key={name}>
                            <a href={`#${name}`}>{name}</a>
                        </li>
                    );
                })
            }
        </ul>
    );
};
Navigation.propTypes = {
    components: PropTypes.array.isRequired
};

