import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/TaggableTextInput.css";

class TaggableTextInput extends Component {
    render() {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export default hot(TaggableTextInput);
