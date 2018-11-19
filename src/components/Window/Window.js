import React, {Component} from 'react';
import './Window.css';
import Menu from '../Menu/Menu';
import Chat from '../Chat/Chat';
import FriendList from '../FriendList/FriendList';

class Window extends Component {

    componentDidUpdate() {
        console.log(this.props.messages);
    }

    render() {
        return (
            <div className="grid-container">
                <div className="grid-item"><Menu></Menu></div>
                <div className="grid-item">
                    <Chat 
                        messages={this.props.messages}
                        loading={this.props.loading}
                        onSendMessage={this.props.onSendMessage}
                        name={this.props.name}
                        profilePicURL={this.props.profilePicURL}
                        uid={this.props.uid}
                    >
                    </Chat>
                </div>
                <div className="grid-item"><FriendList></FriendList></div>
                
            </div>
        );
    }
}

export default Window;