import React, {Component} from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
    render() {
        let auth = null;
        if (this.props.isAuth) {
            auth = <NavigationItem link={"/logout"}>Sign Out</NavigationItem>;
        } else {
            auth = <NavigationItem link={"/auth"}>Sign In / Sign Up</NavigationItem>
        }

        return (
            <ul className="main-nav__items">
                <NavigationItem link={"/"}>Home</NavigationItem>
                {auth}
            </ul>
        );
    }
}

export default NavigationItems;