import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import firebase from 'firebase';

// export const addIngredient = (name) => {
//     return {
//         type: actionTypes.ADD_INGREDIENT,
//         ingredientName: name
//     };
// };

// export const removeIngredient = (name) => {
//     return {
//         type: actionTypes.REMOVE_INGREDIENT,
//         ingredientName: name
//     };
// };

export const fetchMessagesSuccess = (messages) => {
    return {
        type: actionTypes.FETCH_MESSAGES_SUCCESS,
        messages: messages
    };
}

export const fetchMessagesFail = (error) => {
    console.log("Fail");
    return {
        type: actionTypes.FETCH_MESSAGES_FAIL,
        error: error
    };
}

export const fetchMessagesStart = () => {
    return {
        type: actionTypes.FETCH_MESSAGES_START,
    }
};
/*
export const fetchMessages = (token) => {
    return dispatch => {
        dispatch(fetchMessagesStart())
        axios.get('/messages.json').then(response => {
            console.log(response.data);
            const fetchedMessages = [];
            for (let key in response.data) {
                fetchedMessages.push({
                    id: key,
                    message: response.data[key],
                });
            }
            console.log(fetchedMessages)
            dispatch(fetchMessagesSuccess(fetchedMessages));
        }).catch(error => {
            dispatch(fetchMessagesFail());
        });
    };
};
*/

export const fetchMessages = (token) => {
	return dispatch => {
		dispatch(fetchMessagesStart())
        var messagesRef = firebase.database().ref('messages');
        var storageRef = firebase.storage().ref();
		messagesRef.on('value', function(snapshot) {
			console.log(snapshot.val());
            const fetchedMessages = [];
            let mutex = 0;
			for (let key in snapshot.val()) {
                // mutex++;
                // let profilePicName = snapshot.val()[key]["profilePicURL"];
                // console.log(profilePicName);
                // storageRef.child(profilePicName).getDownloadURL().then(function(url) {
                //     fetchedMessages.push({
                //         id: key,
                //         name: snapshot.val()[key]["name"],
                //         message: snapshot.val()[key]["message"],
                //         profilePicURL: url
                //     });
                //     mutex--;
                //     if(mutex == 0) {
                //         dispatch(fetchMessagesSuccess(fetchedMessages));
                //     }
                // });
                fetchedMessages.push({
                    id: key,
                    name: snapshot.val()[key]["name"],
                    message: snapshot.val()[key]["message"],
                    profilePicURL: snapshot.val()[key]["profilePicURL"]
                });
			}
			console.log(fetchedMessages);
			if(mutex == 0) {
                dispatch(fetchMessagesSuccess(fetchedMessages));
            }
		});
	};
};

export const sendMessageInit = () => {
    return {
        type: actionTypes.SEND_MESSAGE_INIT
    };
};

export const sendMessageSuccess = (id, message, name) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        id: id,
        message: message,
        name: name
    };
};

export const sendMessageFail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: error
    };
};

export const sendMessageStart = () => {
    return {
        type: actionTypes.SEND_MESSAGE_START
    };
};

// export const sendMessage = (messageData, token) => {
//     return dispatch => {
//         dispatch(sendMessageStart());
//         axios.post('/messages.json?auth=' + token, messageData).then(response => {
//             console.log(response.data);
//             dispatch(sendMessageSuccess(response.data.name, messageData));
//         }).catch(error => {
//             dispatch(sendMessageFail(error));
//         });
//     };
// };


export const sendMessage = (uid, username, message, profilePicURL) => {
    return dispatch => {
        dispatch(sendMessageStart());
        var database = firebase.database();
        // Get a key for a new message.
        var messagesRef = firebase.database().ref('messages');
        var newMessageRef = messagesRef.push();
        // Write the new messages's content.
        newMessageRef.set({'uid': uid, 'name': username, "message": message, "profilePicURL": profilePicURL},
            function(error) {
                if (error) {
                    dispatch(sendMessageFail(error));
                } else {
                    //dispatch(sendMessageSuccess(newMessageKey, message, username));
                }
            } 
        );
    };
};
