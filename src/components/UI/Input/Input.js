import React from 'react';

const Input = (props) => {
    let inputElement = null;
    let labelElement = null;
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                        className={props.class}
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                        className={props.class}
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changed}/>;
            break;
        default:
            inputElement = <input />
    }
    if (props.label !== undefined) {
        labelElement =  <label className="label">{props.label}</label>
    }
    return (
        <div className={props.containerClass}>
            {labelElement}
            {inputElement}
        </div>
    );
}

export default Input;