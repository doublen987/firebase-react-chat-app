import React from 'react';
import "./Button.css";

const Button = (props) => (
    <button
    disabled={props.disabled}
    onClick={props.onClick}
    className={"button " + props.theme + " " + props.class}
    type={props.type}
    >{props.children}</button>
);

export default Button;