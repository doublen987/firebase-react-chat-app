import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import * as actions from './index';
import * as utility from '../utility';

export const selectFile = (file) => {
    return {
        type: actionTypes.SELECT_FILE,
        file: file
    }
}

export const changeSettings = (settings) => {
    return {
        type: actionTypes.CHANGE_SETTINGS,
        settings: settings
    }
}

export const updateSettings = (settings) => {
    return dispatch => {
        var storage = firebase.storage();
        var storageRef = storage.ref('/profile-pictures/');
        var metadata = {
            name: utility.guid(),
        };
        console.log(metadata.name);
        var fileRef = storageRef.child(metadata.name);
        // var profilePicturesRef = storageRef.child('profile-pictures');
        fileRef.put(settings.photoURL, metadata).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            //console.log(snapshot.fullPath);
            fileRef.getDownloadURL().then(function(url) {
                var newAuthObject = {
                    'displayName': settings.displayName,
                    'photoURL': url
                };
                console.log("Updated auth: {'displayName': " + settings.displayName + ", photoURL: " + url +"}");
                dispatch(actions.updateAuthObject(newAuthObject));
            });
        });
        var user = firebase.auth();
    }
}