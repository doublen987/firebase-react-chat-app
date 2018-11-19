import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    messages: null,
    loading: true
};

// const addIngredient = (state, action) => {
//     const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
//     const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
//     const updatedState = {
//         ingredients: updatedIngredients,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
//         building: true
//     }
//     return updateObject(state, updatedState);
// };

// const removeIngredient = (state, action) => {
//     const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
//     const updatedIngs = updateObject(state.ingredients, updatedIng);
//     const updatedSt = {
//         ingredients: updatedIngs,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
//         building: true
//     }
//     return updateObject(state, updatedSt);
// }

const fetchMessagesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMessagesSuccess = (state, action) => {
    return updateObject (state, {
        messages: action.messages,
        loading: false
    });
};

const fetchMessagesFail = (state, action) => {
    return updateObject(state, {error: true});
}

const sendMessageInit = (state, action) => {
    return updateObject(state, {sent: false });
};

const sendMessageStart = (state, action) => {
    return updateObject(state, {loading: true });
};

const sendMessageSuccess = (state, action) => {
    const newMessage = {id: action.messageId, message: action.message, name: action.name };
    return updateObject(state, {
        loading:false,
        sent: true,
        messages: state.messages.concat(newMessage)
    });
};

const sendMessageFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.ADD_INGREDIENT:
        //     return addIngredient(state, action);
        // case actionTypes.REMOVE_INGREDIENT:
        //     return removeIngredient(state, action);
        case actionTypes.FETCH_MESSAGES_START:
            return fetchMessagesStart(state, action);
        case actionTypes.FETCH_MESSAGES_SUCCESS:
            return fetchMessagesSuccess(state, action);
        case actionTypes.FETCH_MESSAGES_FAIL:
            return fetchMessagesFail(state, action);
        case actionTypes.SEND_MESSAGE_INIT:
            return sendMessageInit(state, action);
        case actionTypes.SEND_MESSAGE_START:
            return sendMessageStart(state, action);
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return sendMessageSuccess(state, action);
        case actionTypes.SEND_MESSAGE_FAIL:
            return sendMessageFail(state, action);
        default:
            return state;
    }
    return state;
};

export default reducer;