import React from 'react';
import { CheckboxGroup, Label } from 'romagny13-react-form-validation';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                likes: ['Milk', 'Cakes']
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
        const { model, touched } = this.state;
        return (
            <div>
                <Label asterisk>Like (multiple choice)</Label>
                <CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={model["likes"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                {touched["likes"] && <span className="touched">Touched!</span>}
                <pre>
                    {JSON.stringify(model)}
                </pre>
            </div>
        );
    }
}

export default Example1;

