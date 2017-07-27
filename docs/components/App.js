import React from 'react';
import PropTypes from 'prop-types';

import componentData from '../componentData';

// components
import Navigation from './Navigation';
import Footer from './Footer';

// pages
import HomePage from './pages/HomePage';
import GettingStartedPage from './pages/GettingStartedPage';
import ComponentPage from './pages/ComponentPage';

function getRoute() {
    return window.location.hash.substr(1);
}

function getComponentLinks(componentData) {
    let result = {};
    componentData.forEach((component) => {
        result[component.name] = component.name;
    });
    return result;
}

const sections = {
    basics: {
        links: {
            'Home': 'Home',
            'GettingStarted': 'Getting Started',
            'Helpers': 'Helpers'
        }
    },
    components: {
        title: 'Components',
        links: getComponentLinks(componentData)
    }
};

function getActivePage(route) {
    return route ? route : 'Home';
}

function getPage(route) {
    if (!route || route === 'Home') {
        return <HomePage />;
    }
    else if (route === 'GettingStarted') {
        return <GettingStartedPage />;
    }
    else if (route === 'Helpers') {
        window.location.replace('../esdoc/index.html');
    }
    else {
        const component = componentData.filter(component => component.name === route)[0];
        if (component) {
            return <ComponentPage component={component} />;
        }
        else {
            return <HomePage />;
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            route: getRoute()
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ route: getRoute() });
        });
    }

    render() {
        let Page = getPage(this.state.route);
        let activePage = getActivePage(this.state.route);
        return (
            <div className="page">
                <div className="content clearfix">
                    <Navigation sections={sections} active={activePage} />
                    {getPage(this.state.route)}
                    <Footer />
                </div>

            </div>
        );
    }
}
export default App;
