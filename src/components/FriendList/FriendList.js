import React, {Component} from "react";
import './FriendList.css';
import man1 from '../../assets/man1.jpeg';
import man2 from '../../assets/man2.jpeg';
import woman1 from '../../assets/woman1.jpeg';


class FriendList extends Component {
    render() {
        return(
            <div className="friend-list">
                Friends:
                <div className="friend">
                    <a><img src={man1} className="friend-profile-picture"/><span>Guy Fieri</span></a>
                </div>
                <div className="friend">
                    <a><img src={man2} className="friend-profile-picture"/><span>Bob Johnson</span></a>
                </div>
                <div className="friend">
                    <a><img src={woman1} className="friend-profile-picture"/><span>Millie Robbinson</span></a>
                </div>
            </div>
        );
    }
}

export default FriendList;