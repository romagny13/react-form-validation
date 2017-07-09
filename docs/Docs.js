import React from 'react';
import { Navigation } from './Navigation';
import { ComponentPage } from './ComponentPage';
import componentData from './componentData';

export class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ route: window.location.hash.substr(1) });
        });
    }

    render() {
        const { route } = this.state;
        const component = route ? componentData.filter(component => component.name === route)[0] : componentData[0];

        return (
            <div className="page">
                <div className="content clearfix">
                    <Navigation components={componentData.map(component => component.name)} />
                    <ComponentPage component={component} />
                </div>
                <div className="footer clearfix">React Form Validation © 2017 ROMAGNY13 <a href="https://github.com/romagny13/react-form-validation" className="github-link"><i className="fa fa-github fa-2x" aria-hidden="true" /></a></div>
            </div>
        );
    }
}
