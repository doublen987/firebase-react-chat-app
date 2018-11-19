import React from 'react';
import './Message.css';

const Message = (props) => (
    <div className="message">
	<div className="message-header">
		<img className="sender-profile-picture" src={props.image}></img>
		<span className="sender-username">{props.name}</span>
	</div>
        <div className="message-content">{props.message}</div>
    </div>
);

export default Message;
