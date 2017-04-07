import React from 'react';
import { render } from 'react-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Home from './components/HomePage';

class App extends React.Component {
    render() {
        return (
            <Home />
        );
    }
}

render(<App />, document.getElementById('app'));
