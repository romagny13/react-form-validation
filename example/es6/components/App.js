import React from 'react';
import PropTypes from 'prop-types';

import SimplePage from './simple/SimplePage';
import ControlsPage from './controls/ControlsPage';
import AllPage from './all/AllPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: <SimplePage />,
            active: 'simple'
        };

        this.onClickLink = this.onClickLink.bind(this);
    }

    onClickLink(event) {
        event.preventDefault();

        let targetHref = event.target.href.split('#')[1];
        let active = targetHref.substr(1);
        let page;
        if (active === 'simple') {
            page = <SimplePage />;
        }
        else if (active === 'controls') {
            page = <ControlsPage />;
        }
        else if (active === 'all') {
            page = <AllPage />;
        }

        this.setState({
            page,
            active
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
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" href="#">Sample</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className={this.state.active === "simple" && "active"}><a href="#/simple" onClick={this.onClickLink}>Simple</a></li>
                                <li className={this.state.active === "controls" && "active"}><a href="#/controls" onClick={this.onClickLink}>Compoments</a></li>
                                <li className={this.state.active === "all" && "active"}><a href="#/all" onClick={this.onClickLink}>All</a></li>
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

export default App;