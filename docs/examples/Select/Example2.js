import React from 'react';
import { Select, Label } from 'romagny13-react-form-validation';

/** Select multiple (set multiple and use values array instead value) */
class Example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                list: ['a', 'c'],
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
        touched[name] = true;
        this.setState({
            touched
        });
    }
    render() {
        const { model, errors, touched, submitted } = this.state;
        return (
            <div>
                <Label htmlFor="list" className="control-label">List (no validation)</Label><br />
                <Select name="list" multiple dataSource={['a', 'b', 'c']} values={model['list']} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                {touched["list"] && <span className="touched">Touched!</span>}
                <pre>
                    {JSON.stringify(model)}
                </pre>
            </div>
        );
    }
}

export default Example2;
