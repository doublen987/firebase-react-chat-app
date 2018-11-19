import axios from 'axios';
import firebase from 'firebase';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, displayName, photoURL) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        displayName: displayName,
        photoURL: photoURL
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS
    }
}

export const logoutFail = (error) => {
    return {
        type: actionTypes.AUTH_LOGOUT_FAIL,
        error: error
    }
}

export const logout = () => {
    return dispatch => {
        firebase.auth().signOut().then(function() {
            dispatch(logoutSuccess())
        }).catch(function(error) {
            console.log("Log out failed!")
            dispatch(logoutFail(error))
        });
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        if (isSignup) {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                console.log(error);
                dispatch(authFail(error));                
            });
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                console.log(error);
                dispatch(authFail(error));
            });
        }
    };
};

const confirmFirstAuthentication = () => {
    return {
        type: actionTypes.CONFIRM_FIRST_AUTH
    }
}

export const enableAuthListener = () => {
    return {
        type: actionTypes.ENABLE_AUTH_LISTENER
    }
}

export const updateAuthObjectStart = () => {
    return {
        type: actionTypes.UPDATE_AUTH_OBJECT_START
    }
}

export const updateAuthObjectSuccess = (updatedAuthObject) => {
    return {
        type: actionTypes.UPDATE_AUTH_OBJECT_SUCCESS,
        newObject: updatedAuthObject
    }
}

export const updateAuthObjectFail = (error) => {
    return {
        type: actionTypes.UPDATE_AUTH_OBJECT_FAIL,
        error: error
    }
}

export const updateAuthObject = (newObject) => {
    return dispatch => {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log("Logged in!");
            console.log(newObject);
            user.updateProfile({
                displayName: newObject.displayName,
                photoURL: newObject.photoURL
            }).then(function() {
                dispatch(updateAuthObjectSuccess(newObject))
            }).catch(function(error) {
                dispatch(updateAuthObjectFail(error))
            });
        } else {
            dispatch(updateAuthObjectFail("Not logged in!"))
            console.log("Not logged in!")
        }
    }
}

export const listenToAuthStateChange = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log(user)
                //console.log("token: " + user.refreshToken + " uid:" + user.uid);
                dispatch(authSuccess(user.refreshToken, user.uid, user.displayName, user.photoURL));
            } else {
                console.log('not logged in');
                dispatch(setAuthRedirectPath("/auth"));
            }
            dispatch(confirmFirstAuthentication())
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}