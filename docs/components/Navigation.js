import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ sections, active }) => {
    return (
        <div className="navigation">
            {Object.keys(sections).map((sectionName) => {
                let section = sections[sectionName];
                return (
                    <ul key={sectionName}>
                        {section.title && <li className="navigation__heading">{section.title}</li>}
                        {Object.keys(section.links).map((linkName) => {
                            let linkValue = section.links[linkName];
                            return (
                                <li key={linkName}>
                                    <a href={`#${linkName}`} className={active === linkName && 'active'}>{linkValue}</a>
                                </li>
                            );
                        })}
                    </ul>
                );
            })}
        </div>
    );
};
Navigation.propTypes = {
    sections: PropTypes.object.isRequired,
    active: PropTypes.string
};
export default Navigation;