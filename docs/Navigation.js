import React from 'react';
import PropTypes from 'prop-types';

export const Navigation = ({ components }) => {
    return (
        <div className="navigation">
            <ul>
                <li className="navigation__home"><a href="#Home">Home</a></li>
                <li><a href="#Api">Api</a></li>
            </ul>

            <ul>
                <li className="navigation__heading">Components</li>
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
        </div>
    );
};
Navigation.propTypes = {
    components: PropTypes.array.isRequired
};

