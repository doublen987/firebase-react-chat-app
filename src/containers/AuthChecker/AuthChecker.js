import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class AuthChecker extends Component {

    componentDidMount() {
        if(!this.props.authListenerEnabled) {
            this.props.onFirebaseAuthStateChange();
            this.props.enableAuthListener();
        }
    }

    render() {
        let contents = null;
        
        if(this.props.firstAuthentication) {
            if(this.props.isAuthenticated) {
                contents = <Aux>{this.props.children}</Aux>;
            } else {
                contents = <Redirect to={this.props.redirectPath} />
            }
        } else {
            contents = <div>Spinner</div>;
        }

        return (
            <Aux>
                {contents}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        authListenerEnabled: state.authListenerEnabled,
        firstAuthentication: state.auth.firstAuthentication,
        isAuth: state.auth.token !== null,
        loading: state.auth.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFirebaseAuthStateChange: () => dispatch(actions.listenToAuthStateChange()),
        enableAuthListener: () => dispatch(actions.enableAuthListener())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthChecker);