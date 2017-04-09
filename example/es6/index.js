import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Home from './components/HomePage';
import About from './components/AboutPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: <Home />,
            active: 'Home'
        };
        this.goHome = this.goHome.bind(this);
        this.goAbout = this.goAbout.bind(this);
    }
    goHome(event) {
        event.preventDefault();
        this.setState({
            page: <Home />,
            active: 'Home'
        });
    }

    goAbout(event) {
        event.preventDefault();
        this.setState({
            page: <About />,
            active: 'About'
        });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Sample</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className={this.state.active === "Home" && "active"}><a href="#" onClick={this.goHome}>Home</a></li>
                                <li className={this.state.active === "About" && "active"}><a href="#" onClick={this.goAbout}>About</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.state.page}
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));