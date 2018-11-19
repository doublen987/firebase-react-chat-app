import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    photoURL: null,
    displayName: null,
    error: null,
    loading: false,
    updating: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        displayName: action.displayName,
        photoURL: action.photoURL,
        error: null,
        loading: false,
        authRedirectPath: '/'
     });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogoutSuccess = (state, action) => {
    return updateObject(state, {token: null, userId: null, displayName: null, photoUrl: null });
};

const authLogoutFail = (state, action) => {
    return updateObject(state, {error: action.error });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}

const confirmFirstAuth = (state, action) => {
    return updateObject(state, {firstAuthentication: true});
}

const enableAuthListener = (state, action) => {
    return updateObject(state, {authListenerEnabled: true})
}

const startAuthObjectUpdate = (state, action) => {
    return updateObject(state, {
        updating: true
    })
}

const authObjectUpdateSuccess = (state, action) => {
    return updateObject(state, {
        username: action.newAuthObject.username,
        profilePic: action.newAuthObject.profilePic,
        updating: false
    })
}

const authObjectUpdateFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        updating: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT_SUCCESS:
            return authLogoutSuccess(state, action);
        case actionTypes.AUTH_LOGOUT_FAIL:
            return authLogoutFail(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        case actionTypes.CONFIRM_FIRST_AUTH:
            return confirmFirstAuth(state, action);
        case actionTypes.ENABLE_AUTH_LISTENER:
            return enableAuthListener(state, action);
        case actionTypes.UPDATE_AUTH_OBJECT_START:
            return startAuthObjectUpdate(state, action);
        case actionTypes.UPDATE_AUTH_OBJECT_SUCCESS:
            return authObjectUpdateSuccess(state, action);
        case actionTypes.UPDATE_AUTH_OBJECT_FAIL:
            return authObjectUpdateFail(state, action);
        default:
        return state;
    }
}

export default reducer;