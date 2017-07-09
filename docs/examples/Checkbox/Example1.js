import React from 'react';
import { Checkbox, Label } from 'romagny13-react-form-validation';

/** Control is touched on lost focus */
class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                agree: false
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
                <div className="checkbox">
                    <Label asterisk>
                        <Checkbox name="agree" checked={model["agree"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                        I agree to terms
                    </Label>
                </div>
                {touched["agree"] && <span className="touched">Touched!</span>}
                <pre>
                    {JSON.stringify(model)}
                </pre>
            </div>
        );
    }
}

export default Example1;

