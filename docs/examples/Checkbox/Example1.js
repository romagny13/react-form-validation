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
        touched[name] = 'touched!';
        this.setState({
            touched
        });
    }
    render() {
        return (
            <div>
                <div className="checkbox">
                    <Label asterisk>
                        <Checkbox name="agree" checked={this.state.model.agree} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                        I agree to terms
                    </Label>
                </div>
                {this.state.touched["agree"] && <span>Touched!</span>}
                <pre>
                    {JSON.stringify(this.state.model)}
                </pre>
            </div>
        );
    }
}

export default Example1;

