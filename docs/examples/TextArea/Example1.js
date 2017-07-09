import React from 'react';
import { TextArea, Label } from 'romagny13-react-form-validation';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                note: 'My note'
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
                <Label htmlFor="note" asterisk>Note</Label><br />
                <TextArea id="note" name="note" value={model["note"]} onValueChange={this.onValueChange} onTouch={this.onTouch} />
                {touched["note"] && <span className="touched">Touched!</span>}
                <pre>
                    {JSON.stringify(model)}
                </pre>
            </div>
        );
    }
}

export default Example1;
