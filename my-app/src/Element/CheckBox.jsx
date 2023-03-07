import React from "react";
import "../styles/chkbox.css";

export default function CheckBox(props) {
    return (
        <label className="checkBox" style={props.style}>  
        <input type="checkbox" checked={props.value}
        onChange={props.onChange} />
        <span data-on={props.dataOn} data-off={props.dataOff}></span>
        </label>
    )
}