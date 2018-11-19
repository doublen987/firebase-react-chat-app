import React, {Component} from "react";
import './Chat.css';
import Message from './Message/Message';
import Button from '../UI/Button/Button';
import emote from '../../assets/emote.png';
import command from '../../assets/command.png';
import FontAwesome from 'react-fontawesome';

class Chat extends Component {

    state = {
        currentChatInput: null
    }

    componentDidMount() {
        console.log(this.props.loading);
    }

    componentDidUpdate() {
        console.log(this.props.messages);
        console.log(this.props.loading);
    }
    
    sendMessageHandler = (event) => {
        event.preventDefault();
        const message = this.state.currentChatInput;
        this.props.onSendMessage(this.props.uid, this.props.name, message, this.props.profilePicURL);
    }

    inputChangedHandler = (event) => {
        //console.log(event.target.value);
        var updatedFormElement = event.target.value;
        this.setState({currentChatInput: updatedFormElement});
    }

    render() {
        let messages = null;//<Spinner />;
        if (!this.props.loading) {
            messages = this.props.messages.map(message => (
                <Message 
                    key={message.id}
                    message={message.message} 
                    image={message.profilePicURL}
		            name={message.name}
                />
            ));
        }
        return(
            <div className="chat">
                <div className="channel-name tile">Channel name</div>
                <div className="main-chat tile">
                    {messages}
                </div>
                <div className="bottom-chat-tile tile">
                    <Button class="attachment-button">
                    <FontAwesome
                        className="super-crazy-colors"
                        name="paperclip"
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    </Button>
                    <div className="chat-input-container">
                        <textarea type="text" className="chat-input" onChange={this.inputChangedHandler}></textarea>
                        <div className="pickers">
                            <span className="emote-picker picker"><a href="#"><img width="30px" height="30px" src={emote}/></a></span>
                            <span className="command-picker picker"><a href="#"><img width="30px" height="30px" src={command}/></a></span>
                        </div>
                    </div>
                    <Button class="send-message-button" onClick={this.sendMessageHandler.bind(this)}>SEND</Button>
                </div>
            </div>
        );
    }
}

export default Chat;
