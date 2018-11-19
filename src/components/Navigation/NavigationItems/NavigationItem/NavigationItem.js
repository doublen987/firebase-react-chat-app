import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';


const NavigationItem = (props) => (
    <li className="main-nav__item">
        <NavLink 
            to={props.link}
            exact={props.exact}
            //activeClassName={classes.active} 
            //className={props.active ? classes.active : null}
            >{props.children}</NavLink>
    </li>
);

export default NavigationItem;