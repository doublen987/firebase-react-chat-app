import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    username: null,
    profilePicture: null
};

const changeSettings = (state, action) => {
    return updateObject(state, {
        username: action.username,
        profilePicture: action.settings.profilePicture
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_SETTINGS:
            return changeSettings(state, action);
        default:
            return state;
    }
    return state;
};

export default reducer;