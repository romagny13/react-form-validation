import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showCode: false };

        this.toggleCode = this.toggleCode.bind(this);
    }

    componentWillReceiveProps(props) {
        if (this.state.showCode) {
            this.setState({ showCode: false });
        }
    }

    toggleCode(event) {
        event.preventDefault();
        this.setState(prevState => {
            return { showCode: !prevState.showCode };
        });
    }

    render() {
        const { showCode } = this.state;
        const { code, description, name } = this.props.example;
        const ExampleComponent =  require(`../examples/${this.props.componentName}/${name}`).default;
        return (
            <div className="example">
                {description && <h4>{description}</h4>}

                <ExampleComponent />

                <p><a href="#" onClick={this.toggleCode}>{showCode ? "Hide" : "Show"} Code</a></p>
                {showCode && <CodeExample code={code} />}
            </div>
        )
    }
}
Example.propTypes = {
    example: PropTypes.object.isRequired,
    componentName: PropTypes.string.isRequired
};
export default Example;