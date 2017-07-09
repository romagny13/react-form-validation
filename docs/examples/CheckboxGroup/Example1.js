import React from 'react';
import { CheckboxGroup, Label } from 'romagny13-react-form-validation';

/** Control is touched on lost focus */
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
        touched[name] = 'touched!';
        this.setState({
            touched
        });
    }
    render() {
        return (
            <div>
                <Label asterisk>Like (multiple choice)</Label>
                <CheckboxGroup name="likes" dataSource={["Milk", "Cakes", "Nutella"]} values={this.state.model["likes"]} onValueChange={this.onValueChange} onTouch={this.onTouch}/>
                {this.state.touched["likes"] && <span>Touched!</span>}
                <pre>
                    {JSON.stringify(this.state.model)}
                </pre>
            </div>
        );
    }
}

export default Example1;

