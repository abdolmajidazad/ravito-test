import React, {Component} from "react";
import {create} from "jss";
import rtl from "jss-rtl";
import {jssPreset, StylesProvider} from "@mui/styles";

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});


class RTL extends Component {
    render() {
        return <StylesProvider jss={jss}>{this.props.children}</StylesProvider>;
    }


}

export default RTL;
