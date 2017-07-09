import React from 'react';
import { Select, Label } from 'romagny13-react-form-validation';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
              list: 'b',
            },
            touched: {}
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onTouch = this.onTouch.bind(this);
    }
    onValueChange(name, value) {
        let model = this.state.model;
        model[name] = value;

        this.setState({
            model
        });
    }
    onTouch(name) {
        let touched = this.state.touched;
        touched[name] = 'touched!';
        this.setState({
            touched
        });
    }
    render() {
        const { model, errors, touched, submitted } = this.state;
        return (
            <div>
                <Label htmlFor="list" className="control-label">List (no validation)</Label>
                <Select name="list" dataSource={[1, 2, 3]} value={model['list']} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                {this.state.touched["list"] && <span>Touched!</span>}
                <pre>
                    {JSON.stringify(this.state.model)}
                </pre>
            </div>
        );
    }
}

export default Example1;
