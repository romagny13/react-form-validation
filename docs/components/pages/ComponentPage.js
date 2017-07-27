import React from 'react';
import PropTypes from 'prop-types';
import Example from '../Example';
import PropsComponent from '../PropsComponent';

import { changeMetaDescription } from '../../utils/seo';

class ComponentPage extends React.Component {
    componentWillMount() {
        this.changeMetaDescription(this.props);
    }

    componentWillReceiveProps(props) {
        this.changeMetaDescription(props);
    }

    changeMetaDescription(props) {
        let content = props.component.name + ' - ' + props.component.description;
        changeMetaDescription(content);
    }

    render() {
        const { name, description, props, examples } = this.props.component;
        return (
            <div className="componentpage">
                <h1 className="page-title">{name}</h1>

                <div className="description">{description}</div>

                <h3>Example{examples.length > 1 && "s"}</h3>
                {examples.length > 0 ? examples.map(example => <Example key={example.name} example={example} componentName={name} />) : "No examples."}

                <h3>Props</h3>
                {props ? <PropsComponent props={props} /> : "This component accepts no props."}
            </div>
        );
    }
}
ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};
ComponentPage.defaultProps = {
    examples: []
};
export default ComponentPage;

