import React from "react";
import "../styles/chkbox.css";

export default class CheckBox extends React.Component {
    render() {
        return (
        <label className="checkBox" style={this.props.style}>  
        <input type="checkbox" checked={this.props.value}
        onChange={this.props.onChange} />
        <span data-on={this.props.dataOn} data-off={this.props.dataOff}></span>
        </label>
        )
    }
}
