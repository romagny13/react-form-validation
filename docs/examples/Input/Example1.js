import React from 'react';
import { Input, Label } from 'romagny13-react-form-validation';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                firstname: 'Marie'
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
                <Label htmlFor="firstname" asterisk>Firstname</Label>
                <Input id="firstname" name="firstname" value={model["firstname"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                {this.state.touched["firstname"] && <span className="touched">Touched!</span>}
                <pre>
                    {JSON.stringify(this.state.model)}
                </pre>
            </div>
        );
    }
}

export default Example1;


