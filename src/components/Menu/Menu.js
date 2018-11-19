import React, {Component} from "react";
import './Menu.css';
import Input from '../UI/Input/Input';
import profilePic from '../../assets/man.jpeg';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class Menu extends Component {
    render() {
        return(
            <div className="menu">
                <div className="search tile">
                <Input elementType="input" class="search-input" containerClass="search-input-cotainer"/>
                </div>
                <div className="channels tile">
                    <ul className="channels-list">
                        <li>
                            <Link to="/channels/general" className="channel-link">#General</Link>
                        </li>
                        <li>
                            <Link to="/channels/hangout" className="channel-link">#Hangout</Link>
                        </li>
                        <li>
                            <Link to="/channels/cats" className="channel-link">#Cats</Link>
                        </li>
                    </ul>
                </div>
                <div className="settings tile">
                    <div className="setting-container">
                        <div className="setting profile-settings">
                        </div>
                    </div>
                    <div className="setting-container">
                        <div className="setting chat-settings">
                            <Link to="/settings">
                                <FontAwesome
                                    className="setting-icon settings-cog"
                                    name="cog"
                                    size="2x"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="setting-container">
                        <div className="setting server-settings">
                            <Link to="/settings">
                            <FontAwesome
                                className="setting-icon settings-server"
                                name="server"
                                size="2x"
                            />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;