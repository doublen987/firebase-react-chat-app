import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import AuthChecker from '../AuthChecker/AuthChecker';
import Window from '../../components/Window/Window';
import * as actions from '../../store/actions/index';

class ChatContainer extends Component {

    componentDidMount() {
        this.props.onFetchMessages("");
        console.log(this.props.isAuth);
        console.log(this.props.loading);
        this.props.onFirebaseAuthStateChange();
    }

    componentDidUpdate() {
        console.log(this.props.messages);
    }

    render() {
        return (
            <AuthChecker isAuthenticated={this.props.isAuth} redirectPath="/auth"> 
                <Window
                    messages={this.props.messages}
                    loading={this.props.loading}
                    onSendMessage={this.props.onMessageSend} 
                    name={this.props.name}
                    profilePicURL={this.props.profilePicURL}
                    uid={this.props.uid}
                ></Window>
            </AuthChecker>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.chat.messages,
        loading: state.chat.loading,
        isAuth: state.auth.token,
        name: state.auth.displayName,
        profilePicURL: state.auth.photoURL,
        uid: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMessages: (token) => dispatch(actions.fetchMessages(token)),
        onMessageSend: (username, message, uid, profilePicURL) => dispatch(actions.sendMessage(username, message, uid, profilePicURL)),
        onFirebaseAuthStateChange: () => dispatch(actions.listenToAuthStateChange())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
