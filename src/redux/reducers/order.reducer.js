import { combineReducers } from 'redux';

const currentOrderId = (state=0, action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_CURRENT_ORDER_ID':
            return action.payload
    }
}

export default combineReducers ({
    currentOrderId,
});