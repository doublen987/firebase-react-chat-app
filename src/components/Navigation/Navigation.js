import React, {Component} from 'react';
import logo from '../../logo.svg';
import './Navigation.css';
import NavigationItems from './NavigationItems/NavigationItems';
import Aux from '../../hoc/Aux/Aux'
import {connect} from 'react-redux';

class Navigation extends Component {
 


    render() {
        return (
            <Aux>
            <header className="main-header">
                <nav className="main-nav">
                    <NavigationItems isAuth={this.props.isAuth}/>
                </nav>
                
            </header>
            <div className="nav-buffer"></div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

const mapDispaatchToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps)(Navigation);